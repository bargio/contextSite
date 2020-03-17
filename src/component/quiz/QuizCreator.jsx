import React from 'react';
import { Grid, List, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import { PhotoPicker } from 'aws-amplify-react';
import { Button, Jumbotron, Modal } from 'react-bootstrap';
import { CreatorForm } from './creator/CreatorForm';
import ProfileUser from '../user/ProfileUser';
import UtilsResource from '../utils/Utils';
import DeleteIcon from '@material-ui/icons/Delete';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import StorageResource from '../resource/Storage';
import { QuizResources } from '../resource/Api';
import MyLoader from '../loading/Loader';

export class QuizCreator extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            load:true,
            create: false,
            update: false,
            isLogged: false,
            quizUncompleted: null,
            indexUncompletedQuiz: null,
        };
        this.onClickCreate = this.onClickCreate.bind(this);
        this.onClickUpdate = this.onClickUpdate.bind(this);
        this.onClickRestore = this.onClickRestore.bind(this);
    }

    componentDidMount() {
        ProfileUser.getProfile(this.isLoggedIn)
    }

    onClickCreate() {
        if (this.message()) {
            this.setState({ create: true });
        }
    }

    onClickUpdate() {
        if (this.message()) {
            this.setState({ update: true });
        }
    }

    onClickRestore() {
        this.setState({ update: false, create: false, indexUncompletedQuiz:null });
    }


    

    isLoggedIn = (user) => {
        if (user.isValid()) {
            UtilsResource.getQuizUncompleted().then(result => {
                this.setState({ quizUncompleted: result.data.getUncompletedByUserId.items, isLogged: true,load:false})
            })
        } else {
            this.setState({ isLogged: false,load:false })
        }
    }

    message = () => {
        if (this.state.isLogged) {
            return true
        }
        window.errorcomponent.showMessage("Per poter creare o modificare i quiz devi loggarti. Clicca qui per eseguire la login", "warning", "login")
        return false
    }
    continueQuizHandler = (index) => {
        console.log("Continue modify quiz with index ", index)
        console.log(this.state.quizUncompleted[index])
        this.setState({indexUncompletedQuiz:index})
    }
    deleteQuizUncompleteHandler = (id,index) => {
        console.log("Deleting  quiz with id ", id)
        QuizResources.deleteUserQuizUncompleted(id).then(result =>{
            this.setState(state => {
                const list = state.quizUncompleted;
                list.splice(index, 1);
                return {
                    list
                };
            });
        })
    }

    
    render() {
        const goBack = (
            <Button variant="secondary" onClick={this.onClickRestore} block>
                Indietro
            </Button>
        );
        return (
            <Jumbotron style={{ backgroundColor: 'aliceblue', alignItems: 'center', margin: '10px' }}>
                {this.state.load &&
                    <Modal show={true}><Modal.Body><MyLoader></MyLoader></Modal.Body></Modal>
                }
                {!this.state.create &&
                    !this.state.update &&
                    <Grid container
                        direction="column"
                        alignItems="center" >
                        <Button variant="primary" onClick={this.onClickCreate} block>
                            Crea
                        </Button>
                        <br />
                        <Button variant="secondary" onClick={this.onClickUpdate} block>
                            Incompleti
                        </Button>
                    </Grid>
                }
                {this.state.create &&
                    <div>
                        {goBack}
                        <br />
                        <CreatorForm style={{ margin: '20px' }} backButton={this.onClickRestore}></CreatorForm>
                    </div>

                }
                {this.state.update &&
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center">
                        {goBack}
                        <br />
                        {this.state.indexUncompletedQuiz == null &&
                            <Grid container alignItems="center" direction="column" justify="center" style={{ padding: '1%' }}>
                                <List style={{ minWidth: '100%' }}>
                                    {this.state.quizUncompleted.map((qResult, index) => {
                                        var quizData = JSON.parse(qResult.quizData);
                                        console.log(quizData)
                                        return (<ListItem key={index}>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    Q
                                                    </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={quizData.title}
                                                secondary={quizData.smallDescription}
                                            />
                                            <ListItemSecondaryAction >
                                                <IconButton edge="end" aria-label="continue" onClick={() => this.continueQuizHandler(index)}>
                                                    <BorderColorIcon />
                                                </IconButton>
                                                <IconButton edge="end" aria-label="delete" onClick={() => this.deleteQuizUncompleteHandler(qResult.id,index)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>)
                                    })}
                                </List>
                            </Grid>
                        }
                        {this.state.indexUncompletedQuiz!=null &&
                            <CreatorForm 
                            style={{ margin: '20px' }} 
                            uncompleted={true}
                            quizData={JSON.parse(this.state.quizUncompleted[this.state.indexUncompletedQuiz].quizData)} 
                            questionData={JSON.parse(this.state.quizUncompleted[this.state.indexUncompletedQuiz].quizQuestionData)} 
                            backButton={this.onClickRestore}></CreatorForm>
                        }
                    </Grid>
                }
            </Jumbotron>


        );
    }
}