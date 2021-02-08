import React from 'react';
import { Button, FormGroup, Form, Accordion, Card, Navbar, Badge, Image } from 'react-bootstrap';
import { Question } from './Question';
import { PrepareJsonForSave } from './PrepareJson';
import { PhotoPicker, S3Image, Picker } from 'aws-amplify-react';
import { AlertModal } from '../../alert/AlertModal';
import MyLoader from '../../loading/Loader';
import "react-datepicker/dist/react-datepicker.css";
import it from 'date-fns/locale/it';
import { registerLocale, setDefaultLocale } from "react-datepicker";
import DatePicker from "react-datepicker";
import { TextField } from '@material-ui/core';
import UtilsResource, { saveQuizUncompleted } from '../../utils/Utils';
import ProfileUser from '../../user/ProfileUser';
import StorageResource from '../../resource/Storage';
import defaultQuizImage from '../../../asset/defaultQuiz.png'
registerLocale('it', it)

export class CreatorForm extends React.Component {

    constructor(props) {
        super(props);
        if (props != undefined && props.quizData != undefined) {
            //props.quizData.questions = props.questionData
            this.state = props.quizData
        } else {
            this.state = {
                title: "",
                titleError: "",
                smallDescription: "",
                smallDescriptionError: "",
                description: "",
                descriptionError: "",
                expireDate: new Date(),
                image: null,
                imageUrl: defaultQuizImage,
                questions: [],
                showAlert: false,
                showLoader: false
            }
        }
    }

    componentDidMount() {
        if (this.state.image != null) {
            StorageResource.getImage(this.state.image).then(data => {
                this.setState({ imageUrl: data })
            })
        }
        if(this.props.questionData!=undefined){
            this.props.questionData.map(i=>{
                this.addQuestion()
            })
        }
        console.log(this.state)
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

    uncompletedSave = () => {
        console.log(this)
        saveQuizUncompleted(this, this.reloadPage)
        this.setState({ showAlert: false, showLoader: true })

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
            PrepareJsonForSave(this.state, user.id, this.reloadPage, user.group);
            this.setState({ showAlert: false, showLoader: true })
            console.log(this)
        } else {
            window.errorcomponent.showMessage("Errore Utenza", "danger")
        }
    }


    reloadPage = () => {
        this.props.backButton()
    }

    updateImage = (data, i) => {
        this.setState({imageUrl: URL.createObjectURL(data.file),image:data})/*
        StorageResource.putImage(new Blob([data.file], { type: 'image/png' }), new Date().valueOf()).then(
            data => {
                UtilsResource.progressBarUpdate(70)
                StorageResource.getImage(data).then(
                    result => {
                        UtilsResource.progressBarUpdate(100)
                        this.setState({ imageUrl: result, image: data,showLoader:false })
                    })
            })*/
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
                            {/*<PhotoPicker key={this.state.imageUrl} previewSrc={this.state.imageUrl} preview headerText="Foto" headerHint='Aggiungi una foto cliccando sotto' title="Seleziona una foto" onPick={data => this.updateImage(data)} onLoad={data=> console.log(data)} ></PhotoPicker>*/}
                            {this.state.imageUrl &&
                                <Image style={{maxWidth:'100%',marginBottom:'20px'}} src={this.state.imageUrl} rounded />
                            }
                            <Picker title="Seleziona un immagine" onPick={data => this.updateImage(data)}></Picker>
                        </div>
                        <Form.Group style={{marginTop:'20px'}}>
                            <TextField
                                fullWidth
                                required
                                multiline
                                defaultValue={this.state.title}
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
                                defaultValue={this.state.smallDescription}
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
                                defaultValue={this.state.description}
                                onChange={(e) => { this.setState({ description: e.target.value }) }}
                                error={this.state.descriptionError != ""}
                                type="text"
                                id="outlined-error-helper-text"
                                label="Descrizione"
                                helperText={this.state.descriptionError}
                                variant="outlined"
                            />
                        </Form.Group>
                        {/*<Form.Group controlId="exampleForm.ControlTextarea1">
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
                        </Form.Group>*/}
                        <Accordion style={{ margin: 0 }} >
                            {this.state.questions.map((question, index) => (
                                <Card key={1+index} style={{ marginBottom: '20px' }}>
                                    <Accordion.Toggle as={Card.Header} eventKey={1+index}>
                                        <Navbar bg="light" variant="light">
                                            <Navbar.Brand>
                                                <Badge variant="dark">Domanda {index + 1}</Badge>
                                            </Navbar.Brand>
                                            <Navbar.Collapse className="justify-content-end">
                                                <Badge pill variant="danger" onClick={() => this.removeQuestion({ index })}>Elimina</Badge>
                                            </Navbar.Collapse>
                                        </Navbar>
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey={1+index}>
                                        <Card.Body ><Question ref={question} questionData={this.props.uncompleted ? this.props.questionData[index] : undefined} questionIndex={index}></Question></Card.Body>
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
                            <Button variant="primary" onClick={this.uncompletedSave} >
                                Salva per Dopo
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