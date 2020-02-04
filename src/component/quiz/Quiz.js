import React from 'react';
import Quiz from 'react-quiz-component';
import { quizOld } from './QuizQuestion';
import CountDownQuestion from './CountDownQuestion';
import { Grid, ListItem, ListItemText, Typography } from '@material-ui/core';
import QuizTest from '../quiz-test/QuizTest';
import { Redirect } from 'react-router-dom'
import QuizResources from '../resource/Api';
import MyLoader from '../loading/Loader';
import AuthenticationManager from '../auth/AuthenticationManager';
import { Button } from 'react-bootstrap';


export class QuizContest extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            quiz: null,
            result: null,
            canStartQuiz: true,
            showResult: true
        }
    }
    customResultPage(result) {
        // your axios call here
        console.log(result)
        localStorage.setItem("result", JSON.stringify(result))
        // route to new page by changing window.location
        return <Button>Ciao</Button>
        //return <Redirect to='/quiz/thanks' />
    }

    componentDidMount() {
        var quizId = window.location.pathname.split("/")[2]
        QuizResources.getQuizQuestionFromQuestionID(quizId).then(data => { console.log(data); this.setState({ quiz: data }) })
        AuthenticationManager.isLoggedIn(this.getQuizRes)
    }

    getQuizRes = (data) => {
        window.profilecomponent.isLoggedIn(data)
        var userState = window.profilecomponent.getUserDetails()
        if (userState != null) {
            QuizResources.getUserQuizResultWithQuizID(userState.userLogged, window.location.pathname.split("/")[2]).then(data => {
                data.data.listQuizResults.items.sort((a, b) => b.quizResult - a.quizResult); //
                this.setState({ result: data.data.listQuizResults.items });
                this.checkIfFoundResult();
            })
        }
    }


    returnToQuizPage = () => {
        window.location.href = "/quiz"
    }

    checkIfFoundResult = (item) => {
        var userState = window.profilecomponent.getUserDetails()
        this.state.result.map(item => {
            var value = item.quizUser.split("####");
            if (value[0] == userState.userLogged.username && value[1] == userState.userLogged.email) {
                this.setState({ canStartQuiz: false })
            }
        })
    }

    isCompleted = (item) => {
        var userState = window.profilecomponent.getUserDetails()
        var value = item.quizUser.split("####");
        if (value[0] == userState.userLogged.username && value[1] == userState.userLogged.email) {
            return true;
        }
        return false;
    }



    hideResult = () => {
        this.setState({ showResult: false })
    }

    render() {
        return (
            <Grid container
                justify="space-around"
                direction="column"
                alignItems="center">
                <Grid item xs={12} sm={10} md={6} large={4} xl={2} zeroMinWidth>
                    {this.state.quiz && this.state.quiz != "Error" &&
                        <QuizTest currentContest={JSON.parse(this.state.quiz).quiz} showDefaultResult={false} canStartQuiz={this.state.canStartQuiz} hideResult={this.hideResult}></QuizTest>
                    }
                    {this.state.quiz == "Error" &&
                        window.errorcomponent.showMessage("Id del quiz inesistente.", "danger", this.returnToQuizPage)
                    }
                    {!this.state.quiz &&
                        <MyLoader></MyLoader>
                    }
                    {this.state.showResult && this.state.quiz &&
                        < h2 > Classifica</h2>
                    }
                    {this.state.showResult && this.state.result != null && this.state.result.map((item, i) => {
                        var value = item.quizUser.split("####");
                        this.isCompleted(item)
                        return (
                            <ListItem key={i} autoFocus={this.isCompleted(item)}>
                                <ListItemText primary={<Typography variant="h6" style={this.isCompleted(item)?{ color: '#ff6f00' }:{ color: '#000000' }}>{value[0]}</Typography>} secondary={item.quizResult} />
                            </ListItem>
                        );
                    })}
                </Grid>
            </Grid >);
    }
}