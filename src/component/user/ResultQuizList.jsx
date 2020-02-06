import React from 'react'
import QuizResources from '../resource/Api';
import { Grid } from '@material-ui/core';
import MyLoader from '../loading/Loader';
import { QuizMediaCard } from '../quiz/QuizMediaCard';
import { Nav } from 'react-bootstrap';


export class ResultQuizList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            quizList: null,
            showLoader: true,
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
        QuizResources.getUsersQuiz(this.props.username)
            .then(result => {this.setState({ quizList: result.data.quizByCreator.items, showLoader: false }); })
    }


    render() {
        return (<Grid
            container
            justify="space-around"
            style={{ minHeight: '100px' }}
        >
            {this.state.showLoader &&
                <Grid item xs={10} sm={10} md={5} large={4} xl={2} >
                    <MyLoader />
                </Grid>
            }
            {this.state.quizList && !this.state.showLoader &&
                <Grid container justify="center" spacing={3} style={{ paddingTop: '5%', gridAutoRow: '1fr' }}>
                    <Grid item xs={10} sm={10} md={5} large={4} xl={2} >
                        <QuizMediaCard quiz={this.state.addQuiz} user={this.props.username}></QuizMediaCard>
                    </Grid>
                    {this.state.quizList.map(quiz => {
                        console.log(quiz)
                        return (
                            <Grid key={quiz.id} item xs={10} sm={10} md={5} large={4} xl={2} zeroMinWidth >
                                <QuizMediaCard quiz={quiz} user={this.props.username}></QuizMediaCard>
                            </Grid>
                        );
                    })}
                </Grid>
            }
        </Grid >);
    }
}