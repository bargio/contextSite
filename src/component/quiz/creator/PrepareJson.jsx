import QuizResources from "../../resource/Api";
import StorageResource from "../../resource/Storage";



function createQuestionJson(question) {
    console.log(question);
    let currentQuestionData = question.current.state;
    let type = currentQuestionData.isTextQuestion ? "text" : currentQuestionData.isImageQuestion ? "phototype1" : currentQuestionData.isImageQuestion2 ? "phototype2" : "video";
    let answers = [];
    let countCorrect = [];
    currentQuestionData.response.map((response, i) => {
        console.log(response)
        var responseText = response.responseText
        answers.push(responseText);
        if (response.isCorrect) {
            console.log(response.isCorrect)
            countCorrect.push(i);
        }
    })
    var imageUrl = "";
    if (type === "phototype1") {
        imageUrl = currentQuestionData.imageType1
    }

    let jsonQuestion = {
        "question": currentQuestionData.question,
        "questionType": type,
        "answerSelectionType": countCorrect.length > 1 ? "multiple" : "single",
        "answers": answers,
        "photoQuestion": imageUrl,
        "correctAnswer": countCorrect,
        "messageForCorrectAnswer": "Correct answer. Good job.",
        "messageForIncorrectAnswer": "Incorrect answer. Please try again.",
        "explanation": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "point": currentQuestionData.score,
        "time": currentQuestionData.time
    }
    console.log(jsonQuestion)
    return jsonQuestion;
}

export function PrepareJsonForSave(quiz, username) {
    try {

        console.log("Preparo il json")
        console.log(quiz)
        let questions = []
        quiz.questions.map((question) => (
            questions.push(createQuestionJson(question)))
        );
        let jsonQuiz = {
            "timer": 300,
            "quiz": {
                "appLocale": {
                    "landingHeaderText": quiz.questions.length + " Domande",
                    "question": "Domanda",
                    "startQuizBtn": "Inizia",
                    "resultFilterAll": "Tutte",
                    "resultFilterCorrect": "Corrette",
                    "resultFilterIncorrect": "Errate",
                    "nextQuestionBtn": "Prossima",
                    "resultPageHeaderText": "Corrette <correctIndexLength> su <questionLength>.",
                    "resultPagePoint": "Hai totalizzato <correctPoints>  su <totalPoints> punti.",
                    "singleSelectionTagText": "Risposta Singola",
                    "multipleSelectionTagText": "Risposta Multipla",
                    "pickNumberOfSelection": "Scelte <numberOfSelection>"
                },
                "quizTitle": quiz.title,
                "quizSynopsis": quiz.description,
                "questions": questions
            }
        }
        console.log(quiz)
        if (quiz.image != null) {
            var imageUrl = StorageResource.putImage(new Blob([quiz.image.file], { type: 'image/png' }), new Date().valueOf())
            imageUrl.then(result => QuizResources.insertQuiz(jsonQuiz, result, username, quiz.expireDate, new Date(), quiz.smallDescription).then(data => console.log(data)))
        } else {
            QuizResources.insertQuiz(jsonQuiz, "", username, quiz.expireDate, new Date(), quiz.smallDescription).then(data => console.log(data))
        }

        /*
        var id = QuizResources.insertQuiz(jsonQuiz);
        id.then(
            result => StorageResource.putImage(new Blob([quiz.image.file],{type: 'image/png'}),result), // shows "done!" after 1 second
            error => alert(error) // doesn't run
        )*/
        //console.log("ID: "+ id);
        console.log(quiz.image);
        //StorageResource.putImage(quiz.image,id)

    } catch (error) {
        console.log("******************")
        console.log(error)
    }

}