import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Core from './Core';
import { defaultLocale } from './Locale';
import "./styles.css";
import CountDownQuestion from '../quiz/CountDownQuestion';
import AuthenticationManager from '../auth/AuthenticationManager';

class QuizTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start: false,
      startCountDown: false,
      isLoggedIn: false
    }
    this.start = this.start.bind(this);

  }

  componentDidMount() {
    AuthenticationManager.isLoggedIn(this.checkIfLogged)
  }

  checkIfLogged = (user) => {
    if (user != "Error") {
      this.setState({ isLoggedIn: true })
    } else {
      this.setState({ isLoggedIn: false })
    }
  }

  start = () => {
    if (this.state.isLoggedIn) {
      this.props.hideResult()
      this.setState({
        start: true,
        startCountDown: true
      })
    } else {
      window.errorcomponent.showMessage("Per poter partecipare al quiz devi loggarti. Clicca qui per eseguire la login", "warning", "login")
    }
  }

  shuffleQuestions = (questions) => {
    for (let i = questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [questions[i], questions[j]] = [questions[j], questions[i]];
    }
    return questions;
  }

  render() {
    const { currentContest, shuffle, showDefaultResult, onComplete, customResultPage, showInstantFeedback, continueTillCorrect } = this.props;
    var quiz = currentContest.quiz;
    console.log(this)
    if (!quiz) {
      console.error("Quiz object is required.");
      return (null);
    }

    const appLocale = {
      ...defaultLocale,
      ...quiz.appLocale
    };

    let questions = quiz.questions;
    if (shuffle) {
      questions = this.shuffleQuestions(questions);
    }

    questions = questions.map((question, index) => ({
      ...question,
      questionIndex: index + 1
    }));

    return (
      <div className="react-quiz-container">
        {!this.state.start &&
          <div>
            <h2>{quiz.quizTitle}</h2>
            <div> {appLocale.landingHeaderText.replace("<questionLength>", quiz.questions.length)}</div>
            {quiz.quizSynopsis &&
              <div className="quiz-synopsis">
                {quiz.quizSynopsis}
              </div>
            }
            {this.props.canStartQuiz &&
              <div className="startQuizWrapper">
                <button onClick={() => this.start()} className="startQuizBtn btn">{appLocale.startQuizBtn}</button>
              </div>
            }
          </div>
        }

        {
          this.state.start && <Core questions={questions} showDefaultResult={true} onComplete={onComplete} /*customResultPage={customResultPage}*/ showInstantFeedback={showInstantFeedback} continueTillCorrect={continueTillCorrect} appLocale={appLocale} />
        }
      </div>
    );
  }
}

QuizTest.propTypes = {
  quiz: PropTypes.object,
  shuffle: PropTypes.bool,
  showDefaultResult: PropTypes.bool,
  onComplete: PropTypes.func,
  customResultPage: PropTypes.func,
  showInstantFeedback: PropTypes.bool,
  continueTillCorrect: PropTypes.bool
};

export default QuizTest;
