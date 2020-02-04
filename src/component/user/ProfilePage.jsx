import React from 'react';
import { Button } from 'react-bootstrap';
import { Auth } from 'aws-amplify';
import QuizResources from '../resource/Api';

export class ProfilePage extends React.Component {

    handleLogout=()=> {
        console.log("Logout")
        Auth.signOut()
          .then(data => console.log(data))
          .catch(err => console.log(err));
          window.location.href=('/')
        }

    createErrorMessage = ()=>{
        console.log(window.errorcomponent)
        window.errorcomponent.showMessage("Errore Generico","danger")
    }

   
    render() {
        console.log(window.profilecomponent)
        return (<div>
            <h1>Profile Page</h1>
            <Button onClick={this.handleLogout}>Logout</Button>
            <Button onClick={this.createErrorMessage}>createErrorMessage</Button>
            <Button onClick={()=>window.progressbar.updateProgress(10)}>GetAdminList</Button>
            </div>)
    }
}