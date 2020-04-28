import React from 'react'
import { Grid, TextField, Icon, Divider } from '@material-ui/core'
import { Picker } from 'aws-amplify-react'
import { Image, ListGroup, Form, Col, Button, Accordion } from 'react-bootstrap'
import ControlPoint from '@material-ui/icons/ControlPoint';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { AttributeAnimal } from './AttributeAnimal'
import { SectionAnimal } from './SectionAnimal'
import { AtlanteChooseAnimalCategory } from './AtlanteChooseAnimalCategory';
import StorageResource from '../../resource/Storage';
import UtilsResource from '../../utils/Utils';
import { AtlanteResources } from '../../resource/Api';

export class AtlanteCreator extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            description: '',
            title: '',
            imageUrl: null,
            animalCategory: React.createRef(),
            imageName: '',
            image: null,
            listAttributes: [],
            listAttributesRef: [],
            listSection: [],
            listSectionRef: [],
            indexSection: 0,
            indexAttributes: 0
        }
    }

    updateImage = (data, i) => {
        var imageName = this.state.title + '_' + new Date().valueOf()
        this.setState({ imageUrl: URL.createObjectURL(data.file), imageName: imageName, image: data })

    }

    saveImageBeforJson = () => {
        StorageResource.putImage(new Blob([this.state.image.file], { type: 'image/png' }), this.state.imageName).then(
            data => {
                UtilsResource.progressBarUpdate(70)
                StorageResource.getImage(data).then(
                    result => {
                        UtilsResource.progressBarUpdate(100)
                        this.setState({ imageUrl: result, image: data, showLoader: false })
                    })
            })
    }

    addNewAttributes = () => {
        var indexSectionTmp = this.state.indexAttributes + 1
        var attributeRefTmp = this.state.listAttributesRef
        attributeRefTmp[indexSectionTmp] = React.createRef()
        var attributeToAdd = <AttributeAnimal ref={attributeRefTmp[indexSectionTmp]} numElement={indexSectionTmp} deleteMethod={this.removeAttributes}></AttributeAnimal>
        var attributeTmp = this.state.listAttributes
        attributeTmp[indexSectionTmp] = attributeToAdd
        this.setState({ listAttributes: attributeTmp, listAttributesRef: attributeRefTmp, indexAttributes: indexSectionTmp })
    }

    addNewSection = () => {
        var indexSectionTmp = this.state.indexSection + 1
        var sectionRefTmp = this.state.listSectionRef
        sectionRefTmp[indexSectionTmp] = React.createRef()
        var sectionToAdd = <SectionAnimal ref={sectionRefTmp[indexSectionTmp]} numSection={indexSectionTmp} deleteMethod={this.removeLastSection}></SectionAnimal>
        var sectionTmp = this.state.listSection
        sectionTmp[indexSectionTmp] = sectionToAdd
        this.setState({ listSection: sectionTmp, indexSection: indexSectionTmp, listSectionRef: sectionRefTmp })
    }

    removeLastSection = (index) => {
        var sectionTmp = this.state.listSection
        var sectionRefTmp = this.state.listSectionRef
        sectionRefTmp[index] = null
        sectionTmp[index] = null
        this.setState({ listSection: sectionTmp, listSectionRef: sectionRefTmp })
    }

    removeAttributes = (index) => {
        var attributeTmp = this.state.listAttributes
        var attributeRefTmp = this.state.listAttributesRef
        attributeRefTmp[index] = null
        attributeTmp[index] = null
        this.setState({ listAttributes: attributeTmp, listAttributesRef: attributeRefTmp })
    }

    moveAttributes = (i, direction) => {
        console.log("moveAttributes, ", i)
        var tmpListAttributes = this.state.listAttributes
        var nextPosition = i + direction
        if (nextPosition > 0 && nextPosition < tmpListAttributes.length) {
            [tmpListAttributes[i], tmpListAttributes[nextPosition]] = [tmpListAttributes[nextPosition], tmpListAttributes[i]];
            this.setState({ listAttributes: tmpListAttributes })
        }
    }

    handleShowPreview = () => {
        console.log(this.state.listAttributesRef)
        this.saveImageBeforJson()
        var listDetailsGroup = {}
        var section = []
        this.state.listAttributesRef.map(value => {
            listDetailsGroup[value.current.getKey()] = value.current.getValue()
        })
        this.state.listSectionRef.map(value => {
            section.push(value.current.getForJsonSave())
        })
        var animalDetails = {
            img: this.state.imageName + '.png',
            tipologyDetails: this.state.description,
            name: this.state.title,
            listDetailsGroup,
            listSections: {
                section
            }
        }
        this.saveAnimal(JSON.stringify(animalDetails))
    }

    saveAnimal = (animalDetails) => {
        AtlanteResources.insertAnimalDetails(animalDetails).then(result => {
            if (result != null) {
                var category = this.state.animalCategory.current.getCategory();
                var animalName = this.state.title;
                var imageName = this.state.imageName+'.png';
                AtlanteResources.insertNewAnimal(category,animalName,imageName,result.id)
            }
        })
}

