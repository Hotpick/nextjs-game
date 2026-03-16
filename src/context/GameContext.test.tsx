import { describe, expect, it, vi } from "vitest";

import type { Question } from "@/types/game";

import { GameProvider, useGame } from "./GameContext";

import { act, renderHook } from "@testing-library/react";

const mockQuestions: Question[] = [
  {
    id: "q1",
    text: "Question 1",
    prize: 500,
    answers: [
      { id: "a1", text: "Wrong", isCorrect: false },
      { id: "a2", text: "Correct", isCorrect: true },
    ],
  },
  {
    id: "q2",
    text: "Question 2",
    prize: 1000,
    answers: [
      { id: "a3", text: "Wrong", isCorrect: false },
      { id: "a4", text: "Correct", isCorrect: true },
    ],
  },
];

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <GameProvider>{children}</GameProvider>
);

describe("useGame", () => {
  it("throws when used outside GameProvider", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => renderHook(() => useGame())).toThrow(
      "useGame must be used within a GameProvider",
    );
    spy.mockRestore();
  });

  it("has idle initial state", () => {
    const { result } = renderHook(() => useGame(), { wrapper });
    expect(result.current.state).toEqual({
      status: "idle",
      questions: [],
      currentQuestionIndex: 0,
      earnedPrize: 0,
    });
  });
});

describe("startGame", () => {
  it("sets questions and transitions to playing", () => {
    const { result } = renderHook(() => useGame(), { wrapper });

    act(() => {
      result.current.startGame(mockQuestions);
    });

    expect(result.current.state.status).toBe("playing");
    expect(result.current.state.questions).toEqual(mockQuestions);
    expect(result.current.state.currentQuestionIndex).toBe(0);
    expect(result.current.state.earnedPrize).toBe(0);
  });
});

describe("answerCorrect", () => {
  it("increments question index and updates earnedPrize on non-last question", () => {
    const { result } = renderHook(() => useGame(), { wrapper });

    act(() => {
      result.current.startGame(mockQuestions);
    });
    act(() => {
      result.current.answerCorrect();
    });

    expect(result.current.state.currentQuestionIndex).toBe(1);
    expect(result.current.state.earnedPrize).toBe(500);
    expect(result.current.state.status).toBe("playing");
  });

  it("sets status to won on the last question", () => {
    const { result } = renderHook(() => useGame(), { wrapper });

    act(() => {
      result.current.startGame(mockQuestions);
    });
    act(() => {
      result.current.answerCorrect();
    }); // q1 → q2
    act(() => {
      result.current.answerCorrect();
    }); // q2 → won

    expect(result.current.state.status).toBe("won");
    expect(result.current.state.earnedPrize).toBe(1000);
  });
});

describe("answerWrong", () => {
  it("sets status to lost", () => {
    const { result } = renderHook(() => useGame(), { wrapper });

    act(() => {
      result.current.startGame(mockQuestions);
    });
    act(() => {
      result.current.answerWrong();
    });

    expect(result.current.state.status).toBe("lost");
  });

  it("does not change currentQuestionIndex or earnedPrize", () => {
    const { result } = renderHook(() => useGame(), { wrapper });

    act(() => {
      result.current.startGame(mockQuestions);
    });
    act(() => {
      result.current.answerWrong();
    });

    expect(result.current.state.currentQuestionIndex).toBe(0);
    expect(result.current.state.earnedPrize).toBe(0);
  });
});

describe("reset", () => {
  it("returns to initial state from any state", () => {
    const { result } = renderHook(() => useGame(), { wrapper });

    act(() => {
      result.current.startGame(mockQuestions);
    });
    act(() => {
      result.current.answerCorrect();
    });
    act(() => {
      result.current.reset();
    });

    expect(result.current.state).toEqual({
      status: "idle",
      questions: [],
      currentQuestionIndex: 0,
      earnedPrize: 0,
    });
  });
});
