import React from 'react';
import { Grid } from '@material-ui/core';
import { PhotoPicker } from 'aws-amplify-react';
import { Button, Jumbotron } from 'react-bootstrap';
import { CreatorForm } from './creator/CreatorForm';
import AuthenticationManager from '../auth/AuthenticationManager';

export class QuizCreator extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            create: false,
            update: false,
            isLogged: false
        };
        this.onClickCreate = this.onClickCreate.bind(this);
        this.onClickUpdate = this.onClickUpdate.bind(this);
        this.onClickRestore = this.onClickRestore.bind(this);
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
        this.setState({ update: false, create: false });
    }

    checkIfLogged = (user) => {
        if (user != "Error") {
            this.setState({ isLogged: true })
        } else {
            this.setState({ isLogged: false })
        }
    }

    componentDidMount() {
        AuthenticationManager.isLoggedIn(this.checkIfLogged)
    }

    message = () => {
        if (this.state.isLogged) {
            return true
        }
        window.errorcomponent.showMessage("Per poter creare o modificare i quiz devi loggarti. Clicca qui per eseguire la login", "warning","login")
        return false
    }

    render() {
        const goBack = (
            <Button variant="secondary" onClick={this.onClickRestore} block>
                Indietro
            </Button>
        );
        return (
            <Jumbotron style={{ backgroundColor: 'aliceblue', alignItems: 'center', margin: '20px' }}>
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
                            Modifica
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
                    </Grid>
                }
            </Jumbotron>


        );
    }
}