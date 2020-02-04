import React, { Component } from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';
import CountDownQuestion from '../quiz/CountDownQuestion';
import StorageResource from '../resource/Storage';
import { ButtonAnswer } from './ButtonAnswer';
import "./styles.css";
import QuizResources from '../resource/Api';

class Core extends Component {
  constructor(props) {
    super(props);
    this.state = {
      incorrectAnswer: false,
      correctAnswer: false,
      showNextQuestionButton: false,
      endQuiz: false,
      currentQuestionIndex: 0,
      urlImagePhotoType1:"",
      buttons: {},
      buttonAnswers: [],
      buttonClasses: {},
      correct: [],
      incorrect: [],
      userInput: [],
      correctAnswers:[],
      filteredValue: 'all',
      userAttempt: 1,
      showDefaultResult: this.props.showDefaultResult != undefined ? this.props.showDefaultResult : true,
      onComplete: this.props.onComplete != undefined ? this.props.onComplete : null,
      customResultPage: this.props.customResultPage != undefined ? this.props.customResultPage : null,
      showInstantFeedback: this.props.showInstantFeedback != undefined ? this.props.showInstantFeedback : false,
      continueTillCorrect: this.props.continueTillCorrect != undefined ? this.props.continueTillCorrect : false
    };
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  checkAnswer = () => {
    const { correctAnswers, currentQuestionIndex,userInput } = this.state;
    let { correct, incorrect } = this.state;

    console.log(correctAnswers)
    console.log(userInput)
    var isCorrect = true;
    correctAnswers.map(value=>{
      if(userInput.indexOf(value)<0){
          isCorrect=false
      }
    })
    if(isCorrect){
      correct.push(currentQuestionIndex)
    }else{
      incorrect.push(currentQuestionIndex)
    }
  }

  checkAnswerV1 = (index, correctAnswer, answerSelectionType) => {
    const { correct, incorrect, currentQuestionIndex, continueTillCorrect, userInput } = this.state;
    let { userAttempt, showNextQuestionButton } = this.state;

    if (answerSelectionType == 'single') {
      if (userInput[currentQuestionIndex] == undefined) {
        userInput.push(index)
      }

      if (index == correctAnswer) {
        if (incorrect.indexOf(currentQuestionIndex) < 0 && correct.indexOf(currentQuestionIndex) < 0) {
          correct.push(currentQuestionIndex);
        }

        let disabledAll = {
          0: { disabled: true },
          1: { disabled: true },
          2: { disabled: true },
          3: { disabled: true }
        }

        this.setState((prevState) => {
          const buttons = Object.assign(
            {},
            prevState.buttons,
            {
              ...disabledAll,
              [index - 1]: {
                className: "response"
              },
            }
          );
          return { buttons };
        })

        this.setState({
          correctAnswer: true,
          incorrectAnswer: false,
          correct: correct,
          showNextQuestionButton: true,
        })
      } else {
        if (correct.indexOf(currentQuestionIndex) < 0 && incorrect.indexOf(currentQuestionIndex) < 0) {
          incorrect.push(currentQuestionIndex)
        }

        if (continueTillCorrect) {
          this.setState((prevState) => {
            const buttons = Object.assign(
              {},
              prevState.buttons,
              {
                [index - 1]: {
                  disabled: !prevState.buttons[index - 1]
                }
              }
            );
            return { buttons };
          });
        } else {
          let disabledAll = {
            0: { disabled: true },
            1: { disabled: true },
            2: { disabled: true },
            3: { disabled: true }
          }

          this.setState((prevState) => {
            const buttons = Object.assign(
              {},
              prevState.buttons,
              {
                ...disabledAll,
                [index - 1]: {
                  className: "response"
                },
              }
            );
            return { buttons };
          })

          this.setState({
            showNextQuestionButton: true,
          })
        }

        this.setState({
          incorrectAnswer: true,
          correctAnswer: false,
          incorrect: incorrect,
        })
      }
    } else {

      let maxNumberOfMultipleSelection = correctAnswer.length;

      if (userInput[currentQuestionIndex] == undefined) {
        userInput[currentQuestionIndex] = []
      }

      if (userInput[currentQuestionIndex].length < maxNumberOfMultipleSelection) {
        userInput[currentQuestionIndex].push(index)

        if (correctAnswer.includes(index)) {
          if (userInput[currentQuestionIndex].length <= maxNumberOfMultipleSelection) {

            this.setState((prevState) => {
              const buttons = Object.assign(
                {},
                prevState.buttons,
                {
                  [index - 1]: {
                    disabled: !prevState.buttons[index - 1],
                    className: "response"
                  },
                }
              );
              return { buttons };
            })


          }
        } else {
          if (userInput[currentQuestionIndex].length <= maxNumberOfMultipleSelection) {
            this.setState((prevState) => {
              const buttons = Object.assign(
                {},
                prevState.buttons,
                {
                  [index - 1]: {
                    className: "response"
                  },
                }
              );
              return { buttons };
            })
          }
        }
      }

      if (maxNumberOfMultipleSelection == userAttempt) {
        let cnt = 0;
        for (var i = 0; i < correctAnswer.length; i++) {
          if (userInput[currentQuestionIndex].includes(correctAnswer[i])) {
            cnt++;
          }
        }

        if (cnt == maxNumberOfMultipleSelection) {
          correct.push(currentQuestionIndex);
          this.setState({
            correctAnswer: true,
            incorrectAnswer: false,
            correct: correct,
            showNextQuestionButton: true,
            userAttempt: 1
          })
        } else {
          incorrect.push(currentQuestionIndex)
          this.setState({
            incorrectAnswer: true,
            correctAnswer: false,
            incorrect: incorrect,
            showNextQuestionButton: true,
            userAttempt: 1
          })
        }
      } else {
        if (!showNextQuestionButton) {
          this.setState({
            userInput,
            userAttempt: userAttempt + 1
          })
        }
      }
    }
  }

  nextQuestion(currentQuestionIndex){
    console.log("next question")
    this.checkAnswer()
    const { questions } = this.props;

    var initState = {
      incorrectAnswer: false,
      correctAnswer: false,
      showNextQuestionButton: false,
      buttons: {},
      userInput: [],
    }

    if (currentQuestionIndex + 1 == questions.length) {
      this.setState({
        ...initState,
        endQuiz: true
      })
    } else {
      this.setState({
        ...initState,
        currentQuestionIndex: currentQuestionIndex + 1,
        urlImagePhotoType1:"",

      })
    }
  }

  renderMessageforCorrectAnswer = (question) => {
    const defaultMessage = 'Risposta Corretta. Clicca Next per continuare.';
    return question.messageForCorrectAnswer || defaultMessage;
  }

  renderMessageforIncorrectAnswer = (question) => {
    const defaultMessage = 'Risposta errata. Clicca Next per continuare.';
    return question.messageForIncorrectAnswer || defaultMessage;
  }

  renderExplanation = (question, isResultPage) => {
    const explanation = question.explanation;
    if (!explanation) {
      return (null);
    }

    if (isResultPage) {
      return (
        <div className="explaination">
          {explanation}
        </div>
      )
    }

    return (
      <div>
        <br />
        {explanation}
      </div>
    )
  }

  handleChange = (event) => {
    this.setState({ filteredValue: event.target.value });
  }

  renderQuizResultFilter = () => {
    const { appLocale } = this.props;
    return (
      <div className="quiz-result-filter">
        <select value={this.state.filteredValue} onChange={this.handleChange}>
          <option value="all">{appLocale.resultFilterAll}</option>
          <option value="correct">{appLocale.resultFilterCorrect}</option>
          <option value="incorrect">{appLocale.resultFilterIncorrect}</option>
        </select>
      </div>
    );
  }

  renderAnswerInResult = (question, userInputIndex) => {
    const { answers, correctAnswer, questionType } = question;
    let { answerSelectionType } = question;
    let answerBtnCorrectClassName;
    let answerBtnIncorrectClassName;

    // Default single to avoid code breaking due to automatic version upgrade
    answerSelectionType = answerSelectionType || 'single';

    return answers.map((answer, index) => {
      if (answerSelectionType == 'single') {
        answerBtnCorrectClassName = (index + 1 == correctAnswer ? ' correct ' : '')
        answerBtnIncorrectClassName = (userInputIndex != correctAnswer && index + 1 == userInputIndex ? ' incorrect ' : '')
      } else {
        answerBtnCorrectClassName = (correctAnswer.includes(index + 1) ? ' correct ' : '')
        answerBtnIncorrectClassName = (!correctAnswer.includes(index + 1) && userInputIndex.includes(index + 1) ? ' incorrect ' : '')
      }

      return (
        <div key={index}>
          <button disabled={true} className={"answerBtn btn " + answerBtnCorrectClassName + answerBtnIncorrectClassName}>
            {questionType == 'text' && <span>{answer}</span>}
            {questionType == 'photo' && <img src={answer} />}
          </button>
        </div>
      )
    });
  }

  renderQuizResultQuestions = () => {
    const { filteredValue, userInput } = this.state;
    let questions = this.props.questions;

    if (filteredValue != 'all') {
      questions = questions.filter((question, index) => {
        return this.state[filteredValue].indexOf(index) != -1
      })

      userInput = userInput.filter((input, index) => {
        return this.state[filteredValue].indexOf(index) != -1
      })
    }

    return questions.map((question, index) => {
      const userInputIndex = userInput[index];

      // Default single to avoid code breaking due to automatic version upgrade
      let answerSelectionType = question.answerSelectionType || 'single';

      return (
        <div className="result-answer-wrapper" key={index + 1}>

          <h3 dangerouslySetInnerHTML={this.rawMarkup(`Q${question.questionIndex}: ${question.question}`)} />
          {
            this.renderTags(answerSelectionType, question.correctAnswer.length)
          }
          <div className="result-answer">
            {
              question.answers.map((answer, index) => {
                return (
                  <div key={index}>
                    <button disabled={true} className={"answerBtn btn" + (index + 1 == question.correctAnswer ? ' correct ' : '') + (userInputIndex != question.correctAnswer && index + 1 == userInputIndex ? ' incorrect ' : '')}>
                      {question.questionType == 'text' && <span>{answer}</span>}
                      {question.questionType == 'photo' && <img src={answer} />}
                    </button>
                  </div>
                )
              })
            }
          </div>
          {this.renderExplanation(question, true)}
        </div>
      )
    })
  }

  rawMarkup = (data) => {
    let rawMarkup = marked(data, { sanitize: true });
    return { __html: rawMarkup };
  }

  renderAnswers = (question, buttons) => {
    console.log(question)
    const { answers, correctAnswer, questionType } = question;
    let { answerSelectionType } = question;
    // Default single to avoid code breaking due to automatic version upgrade
    answerSelectionType = answerSelectionType || 'single';

    return answers.map((answer, index) => {
        var isSelected = this.state.userInput.indexOf(index)<0?false:true
        var buttonAnswer = (<ButtonAnswer isSelected={isSelected} index={index} correctAnswer={correctAnswer} answerSelectionType={answerSelectionType} answer={answer} questionType={questionType} parent={this}></ButtonAnswer>)
        return(buttonAnswer)
    })
  }

  clickOnButton = (i,correctAnswer)=>{
    let {userInput} = this.state
    if(this.state.userInput.indexOf(i)>=0){
      this.state.userInput.splice(this.state.userInput.indexOf(i), 1)
    }else if(userInput[this.state.currentQuestionIndex]==undefined || userInput.length < correctAnswer.length){
      userInput.push(i)
    }
    this.setState({correctAnswers:correctAnswer})
  }

  renderAnswersV2 = (question, buttons) => {
    const { answers, correctAnswer, questionType } = question;
    let { answerSelectionType } = question;
    // Default single to avoid code breaking due to automatic version upgrade
    answerSelectionType = answerSelectionType || 'single';

    return answers.map((answer, index) => {
      if (buttons[index] != undefined) {
        return (
          <button key={index} disabled={buttons[index].disabled || false} className={`${buttons[index].className} answerBtn btn`} onClick={() => this.checkAnswer(index + 1, correctAnswer, answerSelectionType)}>
            {questionType == 'text' && <span>{answer}</span>}
            {questionType == 'phototype2' && <img style={{marginLeft:'25%',maxWidth:'50%',maxHeight:'50%',verticalAlign:'center'}}  src={answer} />}
            {questionType == 'phototype1' && <span>{answer}</span>}
          </button>
        )
      } else {
        return (
          <button key={index} onClick={() => this.checkAnswer(index + 1, correctAnswer, answerSelectionType)} className="answerBtn btn">
            {questionType == 'text' && answer}
            {questionType == 'phototype2' && <img style={{marginLeft:'25%',maxWidth:'50%',maxHeight:'50%'}}  src={answer} />}
            {questionType == 'phototype1' && <span>{answer}</span>}
          </button>
        )
      }
    })
  }

  renderTags(answerSelectionType, numberOfSelection) {
    const {
      appLocale: {
        singleSelectionTagText,
        multipleSelectionTagText,
        pickNumberOfSelection
      }
    } = this.props;
    console.log(singleSelectionTagText);
    return (
      <div className="tag-container">
        {
          answerSelectionType == 'single' && <span className="single selection-tag"> {singleSelectionTagText}</span>
        }
        {
          answerSelectionType == 'multiple' && <span className="multiple selection-tag"> {multipleSelectionTagText}</span>
        }
        <span className="number-of-selection">{pickNumberOfSelection.replace("<numberOfSelection>", numberOfSelection)}</span>
      </div>
    )
  }

  saveResult = (totalPoints)=>{
    console.log("Save result")
    console.log(totalPoints)
    var quizId = window.location.pathname.split("/")[2]
    console.log(quizId)
    var userState = window.profilecomponent.getUserDetails()
    console.log(userState.userLogged)
    var userData = userState.userLogged.username+"####"+userState.userLogged.email
    QuizResources.insertQuizResult(quizId,userData,totalPoints)
  }

  render() {
    const { questions, appLocale } = this.props;
    const {
      correct,
      incorrect,
      userInput,
      currentQuestionIndex,
      correctAnswer,
      incorrectAnswer,
      endQuiz,
      showInstantFeedback,
      buttons,
      onComplete,
      showNextQuestionButton,
      showDefaultResult,
      customResultPage
    } = this.state;
    let question = questions[currentQuestionIndex];
    let totalPoints = 0;
    let correctPoints = 0;
    let totalTime = 0;

    for (var i = 0; i < questions.length; i++) {
      let point = questions[i].point || 0;
      let time = questions[i].time || 0;
      if (typeof point === 'string' || point instanceof String) {
        point = parseInt(point)
      }
      if (typeof time === 'string' || time instanceof String) {
        time = parseInt(time)
      }

      totalPoints = totalPoints + point;
      totalTime = totalTime + time;

      if (correct.includes(i)) {
        correctPoints = correctPoints + point;
      }

    }
    console.log(totalTime);

    const questionSummary = {
      numberOfQuestions: questions.length,
      numberOfCorrectAnswers: correct.length,
      numberOfIncorrectAnswers: incorrect.length,
      questions: questions,
      userInput: userInput,
      totalPoints: totalPoints,
      correctPoints: correctPoints
    };

    let { answerSelectionType } = question;

    // Default single to avoid code breaking due to automatic version upgrade
    answerSelectionType = answerSelectionType || 'single';
    
    return (
      <div className="questionWrapper">
        {!endQuiz &&
          <div className="questionWrapperBody">
            <div className="questionModal">
              {incorrectAnswer && showInstantFeedback &&
                <div className="alert incorrect">{this.renderMessageforIncorrectAnswer(question)}</div>
              }
              {correctAnswer && showInstantFeedback &&
                <div className="alert correct">
                  {this.renderMessageforCorrectAnswer(question)}
                  {this.renderExplanation(question, false)}
                </div>
              }
            </div>
            <div>{appLocale.question} {currentQuestionIndex + 1}:</div>
            <CountDownQuestion question_second={question.time} endQuiz={endQuiz} start={!showNextQuestionButton} currentQuestionIndex={currentQuestionIndex} onEndTime={this.nextQuestion}></CountDownQuestion>
            <h3 dangerouslySetInnerHTML={this.rawMarkup(question.question)} />
            {
              this.renderTags(answerSelectionType, question.correctAnswer.length)
            }
            {question.questionType == 'phototype1' && <img style={{marginLeft:'25%',maxWidth:'50%',maxHeight:'50%'}} src={this.state.urlImagePhotoType1!=""?this.state.urlImagePhotoType1:this.downloadUrlImage(question)}/>}
            {
              this.renderAnswers(question, buttons)
            }
           
            <div><button onClick={() => this.nextQuestion(currentQuestionIndex)} style={{backgroundColor:'white'}} className="startQuizBtn btn">{appLocale.nextQuestionBtn}</button></div>
            
          </div>
        }
        {endQuiz && showDefaultResult && customResultPage == null &&
          <div className="card-body">
            <h1>Quiz Completato</h1>
            <h2>
              {appLocale.resultPageHeaderText.replace("<correctIndexLength>", correct.length).replace("<questionLength>", questions.length)}
            </h2>
            <h2>
              {appLocale.resultPagePoint.replace("<correctPoints>", correctPoints).replace("<totalPoints>", totalPoints)}
            </h2>
            <br />
           {this.saveResult(totalPoints)/* {this.renderQuizResultFilter()}
            {this.renderQuizResultQuestions()}*/}
          </div>
        }

        {
          endQuiz && onComplete != undefined &&
          onComplete(questionSummary)
        }

        {
          endQuiz && !showDefaultResult && customResultPage != undefined &&
          customResultPage(questionSummary)
        }
      </div>
    );
  }
  downloadUrlImage =(question)=>{
    console.log(question)
    StorageResource.getImage(question.photoQuestion).then(data=>this.setState({urlImagePhotoType1:data}))
  }
}



Core.propTypes = {
  questions: PropTypes.array,
  showDefaultResult: PropTypes.bool,
  onComplete: PropTypes.func,
  customResultPage: PropTypes.func,
  showInstantFeedback: PropTypes.bool,
  continueTillCorrect: PropTypes.bool,
  appLocale: PropTypes.object
};

export default Core;
