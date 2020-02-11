import React from 'react';
import Form from 'react-bootstrap/FormControl';
import { InputGroup, FormControl, FormCheck, Badge, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { PhotoPicker } from 'aws-amplify-react';
import StorageResource from '../../resource/Storage';
import { TextField } from '@material-ui/core';
import UtilsResource from '../../utils/Utils';
import { createRef } from 'react';

class Response {
    constructor(text, isCorrect) {
        this.responseText = text;
        this.isCorrect = isCorrect;
    }
}

export class Question extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isImageQuestion: false,
            isImageQuestion2: false,
            isVideoQuestion: false,
            isTextQuestion: true,
            imageType1: null,
            time: 15,
            score: 1,
            question: "",
            response: [],
            refresh: false,
            fieldHeight: '50'
        }
        this.timeInput = React.createRef();
        this.scoreInput = React.createRef();

    }

    isImageQuestion = () => {
        this.setState({
            isImageQuestion: true,
            isImageQuestion2: false,
            isVideoQuestion: false,
            isTextQuestion: false,
        })
    }

    isImageQuestion2 = () => {
        this.setState({
            isImageQuestion: false,
            isImageQuestion2: true,
            isVideoQuestion: false,
            isTextQuestion: false,
        })
    }


    isVideoQuestion = () => {
        this.setState({
            isImageQuestion: false,
            isVideoQuestion: true,
            isImageQuestion2: false,
            isTextQuestion: false,
        })
    }

    isTextQuestion = () => {
        this.setState({
            isImageQuestion: false,
            isVideoQuestion: false,
            isImageQuestion2: false,
            isTextQuestion: true,
        })
    }

    removeResponse = (e) => {
        this.setState(state => {
            const list = state.response;
            list.splice(e.index, 1);
            return {
                list
            };
        });
    }

    addResponse = () => {
        this.setState(state => {
            const list = state.response.push(new Response("", false));
            return {
                list
            };
        });
    }

    isCorrect = (i) => {
        this.setState(state => {
            const responses = state.response
            let currentElement = responses[i];
            currentElement.isCorrect = !currentElement.isCorrect;
            responses[i] = currentElement;
            return {
                responses
            };
        });
    }

    updateText = (el, i) => {
        let text = el.target.value
        this.setState(state => {
            const responses = state.response
            let currentElement = responses[i];
            currentElement.responseText = text;
            responses[i] = currentElement;
            return {
                responses
            };
        });
    }

    updateImage = (data, i) => {
        StorageResource.putImage(new Blob([data.file], { type: 'image/png' }), new Date().valueOf()).then(
            data => (this.setState(state => {
                const responses = state.response
                let currentElement = responses[i];
                currentElement.responseText = data;
                responses[i] = currentElement;
                return {
                    responses
                };
            }))
        )

    }

    updateTime = () => {
        this.setState({
            time: parseInt(this.timeInput.current.value)
        })
    }

    updateScore = () => {
        this.setState({
            score: parseInt(this.scoreInput.current.value)
        })
    }

    updateImageQuestionType1 = (data) => {
        StorageResource.putImage(new Blob([data.file], { type: 'image/png' }), new Date().valueOf()).then(
            data => { this.setState({ imageType1: data }); console.log(data);UtilsResource.progressBarUpdate(100) }
        )
    }

    allToJson = () => {
        console.log(JSON.stringify(this.state))
    }

    checkFields = () => {
        var color = "#ff000061";
        var haveReponse = false;
        var haveText = true;
        console.log(this)
        if (this.state.question == "") {
            return false
        }
        this.state.response.map(response => {
            if (response.responseText == undefined || response.responseText == "") {
                haveText = false
            }
            if (response.isCorrect) {
                haveReponse = true
            }
        })

        if (haveReponse && haveText) {
            return true
        }
        return false
    }

    setFilledTextareaHeight = (e) =>{
        e.target.style.height=(e.target.value.split("\n").length*36)+"px"    
    }

    render() {
        const style = { marginTop: '10px' }
        return (
            <div>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroup-sizing">Domanda</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl style={{height:'100%'}}as="textarea" aria-describedby="inputGroup-sizing-lg" onKeyUp={this.setFilledTextareaHeight} onChange={(e) => {this.setState({question: e.target.value }) }} />
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text>Tempo</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl as="select" ref={this.timeInput} onChange={this.updateTime}>
                        <option value='15'>15 secondi</option>
                        <option value='30'>30 secondi</option>
                        <option value='60'>1 minuto</option>
                        <option value='120'>2 minuti</option>
                        <option value='180'>3 minuti</option>
                        <option value='300'>5 minuti</option>
                    </FormControl>
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text>Punti</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl as="select" ref={this.scoreInput} onChange={this.updateScore}>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>
                        <option>9</option>
                        <option>10</option>
                    </FormControl>
                </InputGroup>
                <FormCheck inline checked={this.state.isTextQuestion} type="radio" label="Testo" onChange={this.isTextQuestion} />
                <FormCheck inline checked={this.state.isImageQuestion} type="radio" label="Immagine tipo 1" onChange={this.isImageQuestion} />
                <FormCheck inline disabled checked={this.state.isImageQuestion2} type="radio" label="Immagine tipo 2" onChange={this.isImageQuestion2} />
                <FormCheck inline disabled checked={this.state.isVideoQuestion} type="radio" label="Video" onChange={this.isVideoQuestion} />
                {
                    this.state.isImageQuestion &&
                    <div style={{ maxWidth: "min-content", margin: "auto" }}>
                        <PhotoPicker preview headerText="Foto" headerHint='Aggiungi una foto cliccando sotto' title="Seleziona una foto" onPick={data => this.updateImageQuestionType1(data)} ></PhotoPicker>
                    </div>
                }
                {
                    this.state.isVideoQuestion &&
                    <FormControl style={style} aria-label="Small" aria-describedby="inputGroup-sizing-sm" placeholder="Video Url" />
                }
                <br />
                <br />
                <Badge size="lg" variant="success" onClick={this.addResponse}>Aggiungi risposta</Badge>
                <br />
                <br />
                {
                    (this.state.response || []).map((q, index) => (
                        <InputGroup key={index} style={style}>
                            <InputGroup.Prepend>
                                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Seleziona se corretta</Tooltip>}>
                                    <InputGroup.Checkbox checked={q.isCorrect} onChange={() => this.isCorrect(index)} />
                                </OverlayTrigger>
                            </InputGroup.Prepend>

                            {this.state.isImageQuestion2 &&
                                <PhotoPicker preview headerText="Foto" headerHint='Aggiungi una foto come risposta cliccando sotto' title="Seleziona una foto" onPick={data => this.updateImage(data, index)} ></PhotoPicker>}
                            {!this.state.isImageQuestion2 &&
                                <FormControl onKeyUp={this.setFilledTextareaHeight} as="textarea" rows="1" value={q.responseText} id={index} style={{ backgroundColor: q.isCorrect ? "#1a980082" : "white" }} onChange={(e) => this.updateText(e, index)} />}
                            <InputGroup.Append>
                                <InputGroup.Text><Badge pill variant="danger" onClick={() => this.removeResponse({ index })}>Elimina</Badge></InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>
                    ))
                }
            </div >
        )
    }
}