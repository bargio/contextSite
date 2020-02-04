import React from 'react'
import { Button } from 'react-bootstrap'
import "./styles.css";
export class ButtonAnswer extends React.Component {
    
    constructor(props){
        super(props)
        this.state={
            response:""
        }
    }
    checkAnswer = (index,correctAnswer)=>{
        this.props.parent.clickOnButton(index-1,correctAnswer)
    }
    render() {
        let {index,correctAnswer,answerSelectionType,answer,questionType,isSelected} = this.props;
        var classValue = "answerBtn btn"
        if(isSelected){
            classValue = "response answerBtn btn"
        }
        return (<button key={index} className={classValue} onClick={() => this.checkAnswer(index + 1, correctAnswer, answerSelectionType)}>
            {questionType == 'text' && <span>{answer}</span>}
            {questionType == 'phototype2' && <img style={{ marginLeft: '25%', maxWidth: '50%', maxHeight: '50%', verticalAlign: 'center' }} src={answer} />}
            {questionType == 'phototype1' && <span>{answer}</span>}
             </button>)
    }
}