"use client";

import AnswerOption from "@/components/Game/AnswerOption";
import GameSidebar from "@/components/Game/GameSidebar";
import { useGame } from "@/context/GameContext";
import { useAnswerFlow } from "@/hooks/useAnswerFlow";

import styles from "./page.module.css";

const LETTERS = ["A", "B", "C", "D"] as const;

export default function GamePage() {
  const {
    answerStates,
    isAnswering,
    loading,
    error,
    handleAnswer,
    fetchQuestions,
  } = useAnswerFlow();
  const { state } = useGame();

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
                letter={
                  <span className={styles.letterBadge}>
                    {LETTERS[idx] ?? String(idx + 1)}
                  </span>
                }
                onClick={() => {
                  handleAnswer(answer);
                }}
                disabled={isAnswering}
              >
                {answer.text}
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
