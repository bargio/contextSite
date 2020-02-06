import React from 'react';
import { Button, ProgressBar, Badge, Tabs, Tab, ListGroup } from 'react-bootstrap';
import { Auth } from 'aws-amplify';
import QuizResources from '../resource/Api';
import { QuizList } from '../quiz/QuizList';
import { ResultQuizList } from './ResultQuizList';
import { Grid, Divider, List, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import AuthenticationManager from '../auth/AuthenticationManager';
import MyLoader from '../loading/Loader';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

export class ProfilePage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            username: null,
            email: null,
            isLogged: false,
            onLoading: true,
            totalPoints: 0,
            quizResult: null,
            quizCompleted: null,
            myQuiz: true,
            results: false,
        }
    }

    handleLogout = () => {
        console.log("Logout")
        Auth.signOut()
            .then(data => console.log(data))
            .catch(err => console.log(err));
        window.location.href = ('/')
    }

    componentDidMount() {
        AuthenticationManager.isLoggedIn(this.isLoggedIn)
        QuizResources.getQuizIds()
    }

    isLoggedIn = (result) => {
        var username = null;
        var email = null;
        try {
            //for cognito
            if (result && result != "Error" && result.username) {
                username = result.username;
                email = result.attributes.email;
                this.setState({ username: username, email: email, isLogged: true, onLoading: false })
                this.getUserQuizResult(username, email)
                //for google or facebook
            } else if (result && result != "Error" && result.name) {
                username = result.name;
                email = result.email
                this.setState({ username: username, email: email, isLogged: true, onLoading: false })
                this.getUserQuizResult(username, email)
            } else if (result == "Error") {
                this.setState({ isLogged: false, onLoading: false })
                window.errorcomponent.showMessage("Per poter creare o modificare i quiz devi loggarti. Clicca qui per eseguire la login", "warning", "login")
            }
        } catch (error) {
            console.log("Error")
            console.log(error)
        }
    }

    getUserQuizResult = (username, email) => {
        var userData = username + "####" + email
        var listId = []
        QuizResources.getUserQuizResult(userData).then(data => {

            var point = 0
            var quizResult = data.data.quizResultByUser.items;
            quizResult.map(result => {
                point = point + result.quizResult
                listId.push({ id: { eq: result.quizId } })
            })
            QuizResources.getQuizIds(listId).then(data => {
                console.log(data)
                var quizCompleted = data.data.listQuizs.items
                this.setState({ quizResult: quizResult, totalPoints: point, quizCompleted: quizCompleted });
            })

        })
    }

    createErrorMessage = () => {
        window.errorcomponent.showMessage("Errore Generico", "danger")
    }

    createStars = (numberOfStars) => {
        var stars = []
        var i = 1
        while (i <= 10) {
            if (i <= numberOfStars) {
                stars.push(<StarIcon style={{ color: 'orange' }} />)
            } else {
                stars.push(<StarBorderIcon />)
            }
            i++;
        }
        return stars;
    }

    switchTabs = (tab) => {
        switch (tab) {
            case "myQuiz":
                this.setState({ myQuiz: true, results: false })
                break;
            case "results":
                this.setState({ myQuiz: false, results: true })
                break;
        }
    }

    render() {
        var numberOfStars = this.state.totalPoints / 100;
        console.log(this.state)
        var numberOfPoints = this.state.totalPoints % 100;
        if (numberOfStars >= 10) {
            numberOfPoints = 100;
        }
        var stars = this.createStars(numberOfStars)
        return (
            <>{this.state.onLoading &&
                <MyLoader></MyLoader>
            }
                {!this.state.onLoading && this.state.isLogged &&
                    < Grid container >
                        <Grid container alignItems="center" justify="center" zeroMinWidth>
                            <Grid item style={{ minWidth: '50%' }}>
                                <Grid container alignItems="center" direction="column" justify="center" style={{ padding: '1%' }}>
                                    <h1>Profilo</h1>
                                    <Badge variant="danger" pill onClick={this.handleLogout}>Logout</Badge>
                                </Grid>
                                <Grid container alignItems="center" direction="row" justify="center" style={{ padding: '1%' }}>
                                    {stars}
                                </Grid>
                                <ProgressBar show={true} animated style={{ minWidth: '100%' }} now={numberOfPoints} label={numberOfPoints == 100 ? 'MAX' : numberOfPoints + "/100"}></ProgressBar>
                            </Grid>
                        </Grid>
                        <Grid container alignItems="center" direction="column" justify="center" style={{ padding: '1%' }}>
                            <Tabs defaultActiveKey="myQuiz" id="uncontrolled-tab-example" onSelect={(d) => { this.switchTabs(d) }}>
                                <Tab eventKey="myQuiz" title="I miei quiz" >
                                </Tab>
                                <Tab eventKey="results" title="Risultati">

                                </Tab>
                                <Tab eventKey="others" title="In arrivo..." disabled>
                                </Tab>
                            </Tabs>
                        </Grid>
                        {this.state.username && this.state.myQuiz &&
                            <ResultQuizList username={this.state.username} />
                        }
                        {this.state.results && this.state.quizResult &&
                            <Grid container alignItems="center" direction="column" justify="center" style={{ padding: '1%' }}>
                                <h1>Punti totali</h1>
                                <h2>{this.state.totalPoints}</h2>
                                <List style={{ minWidth: '30%' }}>
                                    {this.state.quizResult.map(qResult => {
                                        var qCompleted = this.state.quizCompleted.filter(qComple => {
                                            console.log(qComple.id, qResult.quizId, qComple.id == qResult.quizId)
                                            return qComple.id == qResult.quizId
                                        })
                                        console.log(qCompleted)
                                        if (qCompleted.length > 0) {
                                            return (<ListItem >
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        Q
                                                </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={qCompleted[0].creator}
                                                    secondary={qResult.quizResult}
                                                />
                                                <ListItemSecondaryAction>
                                                    <IconButton edge="end" aria-label="delete">
                                                        <ArrowForwardIosIcon></ArrowForwardIosIcon>
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                        </ListItem>)
                                        
                                    }
                                        //<ListGroup.Item>{qCompleted[0].creator} <Divider orientation="vertical"></Divider>{qResult.quizResult}</ListGroup.Item>
                                })}
                                    </List>

                            </Grid>

                        }

                        {/*<Grid container justify="center" spacing={3} >
                            <Grid item xs={12} sm={10} md={6} large={4} xl={2} zeroMinWidth>

                            </Grid>
                            <Grid item xs={12} sm={10} md={6} large={4} xl={2} zeroMinWidth>
                                <Button onClick={this.createErrorMessage}>createErrorMessage</Button>
                            </Grid>

                            <Grid item xs={12} sm={10} md={6} large={4} xl={2} zeroMinWidth>
                                <Button onClick={() => window.progressbar.updateProgress(10)}>GetAdminList</Button>
                            </Grid>
                        </Grid>
                

                        <Grid container justify="center" spacing={3} >

                            <Grid item xs={12} sm={10} md={6} large={4} xl={2} zeroMinWidth>
                                <ResultQuizList></ResultQuizList>
                            </Grid>

                        </Grid>
                */}


                    </Grid>
                }
            </>
        );
    }
}