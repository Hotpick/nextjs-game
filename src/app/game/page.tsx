"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import AnswerOption from "@/components/Game/AnswerOption";
import GameSidebar from "@/components/Game/GameSidebar";
import { useGame } from "@/context/GameContext";
import type { Answer, Question } from "@/types/game";

import styles from "./page.module.css";

const LETTERS = ["A", "B", "C", "D"] as const;

type AnswerState = "inactive" | "selected" | "correct" | "wrong";

type GraphQLResponse = {
  data?: {
    questions: Question[];
  };
  errors?: { message: string }[];
};

export default function GamePage() {
  const router = useRouter();
  const { state, startGame, answerCorrect, answerWrong } = useGame();
  const [answerStates, setAnswerStates] = useState<Record<string, AnswerState>>(
    {},
  );
  const [isAnswering, setIsAnswering] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchQuestions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
            query {
              questions {
                id
                text
                prize
                answers {
                  id
                  text
                  isCorrect
                }
              }
            }
          `,
        }),
      });
      const json = (await response.json()) as GraphQLResponse;
      if (json.errors && json.errors.length > 0) {
        setError(json.errors[0]?.message ?? "Failed to load questions");
        return;
      }
      if (json.data?.questions) {
        startGame(json.data.questions);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load questions");
    } finally {
      setLoading(false);
    }
  }, [startGame]);

  useEffect(() => {
    if (state.status === "idle") {
      void fetchQuestions();
    }
  }, [state.status, fetchQuestions]);

  useEffect(() => {
    if (state.status === "won" || state.status === "lost") {
      router.push("/result");
    }
  }, [state.status, router]);

  // Reset answer states when question changes
  useEffect(() => {
    setAnswerStates({});
    setIsAnswering(false);
  }, [state.currentQuestionIndex]);

  const handleAnswer = useCallback(
    (answer: Answer) => {
      if (isAnswering) return;
      setIsAnswering(true);

      // Show selected state
      setAnswerStates({ [answer.id]: "selected" });

      // After 500ms reveal correct/wrong
      setTimeout(() => {
        const currentQuestion = state.questions[state.currentQuestionIndex];
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (!currentQuestion) return;

        const newStates: Record<string, AnswerState> = {};
        currentQuestion.answers.forEach((a) => {
          if (a.isCorrect) {
            newStates[a.id] = "correct";
          } else if (a.id === answer.id && !answer.isCorrect) {
            newStates[a.id] = "wrong";
          } else {
            newStates[a.id] = "inactive";
          }
        });
        setAnswerStates(newStates);

        // After 1s advance or end game
        setTimeout(() => {
          if (answer.isCorrect) {
            answerCorrect();
          } else {
            answerWrong();
          }
        }, 1000);
      }, 500);
    },
    [
      isAnswering,
      state.questions,
      state.currentQuestionIndex,
      answerCorrect,
      answerWrong,
    ],
  );

  if (loading) {
    return (
      <div className={styles.loadingWrapper}>
        <p className={styles.loadingText}>Loading questions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.loadingWrapper}>
        <p className={styles.errorText}>{error}</p>
        <button
          type="button"
          className={styles.retryButton}
          onClick={() => void fetchQuestions()}
        >
          Retry
        </button>
      </div>
    );
  }

  if (state.status === "idle" || state.questions.length === 0) {
    return (
      <div className={styles.loadingWrapper}>
        <p className={styles.loadingText}>Loading questions...</p>
      </div>
    );
  }

  const currentQuestion = state.questions[state.currentQuestionIndex];
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!currentQuestion) return null;

  const prizes = state.questions.map((q) => q.prize);

  return (
    <div className={styles.root}>
      {/* Main game area */}
      <div className={styles.gameArea}>
        <div className={styles.question}>
          <h2>{currentQuestion.text}</h2>
        </div>

        <div className={styles.grid}>
          {currentQuestion.answers.map((answer, idx) => (
            <div className={styles.column} key={answer.id}>
              <AnswerOption
                key={answer.id}
                state={answerStates[answer.id] ?? "inactive"}
                onClick={() => {
                  handleAnswer(answer);
                }}
                disabled={isAnswering}
              >
                <span className={styles.letterBadge}>
                  {LETTERS[idx] ?? String(idx + 1)}
                </span>
                <span>{answer.text}</span>
              </AnswerOption>
            </div>
          ))}
        </div>
      </div>

      <GameSidebar
        prizes={prizes}
        currentQuestionIndex={state.currentQuestionIndex}
      />
    </div>
  );
}
