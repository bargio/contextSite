// tslint:disable
// this is an auto generated file. This will be overwritten

export const getQuiz = `query GetQuiz($id: ID!) {
  getQuiz(id: $id) {
    id
    name
    description
    image_url
    active
    quizQuestionsID
  }
}
`;
export const listQuizs = `query ListQuizs(
  $filter: ModelQuizFilterInput
  $limit: Int
  $nextToken: String
) {
  listQuizs(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      description
      image_url
      active
      quizQuestionsID
    }
    nextToken
  }
}
`;
export const getQuizQuestions = `query GetQuizQuestions($id: ID!) {
  getQuizQuestions(id: $id) {
    id
    quizDetails
  }
}
`;
export const listQuizQuestionss = `query ListQuizQuestionss(
  $filter: ModelQuizQuestionsFilterInput
  $limit: Int
  $nextToken: String
) {
  listQuizQuestionss(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      quizDetails
    }
    nextToken
  }
}
`;
export const getQuizResult = `query GetQuizResult($id: ID!) {
  getQuizResult(id: $id) {
    id
    quizId
    quizUser
    quizResult
    quizID
  }
}
`;
export const listQuizResults = `query ListQuizResults(
  $filter: ModelQuizResultFilterInput
  $limit: Int
  $nextToken: String
) {
  listQuizResults(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      quizId
      quizUser
      quizResult
      quizID
    }
    nextToken
  }
}
`;