render() {
    var centerStyle = { display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }

    return (<Grid container justify="center" spacing={2} style={{ centerStyle }}>
        <Grid style={centerStyle} item xs={12} sm={12} md={12} large={12} xl={12} zeroMinWidth >
            <h1 style={centerStyle}>Atlante Creator</h1>
        </Grid>
        <Grid style={centerStyle} item xs={12} sm={12} md={12} large={12} xl={12} zeroMinWidth >
            <h5 style={centerStyle}>Scegli categoria</h5>
        </Grid>
        <Grid style={centerStyle} item xs={12} sm={12} md={12} large={12} xl={12} zeroMinWidth >
            <AtlanteChooseAnimalCategory ref={this.state.animalCategory}></AtlanteChooseAnimalCategory>
        </Grid>

        <Grid item xs={12} sm={12} md={6} large={6} xl={6} zeroMinWidth >
            <Grid direction='column' style={centerStyle} item xs={12} sm={12} md={12} large={12} xl={12} >
                <h1 style={centerStyle}>Titolo</h1>
                <Form.Group style={{ width: 'inherit' }} controlId="exampleForm.ControlTextarea1">
                    <TextField
                        fullWidth
                        required
                        multiline={true}
                        defaultValue={this.state.title}
                        onChange={(e) => { this.setState({ title: e.target.value }) }}
                        type="text"
                        id="outlined-error-helper-text"
                        label="Titolo"
                        variant="outlined"
                    />
                </Form.Group>
            </Grid>
            <Grid style={centerStyle} direction='column' item xs={12} sm={12} md={12} large={12} xl={12} zeroMinWidth >
                {this.state.imageUrl &&
                    <Image style={{ maxWidth: '100%', marginBottom: '20px' }} src={this.state.imageUrl} rounded />
                }
                <Picker title="Seleziona un immagine" onPick={data => this.updateImage(data)}></Picker>
            </Grid>
            <Grid direction='column' style={centerStyle} item xs={12} sm={12} md={12} large={12} xl={12} zeroMinWidth >
                <p>Caratteristiche</p>
                <Grid irection='row' style={centerStyle} item xs={12} sm={12} md={12} large={12} xl={12} zeroMinWidth >
                    <div onClick={() => this.addNewAttributes()} ><ControlPoint />Aggiungi nuovo attributo</div>
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
                <Grid direction='column' style={centerStyle} item xs={12} sm={12} md={12} large={12} xl={12} zeroMinWidth >
                    <h1 style={centerStyle}>Descrizione</h1>
                    <Form.Group style={{ width: 'inherit' }} controlId="exampleForm.ControlTextarea1">
                        <TextField
                            fullWidth
                            required
                            multiline={true}
                            defaultValue={this.state.description}
                            onChange={(e) => { this.setState({ description: e.target.value }) }}
                            type="text"
                            id="outlined-error-helper-text"
                            label="Descrizione"
                            variant="outlined"
                        />
                    </Form.Group>
                </Grid>
                <Grid irection='row' style={centerStyle} item xs={12} sm={12} md={12} large={12} xl={12} zeroMinWidth >
                    <div onClick={() => this.addNewSection()}><ControlPoint />Aggiungi Nuova Sezione</div>
                </Grid>
                <Grid direction='column' style={centerStyle} item xs={12} sm={12} md={12} large={12} xl={12} zeroMinWidth >
                    <Accordion /*defaultActiveKey="0"*/ style={{ marginLeft: '3%', marginRight: '3%', minWidth: '100%' }}>
                        {this.state.listSection.map((value, i) => {
                            if (value != null) {
                                return <Accordion key={i} style={{ margin: 0 }} >
                                    {value}
                                </Accordion>
                            }
                        })}
                    </Accordion>
                </Grid>
            </Grid>
            <Grid style={centerStyle} item xs={12} sm={12} md={12} large={12} xl={12} zeroMinWidth >
                <Button onClick={() => this.handleShowPreview()}>Anteprima</Button>
            </Grid>
        </Grid>
    </Grid >)
}
}