export type Answer = {
  id: string;
  text: string;
  isCorrect: boolean;
};

export type Question = {
  id: string;
  text: string;
  answers: Answer[];
  prize: number;
};

export type GameConfig = {
  questions: Question[];
};

export type GameStatus = "idle" | "playing" | "won" | "lost";

export type GameState = {
  questions: Question[];
  currentQuestionIndex: number;
  earnedPrize: number;
  status: GameStatus;
};

export type GameAction =
  | { type: "START_GAME"; questions: Question[] }
  | { type: "ANSWER_CORRECT" }
  | { type: "ANSWER_WRONG" }
  | { type: "RESET" };
