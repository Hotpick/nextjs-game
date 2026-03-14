import questionsData from "@/config/questions.json";
import type { Question } from "@/types/game";

type Resolvers = {
  Query: {
    questions: () => Question[];
  };
};

export const resolvers: Resolvers = {
  Query: {
    questions: () => questionsData.questions as Question[],
  },
};
