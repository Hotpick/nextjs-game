"use client";

import React, { createContext, useContext, useReducer } from "react";

import type { GameAction, GameState, Question } from "@/types/game";

const initialState: GameState = {
  questions: [],
  currentQuestionIndex: 0,
  earnedPrize: 0,
  status: "idle",
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "START_GAME":
      return {
        questions: action.questions,
        currentQuestionIndex: 0,
        earnedPrize: 0,
        status: "playing",
      };
    case "ANSWER_CORRECT": {
      const currentQuestion = state.questions[state.currentQuestionIndex];
      const isLastQuestion =
        state.currentQuestionIndex === state.questions.length - 1;
      if (isLastQuestion) {
        return {
          ...state,
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          earnedPrize: currentQuestion?.prize ?? state.earnedPrize,
          status: "won",
        };
      }
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        earnedPrize: currentQuestion?.prize ?? state.earnedPrize,
      };
    }
    case "ANSWER_WRONG":
      return {
        ...state,
        status: "lost",
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

type GameContextValue = {
  state: GameState;
  startGame: (questions: Question[]) => void;
  answerCorrect: () => void;
  answerWrong: () => void;
  reset: () => void;
};

const GameContext = createContext<GameContextValue | null>(null);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const startGame = (questions: Question[]) => {
    dispatch({ type: "START_GAME", questions });
  };

  const answerCorrect = () => {
    dispatch({ type: "ANSWER_CORRECT" });
  };

  const answerWrong = () => {
    dispatch({ type: "ANSWER_WRONG" });
  };

  const reset = () => {
    dispatch({ type: "RESET" });
  };

  return (
    <GameContext.Provider
      value={{ state, startGame, answerCorrect, answerWrong, reset }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame(): GameContextValue {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}
