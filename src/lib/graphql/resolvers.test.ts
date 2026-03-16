import { describe, expect, it } from "vitest";

import { resolvers } from "./resolvers";

describe("resolvers.Query.questions", () => {
  it("returns an array", () => {
    const questions = resolvers.Query.questions();
    expect(Array.isArray(questions)).toBe(true);
  });

  it("returns at least one question", () => {
    const questions = resolvers.Query.questions();
    expect(questions.length).toBeGreaterThan(0);
  });

  it("each question has the expected shape", () => {
    const questions = resolvers.Query.questions();
    for (const q of questions) {
      expect(typeof q.id).toBe("string");
      expect(typeof q.text).toBe("string");
      expect(typeof q.prize).toBe("number");
      expect(Array.isArray(q.answers)).toBe(true);
    }
  });

  it("each answer has the expected shape", () => {
    const questions = resolvers.Query.questions();
    for (const q of questions) {
      for (const a of q.answers) {
        expect(typeof a.id).toBe("string");
        expect(typeof a.text).toBe("string");
        expect(typeof a.isCorrect).toBe("boolean");
      }
    }
  });

  it("each question has exactly one correct answer", () => {
    const questions = resolvers.Query.questions();
    for (const q of questions) {
      const correctCount = q.answers.filter((a) => a.isCorrect).length;
      expect(correctCount).toBe(1);
    }
  });

  it("each question has 4 answers", () => {
    const questions = resolvers.Query.questions();
    for (const q of questions) {
      expect(q.answers.length).toBe(4);
    }
  });
});
