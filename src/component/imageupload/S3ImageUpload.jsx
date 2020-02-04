import React from 'react';
import StorageResources from '../resource/Storage';

export class S3ImageUpload extends React.Component {

    onChange(e) {
        const file = e.target.files[0];
        StorageResources.putImage(file);
    }
  
    render() {
        return (
            <input
                type="file" accept='image/png'
                onChange={(e) => this.onChange(e)}
            />
        )
    }
  }