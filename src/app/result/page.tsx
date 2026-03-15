"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import Hero from "@/components/Hero/Hero";
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
    router.push("/game");
  };

  if (state.status === "idle") {
    return null;
  }

  const isWon = state.status === "won";

  return (
    <div className={styles.root}>
      <div className="container">
        <Hero
          subtitle="Total score:"
          title={
            isWon
              ? "Congratulations! You are a millionaire!"
              : `$${state.earnedPrize.toLocaleString("en-US")} earned`
          }
          buttonLabel="Try Again"
          onButtonClick={handleTryAgain}
        />
      </div>
    </div>
  );
}
