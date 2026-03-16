import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useGame } from "@/context/GameContext";
import type { Answer, Question } from "@/types/game";

type AnswerState = "inactive" | "selected" | "correct" | "wrong";

type GraphQLResponse = {
  data?: {
    questions: Question[];
  };
  errors?: { message: string }[];
};

export function useAnswerFlow() {
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

  return {
    answerStates,
    isAnswering,
    loading,
    error,
    handleAnswer,
    fetchQuestions,
  };
}
