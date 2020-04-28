import React from 'react'
import { Grid, Divider } from '@material-ui/core';
import { Image, ListGroup, Accordion, Card } from 'react-bootstrap';
import StorageResource from '../resource/Storage';
import { S3Image } from 'aws-amplify-react';
import { ImageLoaderViewer } from '../imageLoaderViewer/ImageLoaderViewer';
import { AtlanteResources } from '../resource/Api';

export class AnimalDetails extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            listDetails: [],
            listSections: [],
            listImageUrl: []
        }
    }

    componentWillMount() {
        var animalID = window.location.pathname.split("/")[2]
        AtlanteResources.getAnimalDetails(animalID).then(value=>{
            var animalDetails = JSON.parse(value.data.getAnimalDetails.jsonDetails)
            console.log(animalDetails)
            this.createListDetailsFromJson(animalDetails);
            this.createSectionFromJson(animalDetails)
        })

    }

    createListDetailsFromJson(animalDetails) {
        Object.keys(animalDetails.listDetailsGroup).forEach((k) => {
            var listDetailsTmp = this.state.listDetails;
            listDetailsTmp.push(<ListGroup.Item><b>{k}: </b> {animalDetails.listDetailsGroup[k]}</ListGroup.Item>)
            this.setState({ listDetails: listDetailsTmp })
        });
    }
    createSectionFromJson(animalDetails) {
        var sections = animalDetails.listSections.section;
        var listSectionsTmp = this.state.listSections;
        Object.keys(sections).forEach((k) => {
            var newSection = this.createSectionContent(sections[k], null, false)
            listSectionsTmp.push(newSection)
        })
        this.setState({ listSections: listSectionsTmp })
    }

    createSectionContent(section, keyFromTop, isInner) {
        var nameSection = section.name;
        var key = nameSection;
        var image = section.image
        var value = section.value
        var valueWithDivider = section.valueWithDivider;
        var listSectionsElementValue = [];
        var innerSectionsComponent = []
        if (isInner) {
            key = keyFromTop
        }
        if (value != null) {
            Object.keys(value).forEach((j) => {
                console.log(j)
                if (j != 'section') {
                    listSectionsElementValue.push(<ListGroup.Item><b>{j}</b>: {value[j]}</ListGroup.Item>)
                } else {
                    Object.keys(value.section).forEach((innerSection) => {
                        innerSectionsComponent.push(this.createSectionContent(value.section[innerSection], nameSection, true));
                    })
                }
            })
        }
        var listSectionWithDividerGroup = []
        if (valueWithDivider != null) {
            Object.keys(valueWithDivider).forEach((i) => {
                key = keyFromTop
                /*if (valueWithDivider[i].image != null && this.state.listImageUrl[valueWithDivider[i].image]==null) {
                    StorageResource.getImage(valueWithDivider[i].image).then(value => {
                        var listImageUrlTmp = this.state.listImageUrl;
                        listImageUrlTmp[valueWithDivider[i].image]=value
                        this.setState({listImageUrl:listImageUrlTmp})
                    })
                } */
                listSectionWithDividerGroup.push(<><b>{valueWithDivider[i].name}</b>
                    <Divider />
                    {valueWithDivider[i].image != null &&
                        <ImageLoaderViewer style={{ minWidth: '100%' }} imageKeyAws={valueWithDivider[i].image}></ImageLoaderViewer>
                    }
                    <Divider />
                    {valueWithDivider[i].value}
                    < Divider /></>
                )
            })
        }
        console.log(listSectionWithDividerGroup)
        var listSectionComponendGroup = <ListGroup style={{ background: 'aliceblue' }}>
            {listSectionsElementValue}
        </ListGroup>
        var newSection = (<Card>
            <Accordion.Toggle as={Card.Header} eventKey={key}>
                <b>{nameSection}</b>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={key}>
                <Card.Body>
                    {value != null &&
                        listSectionComponendGroup}
                    <br></br>
                    {valueWithDivider != null &&
                        listSectionWithDividerGroup}
                    {innerSectionsComponent.length != 0 &&
                        innerSectionsComponent
                    }


                </Card.Body>
            </Accordion.Collapse>
        </Card>)
        return newSection;

    }

    render() {
        return (<Grid container justify="center" spacing={2} style={{ paddingTop: '5%' }}>
            <Grid item xs={12} sm={12} md={12} large={12} xl={12} zeroMinWidth style={{ width: '100%', margin: 0 }} >
                <h1 align='center'>{this.props.animalDetails[0].name}</h1>
            </Grid>
            <Grid item xs={0} sm={5} md={5} large={4} xl={2} zeroMinWidth >
                <ImageLoaderViewer style={{ minWidth: '100%' }} imageKeyAws={this.props.animalDetails[0].img}></ImageLoaderViewer>
            </Grid>
            <Grid item xs={0} sm={5} md={5} large={4} xl={2} zeroMinWidth style={{ width: '100%' }} >
                <ListGroup style={{ background: 'aliceblue' }}>
                    {this.state.listDetails}
                </ListGroup>
            </Grid>
            <Grid item xs={12} sm={12} md={12} large={12} xl={12} zeroMinWidth style={{ width: '100%', margin: 0 }} >
                <h4 align='justify' style={{ marginLeft: '10%', marginRight: '10%' }}>{this.props.animalDetails[0].tipologyDetails} </h4>
            </Grid>
            <Grid item xs={12} sm={12} md={12} large={12} xl={12} zeroMinWidth style={{ width: '100%', margin: 0 }} >
                <Accordion /*defaultActiveKey="0"*/ style={{ marginLeft: '3%', marginRight: '3%' }}>
                    {this.state.listSections}
                </Accordion>
            </Grid>
        </Grid>
        )

    }


    static defaultProps = {
        animalDetails: [{
            "img": "pollo_1588059868597.png",
            "tipologyDetails": "asdadasd",
            "name": "pollo",
            "listDetailsGroup": {
                "asdasd": "sdfsdfsdfsdf",
                "asdasdas": "sdfsdfsdfsd"
            },
            "listSections": {
                "section": [
                    {
                        "name": "fgfghgfh",
                        "value": {
                            "fghgfhgf": "sdfsdfsdf",
                            "asdasdasd": "sdfsdfsdf",
                            "section": [

                            ]
                        },
                        "valueWithDivider": [

                        ]
                    },
                    {
                        "name": "fdgdfgfdgdfg",
                        "value": {
                            "section": [

                            ]
                        },
                        "valueWithDivider": [
                            {
                                "name": "qweqweqwe",
                                "value": "retertertet",
                                "image": "qweqweqwe_1588059911186.png"
                            }
                        ]
                    }
                ]
            }
        }]
    };

    /*static defaultProps = {
        animalDetails: [{
            id: 1,
            img: 'data:image/jpeg;base64,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',
            listDetailsGroup: {
                'Origine': 'Germania',
                'Peso Gallo/Gallina': '1,1/0,9 KG',
                'Uovo': 'peso >38g',
                'Colore del guscio': 'bianco',
                'Anello Gallo/Gallina': '13/11'
            },
            listSections: {
                section: [{
                    name: 'Forma',
                    image: null,
                    value: {
                        'Tronco': 'allungato a rettangolo; largo e ben arrotondato; proporzione lunghezza/profondità/larghezza 8:5:3. Nella gallina forma tipica a rettangolo con dorso pressoché orizzontale.',
                        'Testa': 'finemente formata; di media grandezza. Nella gallina più piccola possibile.',
                        'Becco': 'corto e possente; colorarne o corno chiaro.',
                        'Occhi': 'rossi e vivaci.',
                        'Cresta': 'di media grandezza, dritta, rimontante sul dietro; cresta semplice finemente tagliata, con sei fino ad otto denti e con un lobo corto. Piega di sostenimento tollerata sul davanti della cresta. La gallina deve presentare una cresta ad “S” (piega di schiacciamento).',
                        'Bargigli': 'corti e ben arrotondati.',
                        'Faccia': 'rossa; guarnita da qualche rara piccola piuma.',
                        'Orecchioni': 'bianchi; il più piccoli possibile.',
                        'Ciuffo': 'piccolo bouquet di piume dirette verso il dietro. Nella gallina abbastanza arrotondato e riccamente impiumato.',
                        'Collo': 'mantellina abbondante.',
                        'Difetti Gravi': 'Ossatura grossolana; forma triangolare; dorso stretto o corto; petto piatto o stretto; coda portata troppo rilevata o troppo piatta; portamento troppo alto o troppo profondo; cresta e testa grossolana; assenza nella cresta a “S” nella gallina; assenza del ciuffo; molto rosso negli orecchioni.'
                    }
                },
                {
                    name: 'Piumaggio',
                    value: {
                        'Conformazione': 'riccamente sviluppato; ben aderente al corpo; piume il più larghe possibile e brillanti.'

                    }
                },
                {
                    name: 'Colorazioni',
                    value: {
                        'ciao': 'mondo',
                        section: [{
                            name: 'Collo Perniciato',
                            valueWithDivider:
                                [{
                                    name: 'Gallo',
                                    value: ' Testa, ciuffo e groppa bruno-rosso. Mantellina bruno-rosso con fiamme nere più o meno pronunciate e parzialmente nascoste. Dorso, spalle e piccole coprirci delle ali bruno-rosso fino a bruno scuro. Remiganti primarie nere con bordo esterno bruno. Remiganti secondarie a barbe interne nere e barbe esterne brune che formano il triangolo dell’ala. Fasce dell’ala nere a riflessi verdi. Petto, ventre e gambe nere. Coda nera con riflessi scarabeo.',
                                    image: '1582024443902.png'
                                },
                                {
                                    name: 'Gallina',
                                    value: 'Piumaggio del mantello bruno selvatico con pepatura nera e rachide nettamente chiaro, senza tracce di orlatura chiara sulle piume. Ciuffo come il piumaggio del mantello. Mantellina bruno dorato con fiamme nere. Petto salmone scuro. Gambe e ventre un po’ più chiari de petto, che diviene più grigio verso il piumaggio anale. Leggera differenza fra il colore di fondo e il disegno ammesse.',
                                },
                                {
                                    name: 'Difetti Gravi',
                                    value: 'Gallo: tracce brune nel petto, nel petto e nelle gambe; troppo nero nel triangolo dell’ala; mantellina e groppa troppo chiare. Gallina: colore di fondo troppo chiaro; pepatura molto grossolana; assenza del disegno del rachide; molta ruggine sulle piccole copritrici delle ali; formazione di una orlatura chiara. Nei due sessi: tracce farinose.',
                                }
                                ]
                        },
                        {
                            name: 'Bianca',
                            valueWithDivider:
                                [{
                                    name: 'GALLO e GALLINA',
                                    value: ' Bianco puro, brillante nei due sessi.',
                                    image: '1582024443902.png'
                                },
                                {
                                    name: 'Difetti Gravi',
                                    value: 'riflessi gialli.',
                                },
                                ]

                        }]
                    }
                }
                ],
                'Forma': {
                    'Tronco': 'allungato a rettangolo; largo e ben arrotondato; proporzione lunghezza/profondità/larghezza 8:5:3. Nella gallina forma tipica a rettangolo con dorso pressoché orizzontale.',
                    'Testa': 'finemente formata; di media grandezza. Nella gallina più piccola possibile.',
                    'Becco': 'corto e possente; colorarne o corno chiaro.',
                    'Occhi': 'rossi e vivaci.',
                    'Cresta': 'di media grandezza, dritta, rimontante sul dietro; cresta semplice finemente tagliata, con sei fino ad otto denti e con un lobo corto. Piega di sostenimento tollerata sul davanti della cresta. La gallina deve presentare una cresta ad “S” (piega di schiacciamento).',
                    'Bargigli': 'corti e ben arrotondati.',
                    'Faccia': 'rossa; guarnita da qualche rara piccola piuma.',
                    'Orecchioni': 'bianchi; il più piccoli possibile.',
                    'Ciuffo': 'piccolo bouquet di piume dirette verso il dietro. Nella gallina abbastanza arrotondato e riccamente impiumato.',
                    'Collo': 'mantellina abbondante.',
                    'Difetti Gravi': 'Ossatura grossolana; forma triangolare; dorso stretto o corto; petto piatto o stretto; coda portata troppo rilevata o troppo piatta; portamento troppo alto o troppo profondo; cresta e testa grossolana; assenza nella cresta a “S” nella gallina; assenza del ciuffo; molto rosso negli orecchioni.'
                }
            },
            name: 'Altsteirer - Vecchia Stiria Nana',
            tipologyDetails: 'Pollo di tipo comune, di taglia media , che da l’impressione di forza. Portamento largo e medio alto con ciuffo ben formato.'
        }]
    };*/
}