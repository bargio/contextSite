/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateQuiz = `subscription OnCreateQuiz {
  onCreateQuiz {
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
export const onUpdateQuiz = `subscription OnUpdateQuiz {
  onUpdateQuiz {
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
export const onDeleteQuiz = `subscription OnDeleteQuiz {
  onDeleteQuiz {
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
export const onCreateQuizQuestions = `subscription OnCreateQuizQuestions {
  onCreateQuizQuestions {
    id
    quizDetails
  }
}
`;
export const onUpdateQuizQuestions = `subscription OnUpdateQuizQuestions {
  onUpdateQuizQuestions {
    id
    quizDetails
  }
}
`;
export const onDeleteQuizQuestions = `subscription OnDeleteQuizQuestions {
  onDeleteQuizQuestions {
    id
    quizDetails
  }
}
`;
export const onCreateQuizResult = `subscription OnCreateQuizResult {
  onCreateQuizResult {
    id
    quizId
    quizUser
    quizResult
    quizID
  }
}
`;
export const onUpdateQuizResult = `subscription OnUpdateQuizResult {
  onUpdateQuizResult {
    id
    quizId
    quizUser
    quizResult
    quizID
  }
}
`;
export const onDeleteQuizResult = `subscription OnDeleteQuizResult {
  onDeleteQuizResult {
    id
    quizId
    quizUser
    quizResult
    quizID
  }
}
`;
export const onCreateUsers = `subscription OnCreateUsers {
  onCreateUsers {
    id
    userId
    userEmail
    userLevel
  }
}
`;
export const onUpdateUsers = `subscription OnUpdateUsers {
  onUpdateUsers {
    id
    userId
    userEmail
    userLevel
  }
}
`;
export const onDeleteUsers = `subscription OnDeleteUsers {
  onDeleteUsers {
    id
    userId
    userEmail
    userLevel
  }
}
`;
