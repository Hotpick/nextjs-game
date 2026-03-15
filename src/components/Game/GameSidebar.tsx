"use client";

import { useState } from "react";

import styles from "./GameSidebar.module.css";
import PrizeLadder from "./PrizeLadder";

const GameSidebar = ({
  prizes,
  currentQuestionIndex,
}: {
  prizes: number[];
  currentQuestionIndex: number;
}) => {
  const [isPrizeLadderOpen, setIsPrizeLadderOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleToggle = () => {
    if (isPrizeLadderOpen) {
      setIsClosing(true);
      setTimeout(() => {
        setIsPrizeLadderOpen(false);
        setIsClosing(false);
      }, 250);
    } else {
      setIsPrizeLadderOpen(true);
    }
  };

  const sidebarClass = [
    styles.sidebar,
    isPrizeLadderOpen ? styles.open : "",
    isClosing ? styles.closing : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <button
        type="button"
        className={`${styles.toggleSidebarButton}${isPrizeLadderOpen ? ` ${styles.open}` : ""}`}
        onClick={handleToggle}
        aria-label="Open prize ladder"
      >
        <span></span>
      </button>

      <aside className={sidebarClass}>
        <PrizeLadder prizes={prizes} currentIndex={currentQuestionIndex} />
      </aside>
    </>
  );
};

export default GameSidebar;
