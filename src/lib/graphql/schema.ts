export const typeDefs = `#graphql
  type Answer {
    id: String!
    text: String!
    isCorrect: Boolean!
  }

  type Question {
    id: String!
    text: String!
    answers: [Answer!]!
    prize: Int!
  }

  type Query {
    questions: [Question!]!
  }
`;
