import React from 'react'
import { Modal, Button, Alert } from 'react-bootstrap';

export class AlertModal extends React.Component {

    static defaultProps = {
        show:false,
        alert:"Attenzione..Azione Irreversibile",
        title:"",
        message:"",
        variant:"secondary"
    };
    render() {
        return (
            <Modal
                show={this.props.show}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter example-modal-sizes-title-sm"
                centered
            >
                <Alert key="1" variant={this.props.variant}>
                     {this.props.alert}
                </Alert>
                <Modal.Body>
                    <h4>{this.props.title}</h4>
                    <p>
                        {this.props.message}
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.cancel}>Annulla</Button>
                    <Button onClick={this.props.continue}>Continue</Button>
                </Modal.Footer>
            </Modal>
        );
    }

}
