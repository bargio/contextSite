import React from 'react';
import { Button, FormGroup, Form, Accordion, Card, Navbar, Badge } from 'react-bootstrap';
import { Question } from './Question';
import { PrepareJsonForSave } from './PrepareJson';
import { PhotoPicker } from 'aws-amplify-react';
import { AlertModal } from '../../alert/AlertModal';
import MyLoader from '../../loading/Loader';
import "react-datepicker/dist/react-datepicker.css";
import it from 'date-fns/locale/it';
import { registerLocale, setDefaultLocale } from "react-datepicker";
import DatePicker from "react-datepicker";
import { TextField } from '@material-ui/core';
import UtilsResource from '../../utils/Utils';
import ProfileUser from '../../user/ProfileUser';
registerLocale('it', it)

export class CreatorForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            titleError: "",
            smallDescription: "",
            smallDescriptionError: "",
            description: "",
            descriptionError: "",
            expireDate: new Date(),
            image: null,
            questions: [],
            showAlert: false,
            showLoader: false
        }
    }

    addQuestion = () => {
        this.setState(state => {
            const list = state.questions.push(React.createRef());
            return {
                list
            };
        });
    };

    removeQuestion = (e) => {
        this.setState(state => {
            const list = state.questions;
            list.splice(e.index, 1);
            return {
                list
            };
        });
    }

    onSubmit = (e) => {
        if (this.checkField()) {
            this.setState({ showAlert: true })
        }
    }

    checkField = () => {
        var titleErr = "";
        var descErr = "";
        var smallDescErr = "";
        var itsOK = true;
        if (this.state.title == "") {
            titleErr = "Campo obbligatorio"
            itsOK = false;
        }
        if (this.state.description == "") {
            descErr = "Campo obbligatorio"
            itsOK = false;
        }
        if (this.state.smallDescription == "") {
            smallDescErr = "Campo obbligatorio"
            itsOK = false;
        }
        if (this.state.questions.length <= 0) {
            window.errorcomponent.showMessage("Non sono presenti domande...Aggiungine qualcuna!!", "warning")
            return false
        }
        if (this.checkQuestionFieldErrors()) {
            window.errorcomponent.showMessage("Non tutti i campi delle domande sono compilati!!", "warning")
            return false
        }
        if (!itsOK) {
            window.errorcomponent.showMessage("Compila tutti i campi per proseguire", "danger")
        }
        this.setState({ titleError: titleErr, descriptionError: descErr, smallDescriptionError: smallDescErr })
        return itsOK
    }

    checkQuestionFieldErrors = () => {
        var questionFieldsError = true;
        this.state.questions.map(question => {
            if (question.current.checkFields()) {
                questionFieldsError = false
            }
        })
        return questionFieldsError;
    }

    cancelAction = () => {
        console.log("Annullo Salvataggio")
        this.setState({ showAlert: false })
    }

    continueAction = () => {
        console.log("Salvo quiz")
        console.log(this.state)
        ProfileUser.getProfile(this.saveQuestion)

    }
    saveQuestion = (user) => {
        if (user.error != "Error") {
            console.log(user)
            if (user.name == undefined) {
                PrepareJsonForSave(this.state, user.username,this.reloadPage,user.group);
            } else {
                PrepareJsonForSave(this.state, user.name,this.reloadPage,user.group);
            }
            this.setState({ showAlert: false, showLoader: true })
            console.log(this)
        } else {
            window.errorcomponent.showMessage("Errore Utenza", "danger")
        }
    }


    reloadPage = ()=>{
        this.props.backButton()
    }

    render() {
        return (
            <Form onSubmit={this.onSubmit}>
                {this.state.showLoader &&
                    <MyLoader></MyLoader>
                }
                {!this.state.showLoader &&
                    <div>
                        <div style={{ maxWidth: "max-content", margin: "auto" }}>
                        <PhotoPicker preview headerText="Foto" headerHint='Aggiungi una foto cliccando sotto' title="Seleziona una foto" onPick={data => this.setState({ image: data })} ></PhotoPicker>
                        </div>
                        <Form.Group>
                            <TextField
                                fullWidth
                                required
                                multiline
                                onChange={(e) => { this.setState({ title: e.target.value }) }}
                                error={this.state.titleError != ""}
                                type="text"
                                id="outlined-error-helper-text"
                                label="Titolo del quiz"
                                helperText={this.state.titleError}
                                variant="outlined"
                            />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <TextField
                                fullWidth
                                required
                                multiline
                                onChange={(e) => { this.setState({ smallDescription: e.target.value }) }}
                                error={this.state.smallDescriptionError != ""}
                                type="text"
                                id="outlined-error-helper-text"
                                label="Descrizione breve"
                                helperText={this.state.smallDescriptionError}
                                variant="outlined"
                            />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <TextField
                                fullWidth
                                required
                                multiline={true}

                                onChange={(e) => { this.setState({ description: e.target.value }) }}
                                error={this.state.descriptionError != ""}
                                type="text"
                                id="outlined-error-helper-text"
                                label="Descrizione"
                                helperText={this.state.descriptionError}
                                variant="outlined"
                            />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label style={{ marginRight: '20px' }}>Data Scadenza  </Form.Label>
                            <DatePicker
                                selected={this.state.expireDate}
                                onChange={date => this.setState({ expireDate: date })}
                                locale="it"
                                showTimeSelect
                                timeFormat="p"
                                timeIntervals={15}
                                dateFormat="Pp"
                                placeholderText="Data scadenza validità"
                            />
                        </Form.Group>
                        <Accordion style={{margin:0}} >
                            {this.state.questions.map((question, index) => (
                                <Card key={index} style={{ marginBottom: '20px' }}>
                                    <Accordion.Toggle as={Card.Header} eventKey={index}>
                                        <Navbar bg="light" variant="light">
                                            <Navbar.Brand>
                                                <Badge variant="dark">Domanda {index + 1}</Badge>
                                            </Navbar.Brand>
                                            <Navbar.Collapse className="justify-content-end">
                                                <Badge pill variant="danger" onClick={() => this.removeQuestion({ index })}>Elimina</Badge>
                                            </Navbar.Collapse>
                                        </Navbar>
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey={index}>
                                        <Card.Body ><Question ref={question} questionIndex={index}></Question></Card.Body>
                                    </Accordion.Collapse>
                                   
                            </Card>)
                            )}
                        </Accordion>
                        <FormGroup>
                            <Button variant="info" onClick={this.addQuestion}>
                                Aggiungi Domanda
                        </Button>
                        </FormGroup>
                        <FormGroup>
                            <Button variant="primary" onClick={this.onSubmit} >
                                Salva Quiz
                        </Button>
                        </FormGroup>
                        <AlertModal show={this.state.showAlert} alert="Salvataggio...." title="Salvare il sequente questionario?" messaggio="Una volta salvato sarà possibile modificarlo dal menù modifica" cancel={this.cancelAction} continue={this.continueAction}></AlertModal>
                    </div>}
            </Form>

        );
    }
}