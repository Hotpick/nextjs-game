"use client";

import HexagonLineCell from "../HexagonLineCell";
import styles from "./AnswerOption.module.css";
type AnswerState = "inactive" | "selected" | "correct" | "wrong";

type AnswerOptionProps = {
  state: AnswerState;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  letter?: React.ReactNode;
};

type StateColors = {
  bg: string;
  border: string;
  hover: string;
};

const COLORS: Record<AnswerState, StateColors> = {
  inactive: {
    bg: "var(--white-100)",
    border: "var(--black-40)",
    hover: "var(--orange-100)",
  },
  selected: {
    bg: "var(--orange-5)",
    border: "var(--orange-100)",
    hover: "var(--orange-100)",
  },
  correct: {
    bg: "var(--green-5)",
    border: "var(--green-100)",
    hover: "var(--green-100)",
  },
  wrong: {
    bg: "var(--red-5)",
    border: "var(--red-100)",
    hover: "var(--red-100)",
  },
};

const AnswerOption = ({
  state,
  onClick,
  disabled = false,
  children,
  letter,
}: AnswerOptionProps) => {
  const buttonStyles = {
    "--button-border-color": COLORS[state].border,
    "--button-hover-color": COLORS[state].hover,
    "--button-bg-color": COLORS[state].bg,
  } as React.CSSProperties;

  return (
    <HexagonLineCell
      onClick={onClick}
      disabled={disabled}
      className={styles.root}
      style={buttonStyles}
      prefix={letter}
    >
      {children}
    </HexagonLineCell>
  );
};

export default AnswerOption;
