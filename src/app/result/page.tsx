"use client";

import { useEffect } from "react";
import NextImage from "next/image";
import { useRouter } from "next/navigation";

import Button from "@/components/Button";
import { useGame } from "@/context/GameContext";

import styles from "./page.module.css";

export default function ResultPage() {
  const router = useRouter();
  const { state, reset } = useGame();

  useEffect(() => {
    if (state.status === "idle") {
      router.push("/");
    }
  }, [state.status, router]);

  const handleTryAgain = () => {
    reset();
    router.push("/");
  };

  if (state.status === "idle") {
    return null;
  }

  const isWon = state.status === "won";

  return (
    <div className={styles.root}>
      <div className={styles.imageSection}>
        <NextImage
          src="/thumbUp.svg"
          alt="Thumbs up illustration"
          width={300}
          height={300}
          priority
          className={styles.image}
        />
      </div>
      <div className={styles.contentSection}>
        <div className={styles.content}>
          <h2 className={styles.scoreLabel}>Total score:</h2>
          <p className={styles.prize}>
            ${state.earnedPrize.toLocaleString("en-US")} earned
          </p>
          {isWon ? (
            <p className={styles.resultMessage}>
              Congratulations! You&apos;re a millionaire!
            </p>
          ) : (
            <p className={styles.resultMessage}>Better luck next time!</p>
          )}
          <div className={styles.buttonWrapper}>
            <Button onClick={handleTryAgain}>Try Again</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
