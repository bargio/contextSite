import Amplify, { Storage, Auth } from 'aws-amplify';
import awsconfig from '../../aws-exports';
import Utils from '../utils/Utils';

Amplify.configure(awsconfig);

const StorageResource = {
    putImage: async function putImage(file,name) {
        global.AWS.config.credentials = await Auth.currentCredentials();
        var imageUrl ="";
        await Storage.put(name+'.png', file, {
            contentType: 'image/png',
            progressCallback(progress) {
                Utils.progressBarUpdate(10+progress.loaded/progress.total*20)
                console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
            },
        })
        .then(result => {console.log(result);imageUrl=result.key})
        //.then(result => {console.log(result);imageUrl=this.getImage(result.key)})
        .catch(err => console.log(err));
        return imageUrl;
    },

    getImage: async function getImage(image){
        var imageUrl = await Storage.get(image);
        return imageUrl
    }
}
export default StorageResource;