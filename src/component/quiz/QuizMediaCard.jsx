import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Redirect } from 'react-router-dom';
import { Link, CardHeader, Avatar, IconButton } from '@material-ui/core';
import { S3Image, PhotoPicker, Authenticator } from 'aws-amplify-react';
import QuizResources from '../resource/Api';
import { AlertModal } from '../alert/AlertModal';

import ShareIcon from '@material-ui/icons/Share';
import DeleteIcon from '@material-ui/icons/Delete';
import StorageResource from '../resource/Storage';
import { Overlay, Popover, OverlayTrigger } from 'react-bootstrap';
import { ShareButtons } from '../share/ShareButtons';


export class QuizMediaCard extends React.Component {



    constructor(props) {
        super(props)
        this.state = {
            showAlert: false,
            quiz: null,
            quizImg: "nothing"
        }
    };

    deleteCurrentQuiz = (quiz) => {
        console.log("SONO QUA")
        this.setState({ showAlert: true, quiz: quiz })
        //
    }

    cancelActionDeleting = () => {
        console.log("Annullo cancellazione")
        this.setState({ showAlert: false })
    }

    continueActionDeleting = () => {
        console.log("Cancello quiz")
        QuizResources.deleteQuiz(this.state.quiz, this.reloadPage)
        this.setState({ showAlert: false })
    }

    reloadPage = () => {
        window.location.reload(false);
    }

    componentDidMount = () => {
        this.setState({ quiz: this.props.quiz })
        var quizResultExist = this.props.result != undefined ? true : false
        console.log(quizResultExist)
        StorageResource.getImage(this.props.quiz.image_url).then(data => this.setState({ quizImg: data }))
    }

    render() {
        const quiz = this.props.quiz;
        let quizUrl = 'quiz/' + quiz.id;
        var shareUrl = window.location.origin + "/quiz/" + quiz.id
        console.log(this.props)
        var avatarCustom = this.props.result ? (<Avatar aria-label="recipe" style={{ backgroundColor: '#28a745' }}>✔</Avatar>) : (<Avatar aria-label="recipe">?</Avatar>)
        const b = <ShareButtons url={shareUrl}></ShareButtons>
        return (
            <Card style={{ maxWidth: '345' }}>
                <CardActionArea onClick={() => window.location.href = quizUrl}>
                    <CardHeader
                        avatar={
                            avatarCustom
                        }
                        title={quiz.name}
                        subheader={quiz.creator}
                    />
                    <CardMedia
                        style={{
                            height: 0,
                            paddingTop: '56.25%'
                        }}
                        image={this.state.quizImg}
                        title="Quiz Image"
                    />
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {quiz.smallDescription}
                        </Typography>
                    </CardContent>
                </CardActionArea>

                <CardActions disableSpacing>
                    <IconButton aria-label="share" onClick={() => window.errorcomponent.showMessage(b)}>
                        <ShareIcon />
                    </IconButton>
                    {this.props.user == quiz.creator &&
                        <IconButton onClick={() => this.deleteCurrentQuiz(quiz)}>
                            <DeleteIcon />
                        </IconButton>
                    }
                </CardActions>

                <AlertModal show={this.state.showAlert} variant="danger" title="Eliminare il seguente Quiz?" messaggio="Una volta eliminato non potrà essere recuperato" cancel={this.cancelActionDeleting} continue={this.continueActionDeleting} quiz={quiz}></AlertModal>
            </Card >);

    }
}
