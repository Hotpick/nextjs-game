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

  return (
    <>
      {/* Mobile hamburger */}
      <button
        type="button"
        className={styles.hamburger}
        onClick={() => {
          setIsPrizeLadderOpen(true);
        }}
        aria-label="Open prize ladder"
      >
        &#9776;
      </button>

      {/* Desktop prize ladder sidebar */}
      <aside className={styles.sidebar}>
        <PrizeLadder prizes={prizes} currentIndex={currentQuestionIndex} />
      </aside>

      {/* Mobile prize ladder overlay */}
      {isPrizeLadderOpen && (
        <div className={styles.overlay}>
          <button
            type="button"
            className={styles.closeButton}
            onClick={() => {
              setIsPrizeLadderOpen(false);
            }}
            aria-label="Close prize ladder"
          >
            &times;
          </button>
          <PrizeLadder prizes={prizes} currentIndex={currentQuestionIndex} />
        </div>
      )}
    </>
  );
};

export default GameSidebar;
