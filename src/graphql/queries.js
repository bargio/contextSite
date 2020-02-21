/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getQuiz = `query GetQuiz($id: ID!) {
  getQuiz(id: $id) {
    id
    name
    creator
    groupCreator
    createDate
    expireDate
    smallDescription
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
      creator
      groupCreator
      createDate
      expireDate
      smallDescription
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
    quizCreator
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
      quizCreator
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
    quizUserId
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
      quizUserId
    }
    nextToken
  }
}
`;
export const getUsers = `query GetUsers($id: ID!) {
  getUsers(id: $id) {
    id
    userEmail
    userGroup
    active
  }
}
`;
export const listUserss = `query ListUserss(
  $filter: ModelUsersFilterInput
  $limit: Int
  $nextToken: String
) {
  listUserss(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      userEmail
      userGroup
      active
    }
    nextToken
  }
}
`;
export const getQuizUncompleted = `query GetQuizUncompleted($id: ID!) {
  getQuizUncompleted(id: $id) {
    id
    userId
    quizData
    quizQuestionData
  }
}
`;
export const listQuizUncompleteds = `query ListQuizUncompleteds(
  $filter: ModelQuizUncompletedFilterInput
  $limit: Int
  $nextToken: String
) {
  listQuizUncompleteds(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      userId
      quizData
      quizQuestionData
    }
    nextToken
  }
}
`;
export const quizByCreator = `query QuizByCreator(
  $creator: String
  $sortDirection: ModelSortDirection
  $filter: ModelQuizFilterInput
  $limit: Int
  $nextToken: String
) {
  quizByCreator(
    creator: $creator
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      name
      creator
      groupCreator
      createDate
      expireDate
      smallDescription
      description
      image_url
      active
      quizQuestionsID
    }
    nextToken
  }
}
`;
export const quizByGroupCreator = `query QuizByGroupCreator(
  $groupCreator: String
  $sortDirection: ModelSortDirection
  $filter: ModelQuizFilterInput
  $limit: Int
  $nextToken: String
) {
  quizByGroupCreator(
    groupCreator: $groupCreator
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      name
      creator
      groupCreator
      createDate
      expireDate
      smallDescription
      description
      image_url
      active
      quizQuestionsID
    }
    nextToken
  }
}
`;
export const quizResultByUser = `query QuizResultByUser(
  $quizUser: String
  $sortDirection: ModelSortDirection
  $filter: ModelQuizResultFilterInput
  $limit: Int
  $nextToken: String
) {
  quizResultByUser(
    quizUser: $quizUser
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      quizId
      quizUser
      quizResult
      quizUserId
    }
    nextToken
  }
}
`;
export const listUsersIDbyGroup = `query ListUsersIDbyGroup(
  $userGroup: String
  $sortDirection: ModelSortDirection
  $filter: ModelUsersFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsersIDbyGroup(
    userGroup: $userGroup
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      userEmail
      userGroup
      active
    }
    nextToken
  }
}
`;
export const getUserByEmail = `query GetUserByEmail(
  $userEmail: String
  $sortDirection: ModelSortDirection
  $filter: ModelUsersFilterInput
  $limit: Int
  $nextToken: String
) {
  getUserByEmail(
    userEmail: $userEmail
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      userEmail
      userGroup
      active
    }
    nextToken
  }
}
`;
export const getUncompletedByUserId = `query GetUncompletedByUserId(
  $userId: String
  $sortDirection: ModelSortDirection
  $filter: ModelQuizUncompletedFilterInput
  $limit: Int
  $nextToken: String
) {
  getUncompletedByUserId(
    userId: $userId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      userId
      quizData
      quizQuestionData
    }
    nextToken
  }
}
`;
