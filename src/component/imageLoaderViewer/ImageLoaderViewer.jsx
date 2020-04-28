import React from 'react'
import { Image } from 'react-bootstrap';
import StorageResource from '../resource/Storage';

export class ImageLoaderViewer extends React.Component{

    constructor(props){
        super(props);
        this.state= {
            imageUrl: null
        }
    }

    componentWillMount(){
        StorageResource.getImage(this.props.imageKeyAws).then(value=>{
            console.log(value)
            this.setState({imageUrl:value})
        })
    }

    render(){
        if(this.state.imageUrl!=null){
           return  <Image style={{ maxWidth: '100%' }} src={this.state.imageUrl} rounded />
        }else{
            return <></>
        }
    }
}