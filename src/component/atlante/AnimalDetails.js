import React from 'react'
import { Grid } from '@material-ui/core';
import { Image, ListGroup, Accordion, Card } from 'react-bootstrap';

export class AnimalDetails extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (<Grid container justify="center" spacing={2} style={{ paddingTop: '5%' }}>
            <Grid item xs={12} sm={12} md={12} large={12} xl={12} zeroMinWidth style={{ width: '100%', margin: 0 }} >
                <h1 align='center'>{this.props.animalDetails[0].name}</h1>
            </Grid>
            <Grid item xs={0} sm={5} md={5} large={4} xl={2} zeroMinWidth >
                <Image style={{ width: '100%' }} src={this.props.animalDetails[0].img} rounded />
            </Grid>
            <Grid item xs={0} sm={5} md={5} large={4} xl={2} zeroMinWidth style={{ width: '100%' }} >
                <ListGroup style={{ background: 'aliceblue' }}>
                    <ListGroup.Item><b>Origine: </b> Germania</ListGroup.Item>
                    <ListGroup.Item><b>Peso Gallo/Gallina: </b> 1,1/0,9 Kg</ListGroup.Item>
                    <ListGroup.Item><b>Uovo: </b> peso > 38g</ListGroup.Item>
                    <ListGroup.Item><b>Colore del guscio: </b> bianco</ListGroup.Item>
                    <ListGroup.Item><b>Anello Gallo/Gallina: </b> 13/11</ListGroup.Item>
                </ListGroup>
            </Grid>
            <Grid item xs={12} sm={12} md={12} large={12} xl={12} zeroMinWidth style={{ width: '100%', margin: 0 }} >
                <h4 align='justify' style={{ marginLeft: '10%', marginRight: '10%' }}>{this.props.animalDetails[0].tipologyDetails} </h4>
            </Grid>
            <Grid item xs={12} sm={12} md={12} large={12} xl={12} zeroMinWidth style={{ width: '100%', margin: 0 }} >
                <Accordion defaultActiveKey="0" style={{ marginLeft: '3%', marginRight: '3%' }}>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="0">
                            Tipologia e indirizzi per la selezione
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>{this.props.animalDetails[0].tipologyDetails}</Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="1">
                            <b>Forma</b>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="1">
                            <Card.Body>
                                <ListGroup style={{ background: 'aliceblue' }}>
                                    <ListGroup.Item><b>Tronco: </b> allungato a rettangolo; largo e ben arrotondato; proporzione lunghezza/profondità/larghezza 8:5:3. Nella gallina forma tipica a rettangolo con dorso pressoché orizzontale.</ListGroup.Item>
                                    <ListGroup.Item><b>Testa: </b> finemente formata; di media grandezza. Nella gallina più piccola possibile.</ListGroup.Item>
                                    <ListGroup.Item><b>Becco: </b> corto e possente; colorarne o corno chiaro.</ListGroup.Item>
                                    <ListGroup.Item><b>Occhi: </b> rossi e vivaci.</ListGroup.Item>
                                    <ListGroup.Item><b>Cresta: </b> di media grandezza, dritta, rimontante sul dietro; cresta semplice finemente tagliata, con sei fino ad otto denti e con un lobo corto. Piega di sostenimento tollerata sul davanti della cresta. La gallina deve presentare una cresta ad “S” (piega di schiacciamento).</ListGroup.Item>
                                    <ListGroup.Item><b>Bargigli: </b>corti e ben arrotondati.</ListGroup.Item>
                                    <ListGroup.Item><b>Faccia: </b> rossa; guarnita da qualche rara piccola piuma.</ListGroup.Item>
                                    <ListGroup.Item><b>Orecchioni: </b> bianchi; il più piccoli possibile.</ListGroup.Item>
                                    <ListGroup.Item><b>Ciuffo: </b>piccolo bouquet di piume dirette verso il dietro. Nella gallina abbastanza arrotondato e riccamente impiumato.</ListGroup.Item>
                                    <ListGroup.Item><b>Collo: </b> mantellina abbondante.</ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </Grid>
        </Grid>
        )

    }

    static defaultProps = {
        animalDetails: [{
            id: 1,
            img: 'https://lh3.googleusercontent.com/proxy/RwDeI_W50vOs__ibv6Vlj_5kvKg7mDVXmTR_X-dTRtyZURciDuUZ8qsz-jfD6ukx_ZMBDFPVMJMbKDUuzcyFyjROhmH9',
            name: 'Altsteirer - Vecchia Stiria Nana',
            tipologyDetails: 'Pollo di tipo comune, di taglia media , che da l’impressione di forza. Portamento largo e medio alto con ciuffo ben formato.'
        }]
    };
}