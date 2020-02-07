import React from 'react';
import { Button, ProgressBar, Badge, Tabs, Tab, ListGroup } from 'react-bootstrap';
import { Auth } from 'aws-amplify';
import QuizResources from '../resource/Api';
import { QuizList } from '../quiz/QuizList';
import { ResultQuizList } from './ResultQuizList';
import { Grid, Divider, List, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, IconButton, BottomNavigation, BottomNavigationAction } from '@material-ui/core';
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
            globalPoints: 0,
            privatePoints: 0,
            quizResult: null,
            quizCompleted: null,
            myQuizFlag: true,
            globalResultsFlag: false,
            privateResultsFlag: false,
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
        var userDataForFilterQuery = username + "####" + email
        var listIdForFilterQuery = []
        //Get user Quiz Results
        QuizResources.getUserQuizResult(userDataForFilterQuery).then(result => {
            var quizResultItems = result.data.quizResultByUser.items;
            quizResultItems.map(quizElement => {
                listIdForFilterQuery.push({ id: { eq: quizElement.quizId } })
            })
            //Get, using id quiz, details of quiz
            QuizResources.getQuizIds(listIdForFilterQuery).then(result => {
                console.log("getQuizIds",result)
                var quizDetailsItems = result.data.listQuizs.items
                this.calculatePoint(quizResultItems, quizDetailsItems)

            })

        })
    }

    calculatePoint = (quizResultItems, quizDetailsItems) => {
        var globalPoints = 0
        var privatePoints = 0;
        console.log("quizResultItems",quizResultItems)
        console.log("quizDetailsItems",quizDetailsItems)
        quizResultItems.map(qResult => {
            var qCompleted = quizDetailsItems.filter(qComple => {
                return qComple.id == qResult.quizId
            })
            if (qCompleted.length > 0) {
                if (qCompleted[0].groupCreator == "[administrator]") {
                    globalPoints += qResult.quizResult
                } else {
                    privatePoints += qResult.quizResult
                }
            }
        })
        this.setState({ quizResult: quizResultItems, globalPoints: globalPoints, privatePoints: privatePoints, quizCompleted: quizDetailsItems });
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
                this.setState({ myQuizFlag: true, globalResultsFlag: false,privateResultsFlag: false })
                break;
            case "globalResults":
                this.setState({ myQuizFlag: false, globalResultsFlag: true,privateResultsFlag: false })
                break;
            case "privateResults":
                this.setState({ myQuizFlag: false, globalResultsFlag: false ,privateResultsFlag: true})
                break;
        }
    }

    render() {
        var numberOfStars = this.state.globalPoints / 100;
        console.log(this.state)
        var numberOfPoints = this.state.globalPoints % 100;
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
                        <BottomNavigation
>
  <BottomNavigationAction label="Recents" />
  <BottomNavigationAction label="Favorites" />
  <BottomNavigationAction label="Nearby"  />
</BottomNavigation>
                            <Tabs defaultActiveKey="myQuiz" id="uncontrolled-tab-example" onSelect={(d) => { this.switchTabs(d) }}>
                                <Tab eventKey="myQuiz" title="I miei quiz" />
                                <Tab eventKey="globalResults" title="Classifica globale"/>
                                <Tab eventKey="privateResults" title="Classifica privata"/>
                                <Tab eventKey="..." title="In arrivo..." disabled/>
                            </Tabs>
                        </Grid>
                        {this.state.username && this.state.myQuizFlag &&
                            <ResultQuizList username={this.state.username} />
                        }
                        {this.state.globalResultsFlag && this.state.quizResult &&
                            <Grid container alignItems="center" direction="column" justify="center" style={{ padding: '1%' }}>
                                <h1>Punti globali</h1>
                                <h2>{this.state.globalPoints}</h2>
                                <List style={{ minWidth: '30%' }}>
                                    {this.state.quizResult.map(qResult => {
                                        var qCompleted = this.state.quizCompleted.filter(qComple => {
                                            console.log(qComple.id, qResult.quizId, qComple.id == qResult.quizId)
                                            return qComple.id == qResult.quizId
                                        })
                                        console.log(qCompleted)
                                        if (qCompleted.length > 0 && qCompleted[0].groupCreator=="[administrators]") {
                                            return (<ListItem >
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        Q
                                                </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={qCompleted[0].name}
                                                    secondary={qResult.quizResult}
                                                />
                                                <ListItemSecondaryAction>
                                                    <IconButton edge="end" aria-label="delete" href={"quiz/"+qCompleted[0].id}>
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
                         {this.state.privateResultsFlag && this.state.quizResult &&
                            <Grid container alignItems="center" direction="column" justify="center" style={{ padding: '1%' }}>
                                <h1>Punti privati</h1>
                                <h2>{this.state.privatePoints}</h2>
                                <List style={{ minWidth: '30%' }}>
                                    {this.state.quizResult.map(qResult => {
                                        var qCompleted = this.state.quizCompleted.filter(qComple => {
                                            console.log(qComple.id, qResult.quizId, qComple.id == qResult.quizId)
                                            return qComple.id == qResult.quizId
                                        })
                                        console.log(qCompleted)
                                        if (qCompleted.length > 0 && qCompleted[0].creator!="admin") {
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
                                                    <IconButton edge="end" aria-label="delete" href={"quiz/"+qCompleted[0].id}>
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