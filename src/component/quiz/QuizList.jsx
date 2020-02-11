import React from 'react';
import { Grid, CardMedia, CardContent, CardActionArea, Typography, CardActions } from '@material-ui/core';
import { QuizMediaCard } from './QuizMediaCard';
import QuizResources from '../resource/Api';
import MyLoader from '../loading/Loader';
import AuthenticationManager from '../auth/AuthenticationManager';
import { Card, Button, Carousel } from 'react-bootstrap';



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
                    this.setState({ quizResult: data.data.quizResultByUser.items, showLoader: false });
                })
                QuizResources.getQuizByGroupCreator()
                    .then(result => { console.log(result); this.setState({ quizList: result.data.quizByGroupCreator.items }); })
            }
        } else {
            this.setState({ showLoader: false })
            QuizResources.getQuizByGroupCreator()
                .then(result => { console.log(result); this.setState({ quizList: result.data.quizByGroupCreator.items }); })
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
        return (

            <Grid
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
                    <>
                        <Grid item  >
                            
                                    <Card style={{ maxWidth: '100%', maxHeight: '100%' }}>

                                        <CardActionArea>
                                            <CardMedia
                                                component="img"
                                                alt="Contemplative Reptile"
                                                height="300px"
                                                image="https://webstockreview.net/images/knowledge-clipart-quiz-time-9.png"
                                                title="Contemplative Reptile"
                                            />
                                            <CardContent>
                                                {/*<Typography gutterBottom variant="h5" component="h2">
                                            Lizard
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                            across all continents except Antarctica
                </Typography>*/}
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                               
                        </Grid>
                        <Grid container justify="center" spacing={3} style={{ paddingTop: '5%', gridAutoRow: '1fr' }}>
                            {/*<Grid item xs={10} sm={10} md={5} large={4} xl={2} >
                        <QuizMediaCard quiz={this.state.addQuiz} user={this.state.username}></QuizMediaCard>
                    </Grid>*/}
                            {this.state.quizList.map(quiz => {
                                console.log(quiz)
                                return (
                                    <Grid key={quiz.id} item xs={10} sm={5} md={5} large={4} xl={2} zeroMinWidth >
                                        <QuizMediaCard quiz={quiz} user={this.state.username} result={this.checkIfFoundResult(quiz.id)}></QuizMediaCard>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </>
                }
            </Grid >
        );
    }
}