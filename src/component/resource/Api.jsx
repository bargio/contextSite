import * as queries from '../../graphql/queries';
import * as mutations from '../../graphql/mutations';

import Amplify, { API, graphqlOperation } from 'aws-amplify';
import awsconfig from '../../aws-exports';
Amplify.configure(awsconfig);

const QuizResources = {

    getAllQuizs: async function getAllQuiz() {
        const allTodos = await API.graphql(graphqlOperation(queries.listQuizs));
        
        return allTodos;
    },

    getUserQuizAndAdministrator: async function getUserQuizAndAdministrator(user){
        var adminQuiz = await API.graphql(graphqlOperation(queries.listQuizs,
            {
                filter: {
                    or:[
                        {creator: { eq: "admin"}},
                        {creator: { eq: user }}
                    ]
                }
            }));
        return adminQuiz
    },

    getQuiz: async function getQuiz(id) {
        const oneTodo = await API.graphql(graphqlOperation(queries.getQuiz, { id: id }));
        console.log(oneTodo);
        return oneTodo
    },

    insertQuiz: async function insertQuiz(quiz, image_url, creator, expireDate, createDate, smallDescription) {
        const quizQuestions = {
            quizDetails: JSON.stringify({ quiz })
        };
        try {
            const quizQuestion = await API.graphql(graphqlOperation(mutations.createQuizQuestions, { input: quizQuestions }));
            const quiz1 = {
                name: quiz.quiz.quizTitle,
                creator: creator,
                createDate: createDate,
                expireDate: expireDate,
                smallDescription: smallDescription,
                description: quiz.quiz.quizSynopsis,
                image_url: image_url,
                active: false,
                quizQuestionsID: quizQuestion.data.createQuizQuestions.id
            };
            const newQuiz = await API.graphql(graphqlOperation(mutations.createQuiz, { input: quiz1 }));
            return quizQuestion.data.createQuizQuestions.id;
        } catch (error) {
            console.log(error);
        }
    },

    deleteQuiz: async function deleteQuiz(quiz, reloadPage) {
        console.log("Delete Quiz")
        console.log(quiz)
        try {
            const quizQuestionsDel = await API.graphql(graphqlOperation(mutations.deleteQuizQuestions, { input: { id: quiz.quizQuestionsID } }));
            console.log(quizQuestionsDel)
            const quizDel = await API.graphql(graphqlOperation(mutations.deleteQuiz, { input: { id: quiz.id } }));
            console.log(quizDel)
            reloadPage()
        } catch (error) {
            console.log(error);
        }
    },

    getQuizQuestion: async function getQuizQuestion(id) {
        console.log("GetQuizQuestion")
        const oneTodo = await API.graphql(graphqlOperation(queries.getQuizQuestions, { id: id }));
        return oneTodo;
    },
    getQuizQuestionFromQuestionID: async function getQuizQuestionFromQuestionID(id) {
        try {
            var quiz = await this.getQuiz(id)
            var quizQuestion = await this.getQuizQuestion(quiz.data.getQuiz.quizQuestionsID)
            console.log(quizQuestion.data.getQuizQuestions.quizDetails)
            return quizQuestion.data.getQuizQuestions.quizDetails
        } catch (error) {
            console.log(error)
            return "Error"
        }
    },
    getAdminListQuiz: async function getAdminListQuiz() {
        var adminQuiz = await API.graphql(graphqlOperation(queries.listQuizs,
            {
                filter: {
                    id: {
                        eq: "e9a86a80-089a-443f-b031-91f35abc5255"
                    }
                }
            }));
        console.log(adminQuiz)
    },
    insertQuizResult: async function insertQuizResult(quizId, quizUser, resultPoint) {
        try {
            const quizResult = {
                quizId: quizId,
                quizUser: quizUser,
                quizResult: resultPoint,
            };
            const ok = await API.graphql(graphqlOperation(mutations.createQuizResult, { input: quizResult }));
            console.log(ok)
        } catch (error) {
            console.log(error);
        }
    },
    getUserQuizResult: async function getUserQuizResult(user) {
        var userResults = await API.graphql(graphqlOperation(queries.listQuizResults,
            {
                filter: {
                    quizUser: {
                        eq: user
                    }
                }
            }));
        return userResults
    },
    getUserQuizResultWithQuizID: async function getUserQuizResultWithQuizID(user,id) {
        var userResults = await API.graphql(graphqlOperation(queries.listQuizResults,
            {
                filter: {
                    quizId:{
                        eq: id
                    }
                }
            }));
        return userResults
    },


}
export default QuizResources;