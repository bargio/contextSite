import React from 'react';
import { Grid } from '@material-ui/core';
import { QuizMediaCard } from './QuizMediaCard';
import QuizResources from '../resource/Api';
import MyLoader from '../loading/Loader';
import AuthenticationManager from '../auth/AuthenticationManager';



export class QuizList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showLoader: true,
            quizList: null,
            loadingTime: 30000,
            quizResult: null,
            username: null,
            addQuiz: {
                id: "creator",
                name: "Aggiungi quiz",
                smallDescription: "Permette di aggiungere questionari",
                image_url: "9edf2082-7f7b-44e0-9399-14ea2e7f0e46.png",
                active: false,
                quizQuestionsID: "fc10675b-e768-43a8-9a07-d2d34cdbea69"
            }
        }
    }

    componentDidMount() {
        AuthenticationManager.isLoggedIn(this.getQuizRes)
        //QuizResources.getAllQuizs()
        /*QuizResources.getUserQuizAndAdministrator()
            .then(result => { console.log(result); this.setState({ quizList: result.data.listQuizs.items }); })
*/
        //QuizResources.getUsertQuizResult(userState).then(data=>console.log(data))
    }

    getQuizRes = (data) => {
        console.log(data)
        if (data != "Error") {
            window.profilecomponent.isLoggedIn(data)
            var userState = window.profilecomponent.getUserDetails()
            if (userState != null) {
                var userData = userState.userLogged.username + "####" + userState.userLogged.email
                this.setState({ username: userState.userLogged.username })
                QuizResources.getUserQuizResult(userData).then(data => {
                    this.setState({ quizResult: data.data.listQuizResults.items, showLoader: false });
                })
                QuizResources.getAdministratorQuizs()
                    .then(result => { console.log(result); this.setState({ quizList: result.data.listQuizs.items }); })
            }
        } else {
            this.setState({ showLoader: false })
            QuizResources.getAdministratorQuizs()
                .then(result => { console.log(result); this.setState({ quizList: result.data.listQuizs.items }); })
        }
    }

    checkIfFoundResult = (id) => {
        try {
            if (this.state.quizResult != null) {
                var found = this.state.quizResult.find(function (item, i) {
                    if (item.quizId == id) {
                        return true;
                    }
                    return false
                });
                return found;
            }
        } catch (error) {
            console.log(error)
            return false
        }
    }

    render() {
        return (<Grid
            container
            justify="space-around"
            style={{ minHeight: '100px' }}
        >
            {this.state.showLoader &&
                <Grid item xs={10} sm={10} md={5} large={4} xl={2} >
                    <MyLoader></MyLoader>
                </Grid>
            }
            {this.state.quizList && !this.state.showLoader &&
                <Grid container justify="center" spacing={3} style={{ paddingTop: '5%', gridAutoRow: '1fr' }}>
                    {/*<Grid item xs={10} sm={10} md={5} large={4} xl={2} >
                        <QuizMediaCard quiz={this.state.addQuiz} user={this.state.username}></QuizMediaCard>
                    </Grid>*/}
                    {this.state.quizList.map(quiz => {
                        console.log(quiz)
                        return (
                            <Grid key={quiz.id} item xs={10} sm={10} md={5} large={4} xl={2} zeroMinWidth >
                                <QuizMediaCard quiz={quiz} user={this.state.username} result={this.checkIfFoundResult(quiz.id)}></QuizMediaCard>
                            </Grid>
                        );
                    })}
                </Grid>
            }
        </Grid >);
    }
}