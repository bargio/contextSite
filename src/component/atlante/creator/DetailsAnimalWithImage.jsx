import React from 'react'
import { Image, Form } from 'react-bootstrap'
import { Picker } from 'aws-amplify-react'
import { TextField } from '@material-ui/core'
import StorageResource from '../../resource/Storage';
import UtilsResource from '../../utils/Utils';

export class DetailsAnimalWithImage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            imageUrl: null,
            imageName:'',
            title:'',
            description:''
        }
    }

    updateImage = (data, i) => {
        var imageName = this.state.title + '_' + new Date().valueOf()
        this.setState({ imageUrl: URL.createObjectURL(data.file),imageName:imageName, image: data })
    }

    saveImageBeforeJson = ()=>{
        
        StorageResource.putImage(new Blob([this.state.image.file], { type: 'image/png' }), this.state.imageName).then(
            data => {
                UtilsResource.progressBarUpdate(70)
                StorageResource.getImage(data).then(
                    result => {
                        UtilsResource.progressBarUpdate(100)
                        this.setState({ imageUrl: result, image: data,showLoader:false })
                    })
            })
    }

    getForJsonSave=()=>{
        var value = {
            name: this.state.title,
            value: this.state.description,
            image: this.state.imageName+'.png'
        }
        return value
    }

    render() {
        return <>
            {
                this.state.imageUrl &&
                <Image style={{ maxWidth: '100%', marginBottom: '20px' }} src={this.state.imageUrl} rounded />
            }
            <Picker title="Seleziona un immagine" onPick={data => this.updateImage(data)}></Picker>
            <Form.Group style={{ paddingTop:'10px', width: 'inherit' }} controlId="exampleForm.ControlTextarea1">
                <TextField
                    fullWidth
                    required
                    defaultValue={this.state.title}
                    onChange={(e) => { this.setState({ title: e.target.value }) }}
                    type="text"
                    id="outlined-error-helper-text"
                    label="Titolo"
                    variant="outlined"
                />
            </Form.Group>
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
        </>
    }
}