import React from 'react';

import { UserNavBarProfile } from '../user/UserNavBarProfile';
import Amplify, { Auth, Hub } from 'aws-amplify';
import awsconfig from '../../aws-exports';
import { Authenticator } from 'aws-amplify-react';
import Cookies from 'universal-cookie';
import { Button, ButtonGroup } from 'react-bootstrap';
import AuthenticationManager from "../auth/AuthenticationManager";
import LoginPage from '../auth/LoginPage';

Amplify.configure(awsconfig);

export class LoginManager extends React.Component {
  constructor(props) {
    super(props);
    const cookies = new Cookies();
    this.state = {
      cookie: cookies,
      userCookie: cookies.get('userCookie')
    };
    this.handleLogin = this.handleLogin.bind(this);
  
  }

  componentDidMount(){
    //var user = AuthenticationManager.isLoggedIn().then(data => console.log(data))
   
  }

  handleLogin(authState) {
    this.state.cookie.set('userCookie', authState, { path: '/' });
    window.location.reload();
  }

  
  render() {
    return <LoginPage handleLogin={this.handleLogin} />;
  }
}