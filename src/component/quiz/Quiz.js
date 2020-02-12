import React from 'react';
import Quiz from 'react-quiz-component';
import { quizOld } from './QuizQuestion';
import CountDownQuestion from './CountDownQuestion';
import { Grid, ListItem, ListItemText, Typography, ListItemAvatar, Avatar, ListItemSecondaryAction } from '@material-ui/core';
import QuizIdElement from '../quiz-test/QuizIdElement';
import { Redirect } from 'react-router-dom'
import QuizResources from '../resource/Api';
import MyLoader from '../loading/Loader';
import { Button } from 'react-bootstrap';
import ProfileUser from '../user/ProfileUser';


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
        QuizResources.getQuizQuestionFromQuestionID(quizId).then(data => {this.setState({ quiz: data }) })
        ProfileUser.getProfile(this.getQuizRes)
    }
    getQuizRes = (user) => {
        if (user.error != "Error") {
            QuizResources.getUserQuizResultWithQuizID(window.location.pathname.split("/")[2]).then(data => {
                data.data.listQuizResults.items.sort((a, b) => b.quizResult - a.quizResult); //
                this.setState({ result: data.data.listQuizResults.items });
                this.checkIfFoundResult(user);
            })
        }
    }
    getQuizResOLD = (data) => {
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

    checkIfFoundResult = (user) => {
        this.state.result.map(item => {
            var value = item.quizUser.split("####");
            if (value[0] == user.username && value[1] ==user.email) {
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
                        <QuizIdElement currentContest={JSON.parse(this.state.quiz).quiz} showDefaultResult={false} canStartQuiz={this.state.canStartQuiz} hideResult={this.hideResult}></QuizIdElement>
                    }
                    {this.state.quiz == "Error" &&
                        window.errorcomponent.showMessage("Id del quiz inesistente.", "danger", this.returnToQuizPage)
                    }
                    {!this.state.quiz &&
                        <MyLoader></MyLoader>
                    }
                    {this.state.showResult && this.state.quiz &&
                        <h2> Classifica</h2>
                    }
                    {this.state.showResult && this.state.result != null && this.state.result.map((item, i) => {
                        var value = item.quizUser.split("####");
                        this.isCompleted(item)
                        return (
                            <ListItem key={i} autoFocus={this.isCompleted(item)}>
                                <ListItemAvatar>
                                    <Avatar>
                                        Q
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText 
                                primary={<Typography variant="h6" style={this.isCompleted(item) ? { color: '#ff6f00' } : { color: '#000000' }}>{value[0]}</Typography>} 
                               />
                                
                                    <ListItemText
                                        primary={item.quizResult}
                                    />
                                
                            </ListItem>
                        );
                    })}
                </Grid>
            </Grid >);
    }
}