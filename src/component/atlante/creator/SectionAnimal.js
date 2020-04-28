import React from 'react'
import { Grid, Divider, TextField } from '@material-ui/core';
import { ListGroup, Accordion, Card, Navbar, Badge, Button } from 'react-bootstrap';
import ControlPoint from '@material-ui/icons/ControlPoint';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { AttributeAnimal } from './AttributeAnimal';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { DetailsAnimalWithImage } from './DetailsAnimalWithImage';

export class SectionAnimal extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            sectionLabel: null,
            listAttributes: [],
            listAttributesRef: [],
            subSections: [],
            subSectionsRef: [],
            detailsAnimalWithImage: [],
            detailsAnimalWithImageRef: [],
            visible: false,
            subSectionIndex: 0,
            listAttributesIndex: 0,
            detailsAnimalWithImageIndex: 0
        }
    }

    addNewAttributes = () => {
        var listAttributesIndexTmp = this.state.listAttributesIndex + 1
        var listAttributesRefTmp = this.state.listAttributesRef
        listAttributesRefTmp[listAttributesIndexTmp] = React.createRef()
        var newAttributes = <AttributeAnimal ref={listAttributesRefTmp[listAttributesIndexTmp]} numElement={listAttributesIndexTmp} deleteMethod={this.removeAttributes}></AttributeAnimal>
        this.addToState(newAttributes, listAttributesIndexTmp, 0)
    }

    removeAttributes = (index) => {
        var attributeTmp = this.state.listAttributes
        var listAttributesRefTmp = this.state.listAttributesRef
        attributeTmp[index] = null
        listAttributesRefTmp[index]=null
        this.setState({ listAttributes: attributeTmp,listAttributesRef:listAttributesRefTmp })
    }

    removeSectionWithImage = (index) => {
        var attributeTmp = this.state.detailsAnimalWithImage
        var detailsAnimalWithImageRefTmp = this.state.detailsAnimalWithImageRef
        attributeTmp[index] = null
        detailsAnimalWithImageRefTmp[index]=null
        this.setState({ detailsAnimalWithImage: attributeTmp,detailsAnimalWithImageRef:detailsAnimalWithImageRefTmp })
    }

    removeSubSection = (i) => {
        var subSectionsTmp = this.state.subSections
        var subSectionsRefTmp = this.state.subSectionsRef
        subSectionsTmp[i] = null
        subSectionsRefTmp[i] = null
        this.setState({ subSections: subSectionsTmp,subSectionsRef:subSectionsRefTmp })
    }


    addSubSection = () => {
        var subSectionIndexTmp = this.state.subSectionIndex + 1
        var subSectionsRefTmp = this.state.subSectionsRef
        subSectionsRefTmp[subSectionIndexTmp] = React.createRef()
        var newSubsection = <SectionAnimal ref={subSectionsRefTmp[subSectionIndexTmp]} numSection={subSectionIndexTmp} deleteMethod={this.removeSubSection}></SectionAnimal>
        this.addToState(newSubsection, subSectionIndexTmp, 1)
    }

    addSubSectionAnimalDetailsWithImage = () => {
        var detailsAnimalWithImageIndexTmp = this.state.detailsAnimalWithImageIndex + 1
        var detailsAnimalWithImageRefTmp = this.state.detailsAnimalWithImageRef
        detailsAnimalWithImageRefTmp[detailsAnimalWithImageIndexTmp] = React.createRef()
        var newDetails = <DetailsAnimalWithImage ref={detailsAnimalWithImageRefTmp[detailsAnimalWithImageIndexTmp]} numSection={detailsAnimalWithImageIndexTmp} deleteMethod={this.removeSectionWithImage}></DetailsAnimalWithImage>
        this.addToState(newDetails, detailsAnimalWithImageIndexTmp, 2)
    }

    addToState = (component, newIndex, type) => {
        var Attribute = 0;
        var Section = 1;
        var DetailsAnimal = 2;

        switch (type) {
            case Attribute:
                var listAttributesTmp = this.state.listAttributes;
                listAttributesTmp[newIndex] = component
                this.setState({ listAttributes: listAttributesTmp, listAttributesIndex: newIndex })
                break;
            case Section:
                var subSectionTmp = this.state.subSections;
                subSectionTmp[newIndex] = component
                this.setState({ subSections: subSectionTmp, subSectionIndex: newIndex })
                break;
            case DetailsAnimal:
                var detailsAnimalWithImageTmp = this.state.detailsAnimalWithImage;
                detailsAnimalWithImageTmp[newIndex] = component
                this.setState({ detailsAnimalWithImage: detailsAnimalWithImageTmp, detailsAnimalWithImageIndex: newIndex })
                break;
        }
        
    }

   

   
    handleVisibile = () => {
        this.setState({ visible: !this.state.visible })
    }

    getForJsonSave = () => {
        var value = {}
        var section = []
        var valueWithDivider = []
        console.log(this.state)
        this.state.listAttributesRef.map(values => {
            if(values!=null){
                value[values.current.getKey()] = values.current.getValue()
            }  
        })
        this.state.subSectionsRef.map(values => {
            if(values!=null){
                section.push(values.current.getForJsonSave())
            }  
        })

        this.state.detailsAnimalWithImageRef.map(values => {
            if(values!=null){
                values.current.saveImageBeforeJson()
                valueWithDivider.push(values.current.getForJsonSave())
            } 
        })

        value['section'] = section;

        var section = {
            name: this.state.sectionLabel,
            value,
            valueWithDivider
        }
        return section
    }

    render() {
        var cardKey = this.props.numSection;
        return <Card style={{ minWidth: '100%', paddingTop: '10px' }} >
            <Accordion.Toggle onClick={this.handleVisibile} eventKey={cardKey}>
                {this.state.visible && <VisibilityIcon eventKey={cardKey} />}
                {!this.state.visible && <VisibilityOffIcon eventKey={cardKey} />}
            </Accordion.Toggle>
            <Accordion>
                <Navbar bg="light" variant="light">
                    <Navbar.Brand>
                        <Badge variant="light">
                            <TextField id="input-with-icon-grid"
                                label="Nome Sezione"
                                defaultValue={this.state.sectionLabel}
                                onChange=
                                {(e) => { this.setState({ sectionLabel: e.target.value }) }} /></Badge>
                    </Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end">
                        <Badge pill variant="danger" onClick={() => this.props.deleteMethod(this.props.numSection)}>Elimina</Badge>
                    </Navbar.Collapse>
                </Navbar>
            </Accordion>
            <Accordion.Collapse eventKey={cardKey}>
                <Card.Body>
                    <Grid container spacing={2} >
                        <Grid direction='row' item xs={12} sm={12} md={12} large={12} xl={12}  >
                            <div onClick={() => this.addNewAttributes()}><ControlPoint />Aggiungi Attributo</div>
                            <div onClick={() => this.addSubSection()}><ControlPoint />Aggiungi Sezione</div>
                            <div onClick={() => this.addSubSectionAnimalDetailsWithImage()}><ControlPoint />Aggiungi Dettagli Con Immagine</div>
                        </Grid>
                    </Grid>
                    <ListGroup style={{ background: 'aliceblue' }}>
                        {this.state.listAttributes.map((value, i) => {
                            if (value != null) {
                                return <ListGroup.Item key={i}>
                                    {value}
                                </ListGroup.Item>
                            }
                        })}
                    </ListGroup>
                    <ListGroup style={{ background: 'aliceblue' }}>
                        {this.state.detailsAnimalWithImage.map((value, i) => {
                            if (value != null) {
                                return <ListGroup.Item key={i}>
                                    <Accordion>
                                        {value}
                                    </Accordion>
                                </ListGroup.Item>
                            }
                        })}
                    </ListGroup>
                    <ListGroup style={{ background: 'aliceblue' }}>
                        {this.state.subSections.map((value, i) => {
                            if (value != null) {
                                return <ListGroup.Item key={i}>
                                    <Accordion>
                                        {value}
                                    </Accordion>
                                </ListGroup.Item>
                            }
                        })}
                    </ListGroup>
                </Card.Body>
            </Accordion.Collapse>
        </Card >
    }

    /*<Accordion style={{ margin: 0 }} >
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
                                        <Card.Body ><Question ref={question} questionData={this.props.uncompleted ? this.props.questionData[index] : undefined} questionIndex={index}></Question></Card.Body>
                                    </Accordion.Collapse>
                                </Card>)
                            )}
                        </Accordion>*/
}