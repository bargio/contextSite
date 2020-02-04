import React, { PropTypes, Component } from 'react';

class Countdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      min: 0,
      sec: 0,
      currentQuestionIndex: 0,
      onEndTime: null
    }
  }

  componentDidMount() {
    /*const date = this.calculateCountdownOnlyDuration(this.props.question_minutes);*/
    this.prepareStateMinuteAndSecond(this.props.question_second);
    this.setState({onEndTime:this.props.onEndTime})
    this.startCount();
  }

  prepareStateMinuteAndSecond(questionSeconds){
    let minutes= Math.floor(questionSeconds/60);
    let seconds= questionSeconds - minutes*60;
    this.setState({sec:seconds,min:minutes,currentQuestionIndex: this.props.currentQuestionIndex});
  }

  startCount() {
    // update every second
    this.interval = setInterval(() => {
      if (this.props.start) {
        const date = this.calculateCountdown(this.state);
        date ? this.setState(date) : this.nextCounterOrStop();
      }
      if(this.props.currentQuestionIndex != this.state.currentQuestionIndex){
        console.log(this.state.currentQuestionIndex + " " + this.props.currentQuestionIndex);
        this.prepareStateMinuteAndSecond(this.props.question_second);
      }
      if(this.props.endQuiz){
        this.nextCounterOrStop();
      }
    }, 1000);
  }

  componentWillUnmount() {
    this.stop();
  }

  calculateCountdown(endDate) {
    var timestamp = this.state.min*60+this.state.sec;
    let diff = timestamp-1;
    // clear countdown when date is reached
    if (diff <= 0) return false;

    const timeLeft = {
      years: 0,
      days: 0,
      hours: 0,
      min: 0,
      sec: 0,
      millisec: 0,
    };

    // calculate time difference between now and expected date
    if (diff >= (365.25 * 86400)) { // 365.25 * 24 * 60 * 60
      timeLeft.years = Math.floor(diff / (365.25 * 86400));
      diff -= timeLeft.years * 365.25 * 86400;
    }
    if (diff >= 86400) { // 24 * 60 * 60
      timeLeft.days = Math.floor(diff / 86400);
      diff -= timeLeft.days * 86400;
    }
    if (diff >= 3600) { // 60 * 60
      timeLeft.hours = Math.floor(diff / 3600);
      diff -= timeLeft.hours * 3600;
    }
    if (diff >= 60) {
      timeLeft.min = Math.floor(diff / 60);
      diff -= timeLeft.min * 60;
    }
    timeLeft.sec = diff;

    return timeLeft;
  }

  calculateCountdownOnlyDuration(endDate) {

    let diff = endDate * 60;
    console.log(diff)

    // clear countdown when date is reached
    if (diff <= 0) return false;

    const timeLeft = {
      years: 0,
      days: 0,
      hours: 0,
      min: 0,
      sec: 0,
      millisec: 0,
    };

    // calculate time difference between now and expected date
    if (diff >= (365.25 * 86400)) { // 365.25 * 24 * 60 * 60
      timeLeft.years = Math.floor(diff / (365.25 * 86400));
      diff -= timeLeft.years * 365.25 * 86400;
    }
    if (diff >= 86400) { // 24 * 60 * 60
      timeLeft.days = Math.floor(diff / 86400);
      diff -= timeLeft.days * 86400;
    }
    if (diff >= 3600) { // 60 * 60
      timeLeft.hours = Math.floor(diff / 3600);
      diff -= timeLeft.hours * 3600;
    }
    if (diff >= 60) {
      timeLeft.min = Math.floor(diff / 60);
      diff -= timeLeft.min * 60;
    }
    timeLeft.sec = diff;

    return timeLeft;
  }

  nextCounterOrStop() {
    this.state.onEndTime(this.state.currentQuestionIndex);
  }

  stop(){
    clearInterval(this.interval);
  }

  addLeadingZeros(value) {
    value = String(value);
    while (value.length < 2) {
      value = '0' + value;
    }
    return value;
  }

  render() {
    const countDown = this.state;

    return (
      <div className="Countdown">
        <span className="Countdown-col">
          <span className="Countdown-col-element">
            <strong>{this.addLeadingZeros(countDown.min)}</strong>
            <span> Min </span>
          </span>
        </span>

        <span className="Countdown-col">
          <span className="Countdown-col-element">
            <strong>{this.addLeadingZeros(countDown.sec)}</strong>
            <span> Sec</span>
          </span>
        </span>
      </div>
    );
  }
}

Countdown.propTypes = {
  date: null
};

Countdown.defaultProps = {
  date: new Date()
};

export default Countdown;