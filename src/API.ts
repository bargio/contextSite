/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type CreateQuizInput = {
  id?: string | null,
  name: string,
  description?: string | null,
  image_url?: string | null,
  active?: boolean | null,
  quizQuestionsID?: string | null,
};

export type ModelQuizConditionInput = {
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  image_url?: ModelStringInput | null,
  active?: ModelBooleanInput | null,
  quizQuestionsID?: ModelStringInput | null,
  and?: Array< ModelQuizConditionInput | null > | null,
  or?: Array< ModelQuizConditionInput | null > | null,
  not?: ModelQuizConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateQuizInput = {
  id: string,
  name?: string | null,
  description?: string | null,
  image_url?: string | null,
  active?: boolean | null,
  quizQuestionsID?: string | null,
};

export type DeleteQuizInput = {
  id?: string | null,
};

export type CreateQuizQuestionsInput = {
  id?: string | null,
  quizDetails: string,
};

export type ModelQuizQuestionsConditionInput = {
  quizDetails?: ModelStringInput | null,
  and?: Array< ModelQuizQuestionsConditionInput | null > | null,
  or?: Array< ModelQuizQuestionsConditionInput | null > | null,
  not?: ModelQuizQuestionsConditionInput | null,
};

export type UpdateQuizQuestionsInput = {
  id: string,
  quizDetails?: string | null,
};

export type DeleteQuizQuestionsInput = {
  id?: string | null,
};

export type CreateQuizResultInput = {
  id?: string | null,
  quizId: string,
  quizUser: string,
  quizResult: number,
  quizID?: string | null,
};

export type ModelQuizResultConditionInput = {
  quizId?: ModelStringInput | null,
  quizUser?: ModelStringInput | null,
  quizResult?: ModelIntInput | null,
  quizID?: ModelStringInput | null,
  and?: Array< ModelQuizResultConditionInput | null > | null,
  or?: Array< ModelQuizResultConditionInput | null > | null,
  not?: ModelQuizResultConditionInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateQuizResultInput = {
  id: string,
  quizId?: string | null,
  quizUser?: string | null,
  quizResult?: number | null,
  quizID?: string | null,
};

export type DeleteQuizResultInput = {
  id?: string | null,
};

export type ModelQuizFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  image_url?: ModelStringInput | null,
  active?: ModelBooleanInput | null,
  quizQuestionsID?: ModelStringInput | null,
  and?: Array< ModelQuizFilterInput | null > | null,
  or?: Array< ModelQuizFilterInput | null > | null,
  not?: ModelQuizFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelQuizQuestionsFilterInput = {
  id?: ModelIDInput | null,
  quizDetails?: ModelStringInput | null,
  and?: Array< ModelQuizQuestionsFilterInput | null > | null,
  or?: Array< ModelQuizQuestionsFilterInput | null > | null,
  not?: ModelQuizQuestionsFilterInput | null,
};

export type ModelQuizResultFilterInput = {
  id?: ModelIDInput | null,
  quizId?: ModelStringInput | null,
  quizUser?: ModelStringInput | null,
  quizResult?: ModelIntInput | null,
  quizID?: ModelStringInput | null,
  and?: Array< ModelQuizResultFilterInput | null > | null,
  or?: Array< ModelQuizResultFilterInput | null > | null,
  not?: ModelQuizResultFilterInput | null,
};

export type CreateQuizMutationVariables = {
  input: CreateQuizInput,
  condition?: ModelQuizConditionInput | null,
};

export type CreateQuizMutation = {
  createQuiz:  {
    __typename: "Quiz",
    id: string,
    name: string,
    description: string | null,
    image_url: string | null,
    active: boolean | null,
    quizQuestionsID: string | null,
  } | null,
};

export type UpdateQuizMutationVariables = {
  input: UpdateQuizInput,
  condition?: ModelQuizConditionInput | null,
};

export type UpdateQuizMutation = {
  updateQuiz:  {
    __typename: "Quiz",
    id: string,
    name: string,
    description: string | null,
    image_url: string | null,
    active: boolean | null,
    quizQuestionsID: string | null,
  } | null,
};

export type DeleteQuizMutationVariables = {
  input: DeleteQuizInput,
  condition?: ModelQuizConditionInput | null,
};

export type DeleteQuizMutation = {
  deleteQuiz:  {
    __typename: "Quiz",
    id: string,
    name: string,
    description: string | null,
    image_url: string | null,
    active: boolean | null,
    quizQuestionsID: string | null,
  } | null,
};

export type CreateQuizQuestionsMutationVariables = {
  input: CreateQuizQuestionsInput,
  condition?: ModelQuizQuestionsConditionInput | null,
};

export type CreateQuizQuestionsMutation = {
  createQuizQuestions:  {
    __typename: "QuizQuestions",
    id: string,
    quizDetails: string,
  } | null,
};

export type UpdateQuizQuestionsMutationVariables = {
  input: UpdateQuizQuestionsInput,
  condition?: ModelQuizQuestionsConditionInput | null,
};

export type UpdateQuizQuestionsMutation = {
  updateQuizQuestions:  {
    __typename: "QuizQuestions",
    id: string,
    quizDetails: string,
  } | null,
};

export type DeleteQuizQuestionsMutationVariables = {
  input: DeleteQuizQuestionsInput,
  condition?: ModelQuizQuestionsConditionInput | null,
};

export type DeleteQuizQuestionsMutation = {
  deleteQuizQuestions:  {
    __typename: "QuizQuestions",
    id: string,
    quizDetails: string,
  } | null,
};

export type CreateQuizResultMutationVariables = {
  input: CreateQuizResultInput,
  condition?: ModelQuizResultConditionInput | null,
};

export type CreateQuizResultMutation = {
  createQuizResult:  {
    __typename: "QuizResult",
    id: string,
    quizId: string,
    quizUser: string,
    quizResult: number,
    quizID: string | null,
  } | null,
};

export type UpdateQuizResultMutationVariables = {
  input: UpdateQuizResultInput,
  condition?: ModelQuizResultConditionInput | null,
};

export type UpdateQuizResultMutation = {
  updateQuizResult:  {
    __typename: "QuizResult",
    id: string,
    quizId: string,
    quizUser: string,
    quizResult: number,
    quizID: string | null,
  } | null,
};

export type DeleteQuizResultMutationVariables = {
  input: DeleteQuizResultInput,
  condition?: ModelQuizResultConditionInput | null,
};

export type DeleteQuizResultMutation = {
  deleteQuizResult:  {
    __typename: "QuizResult",
    id: string,
    quizId: string,
    quizUser: string,
    quizResult: number,
    quizID: string | null,
  } | null,
};

export type GetQuizQueryVariables = {
  id: string,
};

export type GetQuizQuery = {
  getQuiz:  {
    __typename: "Quiz",
    id: string,
    name: string,
    description: string | null,
    image_url: string | null,
    active: boolean | null,
    quizQuestionsID: string | null,
  } | null,
};

export type ListQuizsQueryVariables = {
  filter?: ModelQuizFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListQuizsQuery = {
  listQuizs:  {
    __typename: "ModelQuizConnection",
    items:  Array< {
      __typename: "Quiz",
      id: string,
      name: string,
      description: string | null,
      image_url: string | null,
      active: boolean | null,
      quizQuestionsID: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetQuizQuestionsQueryVariables = {
  id: string,
};

export type GetQuizQuestionsQuery = {
  getQuizQuestions:  {
    __typename: "QuizQuestions",
    id: string,
    quizDetails: string,
  } | null,
};

export type ListQuizQuestionssQueryVariables = {
  filter?: ModelQuizQuestionsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListQuizQuestionssQuery = {
  listQuizQuestionss:  {
    __typename: "ModelQuizQuestionsConnection",
    items:  Array< {
      __typename: "QuizQuestions",
      id: string,
      quizDetails: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetQuizResultQueryVariables = {
  id: string,
};

export type GetQuizResultQuery = {
  getQuizResult:  {
    __typename: "QuizResult",
    id: string,
    quizId: string,
    quizUser: string,
    quizResult: number,
    quizID: string | null,
  } | null,
};

export type ListQuizResultsQueryVariables = {
  filter?: ModelQuizResultFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListQuizResultsQuery = {
  listQuizResults:  {
    __typename: "ModelQuizResultConnection",
    items:  Array< {
      __typename: "QuizResult",
      id: string,
      quizId: string,
      quizUser: string,
      quizResult: number,
      quizID: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateQuizSubscription = {
  onCreateQuiz:  {
    __typename: "Quiz",
    id: string,
    name: string,
    description: string | null,
    image_url: string | null,
    active: boolean | null,
    quizQuestionsID: string | null,
  } | null,
};

export type OnUpdateQuizSubscription = {
  onUpdateQuiz:  {
    __typename: "Quiz",
    id: string,
    name: string,
    description: string | null,
    image_url: string | null,
    active: boolean | null,
    quizQuestionsID: string | null,
  } | null,
};

export type OnDeleteQuizSubscription = {
  onDeleteQuiz:  {
    __typename: "Quiz",
    id: string,
    name: string,
    description: string | null,
    image_url: string | null,
    active: boolean | null,
    quizQuestionsID: string | null,
  } | null,
};

export type OnCreateQuizQuestionsSubscription = {
  onCreateQuizQuestions:  {
    __typename: "QuizQuestions",
    id: string,
    quizDetails: string,
  } | null,
};

export type OnUpdateQuizQuestionsSubscription = {
  onUpdateQuizQuestions:  {
    __typename: "QuizQuestions",
    id: string,
    quizDetails: string,
  } | null,
};

export type OnDeleteQuizQuestionsSubscription = {
  onDeleteQuizQuestions:  {
    __typename: "QuizQuestions",
    id: string,
    quizDetails: string,
  } | null,
};

export type OnCreateQuizResultSubscription = {
  onCreateQuizResult:  {
    __typename: "QuizResult",
    id: string,
    quizId: string,
    quizUser: string,
    quizResult: number,
    quizID: string | null,
  } | null,
};

export type OnUpdateQuizResultSubscription = {
  onUpdateQuizResult:  {
    __typename: "QuizResult",
    id: string,
    quizId: string,
    quizUser: string,
    quizResult: number,
    quizID: string | null,
  } | null,
};

export type OnDeleteQuizResultSubscription = {
  onDeleteQuizResult:  {
    __typename: "QuizResult",
    id: string,
    quizId: string,
    quizUser: string,
    quizResult: number,
    quizID: string | null,
  } | null,
};
