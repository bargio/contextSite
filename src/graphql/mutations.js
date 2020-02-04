/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createQuiz = `mutation CreateQuiz(
  $input: CreateQuizInput!
  $condition: ModelQuizConditionInput
) {
  createQuiz(input: $input, condition: $condition) {
    id
    name
    creator
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
export const updateQuiz = `mutation UpdateQuiz(
  $input: UpdateQuizInput!
  $condition: ModelQuizConditionInput
) {
  updateQuiz(input: $input, condition: $condition) {
    id
    name
    creator
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
export const deleteQuiz = `mutation DeleteQuiz(
  $input: DeleteQuizInput!
  $condition: ModelQuizConditionInput
) {
  deleteQuiz(input: $input, condition: $condition) {
    id
    name
    creator
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
export const createQuizQuestions = `mutation CreateQuizQuestions(
  $input: CreateQuizQuestionsInput!
  $condition: ModelQuizQuestionsConditionInput
) {
  createQuizQuestions(input: $input, condition: $condition) {
    id
    quizDetails
  }
}
`;
export const updateQuizQuestions = `mutation UpdateQuizQuestions(
  $input: UpdateQuizQuestionsInput!
  $condition: ModelQuizQuestionsConditionInput
) {
  updateQuizQuestions(input: $input, condition: $condition) {
    id
    quizDetails
  }
}
`;
export const deleteQuizQuestions = `mutation DeleteQuizQuestions(
  $input: DeleteQuizQuestionsInput!
  $condition: ModelQuizQuestionsConditionInput
) {
  deleteQuizQuestions(input: $input, condition: $condition) {
    id
    quizDetails
  }
}
`;
export const createQuizResult = `mutation CreateQuizResult(
  $input: CreateQuizResultInput!
  $condition: ModelQuizResultConditionInput
) {
  createQuizResult(input: $input, condition: $condition) {
    id
    quizId
    quizUser
    quizResult
    quizID
  }
}
`;
export const updateQuizResult = `mutation UpdateQuizResult(
  $input: UpdateQuizResultInput!
  $condition: ModelQuizResultConditionInput
) {
  updateQuizResult(input: $input, condition: $condition) {
    id
    quizId
    quizUser
    quizResult
    quizID
  }
}
`;
export const deleteQuizResult = `mutation DeleteQuizResult(
  $input: DeleteQuizResultInput!
  $condition: ModelQuizResultConditionInput
) {
  deleteQuizResult(input: $input, condition: $condition) {
    id
    quizId
    quizUser
    quizResult
    quizID
  }
}
`;
export const createUsers = `mutation CreateUsers(
  $input: CreateUsersInput!
  $condition: ModelUsersConditionInput
) {
  createUsers(input: $input, condition: $condition) {
    id
    userId
    userEmail
    userLevel
  }
}
`;
export const updateUsers = `mutation UpdateUsers(
  $input: UpdateUsersInput!
  $condition: ModelUsersConditionInput
) {
  updateUsers(input: $input, condition: $condition) {
    id
    userId
    userEmail
    userLevel
  }
}
`;
export const deleteUsers = `mutation DeleteUsers(
  $input: DeleteUsersInput!
  $condition: ModelUsersConditionInput
) {
  deleteUsers(input: $input, condition: $condition) {
    id
    userId
    userEmail
    userLevel
  }
}
`;
