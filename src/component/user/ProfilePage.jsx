import React from 'react';
import { Button, ProgressBar, Badge, Tabs, Tab, ListGroup } from 'react-bootstrap';
import { Auth } from 'aws-amplify';
import { QuizResources } from '../resource/Api';
import { ResultQuizList } from './ResultQuizList';
import { Grid, List, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, IconButton, BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import MyLoader from '../loading/Loader';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import ProfileUser from './ProfileUser';



export class ProfilePage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            username: null,
            email: null,
            userId: null,
            isLogged: false,
            onLoading: true,
            globalPoints: 0,
            privatePoints: 0,
            quizResult: null,
            quizCompleted: null,
            myQuizFlag: true,
            globalResultsFlag: false,
            privateResultsFlag: false,
            bottomNavigationBarValue: "myQuiz"
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
        ProfileUser.getProfile(this.isLoggedIn)
    }

    isLoggedIn = (user) => {
        if (user.error != 'Error') {
            this.setState({ username: user.username, email: user.email, userId: user.id, isLogged: true, onLoading: false })
            this.getUserQuizResult(user.id)
        } else {
            this.setState({ isLogged: false, onLoading: false })
            window.errorcomponent.showMessage("Per poter creare o modificare i quiz devi loggarti. Clicca qui per eseguire la login", "warning", "login")
        }
    }


    getUserQuizResult = (userId) => {
        var listIdForFilterQuery = []
        //Get user Quiz Results
        QuizResources.getUserQuizResult(userId).then(result => {
            var quizResultItems = result.data.quizResultByUser.items;
            quizResultItems.map(quizElement => {
                listIdForFilterQuery.push({ id: { eq: quizElement.quizId } })
            })
            //Get, using id quiz, details of quiz
            if (listIdForFilterQuery.length > 0) {
                QuizResources.getQuizIds(listIdForFilterQuery).then(result => {
                    console.log("getQuizIds", result)
                    var quizDetailsItems = result.data.listQuizs.items
                    this.calculatePoint(quizResultItems, quizDetailsItems)

                })
            }

        })
    }

    calculatePoint = (quizResultItems, quizDetailsItems) => {
        var globalPoints = 0
        var privatePoints = 0;
        console.log("quizResultItems", quizResultItems)
        console.log("quizDetailsItems", quizDetailsItems)
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

    createStars = (numberOfStars) => {
        var stars = []
        var i = 1
        while (i <= 10) {
            if (i <= numberOfStars) {
                stars.push(<StarIcon style={{ color: 'orange' }} />)
            } else {
                stars.push(<StarBorderIcon key={i}/>)
            }
            i++;
        }
        return stars;
    }

    bottomNavigationBarHandleChange = (event, value) => {
        switch (value) {
            case "myQuiz":
                this.setState({ bottomNavigationBarValue: value, myQuizFlag: true, globalResultsFlag: false, privateResultsFlag: false })
                break;
            case "globalResults":
                this.setState({ bottomNavigationBarValue: value, myQuizFlag: false, globalResultsFlag: true, privateResultsFlag: false })
                break;
            case "privateResults":
                this.setState({ bottomNavigationBarValue: value, myQuizFlag: false, globalResultsFlag: false, privateResultsFlag: true })
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
                        <Grid container alignItems="center" justify="center">
                            <Grid item style={{ minWidth: '50%' }}>
                                <Grid container alignItems="center" direction="column" justify="center" style={{ padding: '1%' }}>
                                    <h6>Benvenuto</h6>
                                    <h1>{this.state.username}</h1>
                                </Grid>
                                <Grid container alignItems="center" direction="row" justify="center" style={{ padding: '1%' }}>
                                    {stars}
                                </Grid>
                                <ProgressBar animated style={{ minWidth: '100%' }} now={numberOfPoints} label={numberOfPoints == 100 ? 'MAX' : numberOfPoints + "/100"}></ProgressBar>
                            </Grid>
                        </Grid>
                        <Grid container alignItems="center" direction="column" justify="center" style={{ padding: '1%' }}>
                            <BottomNavigation value={this.state.bottomNavigationBarValue} onChange={this.bottomNavigationBarHandleChange}>
                                <BottomNavigationAction label="Quiz" value="myQuiz" icon={<PlaylistAddIcon />} />
                                <BottomNavigationAction label="Globale" value="globalResults" icon={<EmojiEventsIcon />} />
                                <BottomNavigationAction label="Privata" value="privateResults" icon={<PlaylistAddCheckIcon />} />
                                {/*<BottomNavigationAction label="In arrivo..." value="..." icon={<FolderIcon />} disable />*/}
                            </BottomNavigation>
                        </Grid>
                        {this.state.username && this.state.myQuizFlag &&
                            <ResultQuizList username={this.state.userId} />
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
                                        if (qCompleted.length > 0 && qCompleted[0].groupCreator == "[administrators]") {
                                            return (<ListItem id={qCompleted.id}>
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
                                                    <IconButton edge="end" aria-label="delete" href={"quiz/" + qCompleted[0].id}>
                                                        <ArrowForwardIosIcon></ArrowForwardIosIcon>
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            </ListItem>)

                                        }

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
                                        if (qCompleted.length > 0 && qCompleted[0].creator != "admin") {
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
                                                    <IconButton edge="end" aria-label="delete" href={"quiz/" + qCompleted[0].id}>
                                                        <ArrowForwardIosIcon></ArrowForwardIosIcon>
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            </ListItem>)

                                        }

                                    })}
                                </List>

                            </Grid>

                        }

                    </Grid>
                }
            </>
        );
    }
}