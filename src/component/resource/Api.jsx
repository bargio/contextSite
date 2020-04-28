import * as queries from '../../graphql/queries';
import * as mutations from '../../graphql/mutations';

import Amplify, { API, graphqlOperation } from 'aws-amplify';
import awsconfig from '../../aws-exports';
import ProfileUser from '../user/ProfileUser';
Amplify.configure(awsconfig);

export const QuizResources = {

    getAllQuizs: async function getAllQuiz() {
        const allTodos = await API.graphql(graphqlOperation(queries.listQuizs));

        return allTodos;
    },

    getUserQuizAndAdministrator: async function getUserQuizAndAdministrator(user) {
        var adminQuiz = await API.graphql(graphqlOperation(queries.listQuizs,
            {
                filter: {
                    or: [
                        { creator: { eq: "admin" } },
                        { creator: { eq: user } }
                    ]
                }
            }));
        return adminQuiz
    },
    getAdministratorQuizs: async function getUserQuizAndAdministrator() {
        var adminQuiz = await API.graphql(graphqlOperation(queries.listQuizs,
            {
                filter: {
                    or: [
                        { creator: { eq: "admin" } }
                    ]
                }
            }));
        return adminQuiz
    },

    getQuizIds: async function getQuizIds(listIds) {
        console.log(listIds)
        var adminQuiz = await API.graphql(graphqlOperation(queries.listQuizs,
            {
                limit: 9999999,
                filter: {
                    or: listIds,
                }
            }));
        console.log(adminQuiz)
        return adminQuiz
    },

    getUsersQuiz: async function getUsersQuiz(user) {
        console.log("Search quiz for user ", user)
        var adminQuiz = await API.graphql(graphqlOperation(queries.quizByCreator,
            {
                creator: user

            }));
        console.log(adminQuiz)
        return adminQuiz
    },
    getQuizByGroupCreator: async function getQuizByGroupCreator(user) {
        console.log("Search quiz for user ", user)
        /*var adminQuiz = await API.graphql(graphqlOperation(queries.quizByGroupCreator,
            {
                filter: {
                    groupCreator_contains: "administrators"
                }

            }));*/
        var adminQuiz = await API.graphql(graphqlOperation(queries.listQuizs,
            {
                limit: 9999999,
                filter: {
                    groupCreator:{contains: "administrator"}
                }
            }));
        console.log(adminQuiz)
        console.log(adminQuiz)
        return adminQuiz
    },

    getQuiz: async function getQuiz(id) {
        const oneTodo = await API.graphql(graphqlOperation(queries.getQuiz, { id: id }));
        console.log(oneTodo);
        return oneTodo
    },

    insertQuiz: async function insertQuiz(quiz, image_url, creator, expireDate, createDate, smallDescription, userGroups) {
        const quizQuestions = {
            quizDetails: JSON.stringify({ quiz }),
            quizCreator: creator
        };
        try {
            const quizQuestion = await API.graphql(graphqlOperation(mutations.createQuizQuestions, { input: quizQuestions }));
            const quiz1 = {
                name: quiz.quiz.quizTitle,
                creator: creator,
                groupCreator: userGroups,
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
            return quizQuestion.data.getQuizQuestions
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
    insertQuizResult: async function insertQuizResult(quizId, quizUser, resultPoint, quizUserId) {
        try {
            const quizResult = {
                quizId: quizId,
                quizUser: quizUserId,
                quizResult: resultPoint,
                quizUserId: quizUser
            };
            const ok = await API.graphql(graphqlOperation(mutations.createQuizResult, { input: quizResult }));
            console.log(ok)
        } catch (error) {
            console.log(error);
        }
    },
    getUserQuizResult: async function getUserQuizResult(user) {
        var userResults = await API.graphql(graphqlOperation(queries.quizResultByUser,
            {
                quizUser: user
            }));
        console.log(userResults)
        return userResults
    },
    getUserQuizResultWithQuizID: async function getUserQuizResultWithQuizID(id) {
        var userResults = await API.graphql(graphqlOperation(queries.listQuizResults,
            {
                filter: {
                    quizId: {
                        eq: id
                    }
                }
            }));
        return userResults
    },
    insertQuizUncompleted: async function insertQuizUncompleted(userId, quizData, quizQuestionData) {
        console.log(quizData)
        console.log(quizQuestionData)
        try {
            const quizUncompleted = {
                userId: userId,
                quizData: JSON.stringify(quizData),
                quizQuestionData: JSON.stringify(quizQuestionData),
            };
            console.log(quizUncompleted)
            const ok = await API.graphql(graphqlOperation(mutations.createQuizUncompleted, { input: quizUncompleted }));
            console.log(ok)
        } catch (error) {
            console.log(error);
        }
    },
    getUserQuizUncompleted: async function getUserQuizUncompleted(user) {
        var adminQuiz = await API.graphql(graphqlOperation(queries.getUncompletedByUserId,
            {
                userId: user
            }));
        return adminQuiz
    },
    deleteUserQuizUncompleted: async function deleteUserQuizUncompleted(id) {
        var quizUncompleted = await API.graphql(graphqlOperation(mutations.deleteQuizUncompleted,
                { input: { id: id}}
            ));
    },
}

export const UserResources = {
    insertUser: async function insertUser(email, group) {
        try {
            const user = {
                userEmail: email,
                userGroup: group,
                active: true
            };
            const userResult = await API.graphql(graphqlOperation(mutations.createUsers, { input: user }));
            ProfileUser.profile.id = userResult.data.createUsers.id
            console.log(ProfileUser.profile)
            console.log(userResult)
            return userResult
        } catch (error) {
            console.log(error);
            return null
        }
    },
    getUserId: async function getUserId(email) {
        var user = await API.graphql(graphqlOperation(queries.getUserByEmail,
            {
                userEmail: email
            }));
        return user
    },
}

export const AtlanteResources = {
    insertNewAnimal: async function insertNewAnimal(categoryTmp, animalNameTmp,imageNameTmp,descriptionIdTmp) {
        try {
            const animalsList = {
                category: categoryTmp,
                animalName: animalNameTmp,
                image: imageNameTmp,
                descriptionID:descriptionIdTmp
            };
            const result = await API.graphql(graphqlOperation(mutations.createAnimalsList, { input: animalsList }));
            console.log(result)
        } catch (error) {
            console.log(error);
        }
    },
    insertAnimalDetails: async function insertAnimalDetails(jsonDetailsTmp) {
        try {
            const animalsDetails = {
                jsonDetails: jsonDetailsTmp
            };
            const result = await API.graphql(graphqlOperation(mutations.createAnimalDetails, { input: animalsDetails }));
            return result.data.createAnimalDetails
        } catch (error) {
            console.log(error);
            return null
        }
    },
    getByCategory: async function getByCategory(categoryWished) {
        var listAnimals = await API.graphql(graphqlOperation(queries.getByCategory,
            {
                category: categoryWished
            }));
        return listAnimals
    },
    getAnimalDetails: async function getAnimalDetails(id) {
        var listAnimals = await API.graphql(graphqlOperation(queries.getAnimalDetails,
            {
                id: id
            }));
        return listAnimals
    },
    
}