import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import type { Question } from "@/types/game";

import GamePage from "./page";

import { act, render, screen } from "@testing-library/react";

const mockPush = vi.fn();
const mockStartGame = vi.fn();
const mockAnswerCorrect = vi.fn();
const mockAnswerWrong = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

const mockUseGame = vi.fn();
vi.mock("@/context/GameContext", () => ({
  useGame: () => mockUseGame() as unknown,
}));

const mockQuestions: Question[] = [
  {
    id: "q1",
    text: "What is the capital of France?",
    prize: 500,
    answers: [
      { id: "a1", text: "London", isCorrect: false },
      { id: "a2", text: "Berlin", isCorrect: false },
      { id: "a3", text: "Paris", isCorrect: true },
      { id: "a4", text: "Madrid", isCorrect: false },
    ],
  },
];

const playingState = {
  status: "playing" as const,
  questions: mockQuestions,
  currentQuestionIndex: 0,
  earnedPrize: 0,
};

beforeEach(() => {
  vi.useFakeTimers();
  vi.clearAllMocks();
});

afterEach(() => {
  vi.useRealTimers();
});

describe("GamePage", () => {
  describe("loading state", () => {
    it("shows loading text when status is idle", () => {
      // The component renders loading when status==="idle", before any fetch settles
      mockUseGame.mockReturnValue({
        state: {
          status: "idle",
          questions: [],
          currentQuestionIndex: 0,
          earnedPrize: 0,
        },
        startGame: mockStartGame,
        answerCorrect: mockAnswerCorrect,
        answerWrong: mockAnswerWrong,
      });

      vi.stubGlobal(
        "fetch",
        vi.fn(() => new Promise(() => {})),
      );

      render(<GamePage />);

      expect(screen.getByText(/loading questions/i)).toBeDefined();
    });
  });

  describe("error state", () => {
    it("shows error message and retry button when fetch fails", async () => {
      mockUseGame.mockReturnValue({
        state: {
          status: "idle",
          questions: [],
          currentQuestionIndex: 0,
          earnedPrize: 0,
        },
        startGame: mockStartGame,
        answerCorrect: mockAnswerCorrect,
        answerWrong: mockAnswerWrong,
      });

      vi.stubGlobal(
        "fetch",
        vi.fn(() => Promise.reject(new Error("Network error"))),
      );

      render(<GamePage />);

      // Flush the rejected promise microtasks
      await act(async () => {
        await Promise.resolve();
      });

      expect(screen.getByText("Network error")).toBeDefined();
      expect(screen.getByRole("button", { name: /retry/i })).toBeDefined();
    });

    it("shows error from GraphQL errors array", async () => {
      mockUseGame.mockReturnValue({
        state: {
          status: "idle",
          questions: [],
          currentQuestionIndex: 0,
          earnedPrize: 0,
        },
        startGame: mockStartGame,
        answerCorrect: mockAnswerCorrect,
        answerWrong: mockAnswerWrong,
      });

      vi.stubGlobal(
        "fetch",
        vi.fn(() =>
          Promise.resolve({
            json: () =>
              Promise.resolve({ errors: [{ message: "GraphQL error" }] }),
          }),
        ),
      );

      render(<GamePage />);

      // Flush the resolved promise microtasks
      await act(async () => {
        await Promise.resolve();
      });

      expect(screen.getByText("GraphQL error")).toBeDefined();
    });
  });

  describe("playing state", () => {
    it("renders the current question text", () => {
      mockUseGame.mockReturnValue({
        state: playingState,
        startGame: mockStartGame,
        answerCorrect: mockAnswerCorrect,
        answerWrong: mockAnswerWrong,
      });

      render(<GamePage />);
      expect(screen.getByText("What is the capital of France?")).toBeDefined();
    });

    it("renders all answer options", () => {
      mockUseGame.mockReturnValue({
        state: playingState,
        startGame: mockStartGame,
        answerCorrect: mockAnswerCorrect,
        answerWrong: mockAnswerWrong,
      });

      render(<GamePage />);
      expect(screen.getByText("London")).toBeDefined();
      expect(screen.getByText("Paris")).toBeDefined();
      expect(screen.getByText("Berlin")).toBeDefined();
      expect(screen.getByText("Madrid")).toBeDefined();
    });

    it("renders letter badges A B C D", () => {
      mockUseGame.mockReturnValue({
        state: playingState,
        startGame: mockStartGame,
        answerCorrect: mockAnswerCorrect,
        answerWrong: mockAnswerWrong,
      });

      render(<GamePage />);
      expect(screen.getByText("A")).toBeDefined();
      expect(screen.getByText("B")).toBeDefined();
      expect(screen.getByText("C")).toBeDefined();
      expect(screen.getByText("D")).toBeDefined();
    });
  });

  describe("answer flow", () => {
    it("calls answerCorrect after clicking a correct answer and waiting", () => {
      mockUseGame.mockReturnValue({
        state: playingState,
        startGame: mockStartGame,
        answerCorrect: mockAnswerCorrect,
        answerWrong: mockAnswerWrong,
      });

      render(<GamePage />);

      // Click the correct answer (Paris)
      screen.getByText("Paris").closest("button")?.click();

      // After 500ms: correct/wrong states revealed
      act(() => {
        vi.advanceTimersByTime(500);
      });

      // After another 1000ms: game action dispatched
      act(() => {
        vi.advanceTimersByTime(1000);
      });

      expect(mockAnswerCorrect).toHaveBeenCalledOnce();
      expect(mockAnswerWrong).not.toHaveBeenCalled();
    });

    it("calls answerWrong after clicking a wrong answer and waiting", () => {
      mockUseGame.mockReturnValue({
        state: playingState,
        startGame: mockStartGame,
        answerCorrect: mockAnswerCorrect,
        answerWrong: mockAnswerWrong,
      });

      render(<GamePage />);

      // Click a wrong answer (London)
      screen.getByText("London").closest("button")?.click();

      act(() => {
        vi.advanceTimersByTime(500);
      });
      act(() => {
        vi.advanceTimersByTime(1000);
      });

      expect(mockAnswerWrong).toHaveBeenCalledOnce();
      expect(mockAnswerCorrect).not.toHaveBeenCalled();
    });

    it("ignores second click while answering is in progress", () => {
      mockUseGame.mockReturnValue({
        state: playingState,
        startGame: mockStartGame,
        answerCorrect: mockAnswerCorrect,
        answerWrong: mockAnswerWrong,
      });

      render(<GamePage />);

      screen.getByText("Paris").closest("button")?.click();
      screen.getByText("London").closest("button")?.click();

      act(() => {
        vi.advanceTimersByTime(1500);
      });

      // Only one action dispatched despite two clicks
      expect(mockAnswerCorrect).toHaveBeenCalledOnce();
    });
  });

  describe("game end", () => {
    it("redirects to /result when game is won", () => {
      mockUseGame.mockReturnValue({
        state: { ...playingState, status: "won" as const },
        startGame: mockStartGame,
        answerCorrect: mockAnswerCorrect,
        answerWrong: mockAnswerWrong,
      });

      render(<GamePage />);
      expect(mockPush).toHaveBeenCalledWith("/result");
    });

    it("redirects to /result when game is lost", () => {
      mockUseGame.mockReturnValue({
        state: { ...playingState, status: "lost" as const },
        startGame: mockStartGame,
        answerCorrect: mockAnswerCorrect,
        answerWrong: mockAnswerWrong,
      });

      render(<GamePage />);
      expect(mockPush).toHaveBeenCalledWith("/result");
    });
  });
});
