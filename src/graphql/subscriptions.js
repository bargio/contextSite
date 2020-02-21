/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateQuiz = `subscription OnCreateQuiz {
  onCreateQuiz {
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
export const onUpdateQuiz = `subscription OnUpdateQuiz {
  onUpdateQuiz {
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
export const onDeleteQuiz = `subscription OnDeleteQuiz {
  onDeleteQuiz {
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
export const onCreateQuizQuestions = `subscription OnCreateQuizQuestions {
  onCreateQuizQuestions {
    id
    quizDetails
    quizCreator
  }
}
`;
export const onUpdateQuizQuestions = `subscription OnUpdateQuizQuestions {
  onUpdateQuizQuestions {
    id
    quizDetails
    quizCreator
  }
}
`;
export const onDeleteQuizQuestions = `subscription OnDeleteQuizQuestions {
  onDeleteQuizQuestions {
    id
    quizDetails
    quizCreator
  }
}
`;
export const onCreateQuizResult = `subscription OnCreateQuizResult {
  onCreateQuizResult {
    id
    quizId
    quizUser
    quizResult
    quizUserId
  }
}
`;
export const onUpdateQuizResult = `subscription OnUpdateQuizResult {
  onUpdateQuizResult {
    id
    quizId
    quizUser
    quizResult
    quizUserId
  }
}
`;
export const onDeleteQuizResult = `subscription OnDeleteQuizResult {
  onDeleteQuizResult {
    id
    quizId
    quizUser
    quizResult
    quizUserId
  }
}
`;
export const onCreateUsers = `subscription OnCreateUsers {
  onCreateUsers {
    id
    userEmail
    userGroup
    active
  }
}
`;
export const onUpdateUsers = `subscription OnUpdateUsers {
  onUpdateUsers {
    id
    userEmail
    userGroup
    active
  }
}
`;
export const onDeleteUsers = `subscription OnDeleteUsers {
  onDeleteUsers {
    id
    userEmail
    userGroup
    active
  }
}
`;
export const onCreateQuizUncompleted = `subscription OnCreateQuizUncompleted {
  onCreateQuizUncompleted {
    id
    userId
    quizData
    quizQuestionData
  }
}
`;
export const onUpdateQuizUncompleted = `subscription OnUpdateQuizUncompleted {
  onUpdateQuizUncompleted {
    id
    userId
    quizData
    quizQuestionData
  }
}
`;
export const onDeleteQuizUncompleted = `subscription OnDeleteQuizUncompleted {
  onDeleteQuizUncompleted {
    id
    userId
    quizData
    quizQuestionData
  }
}
`;
