
import React from 'react';
import { Button, Card, Alert, Container } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { Authenticator } from 'aws-amplify-react';
import { withFederated } from 'aws-amplify-react';
import { Grid, CardContent, Typography, TextField } from '@material-ui/core';
import { I18n, Auth } from 'aws-amplify';
import { LoginNav } from './LoginNav';
import AuthenticationManager from './AuthenticationManager';
import "./Login.css"
import MyLoader from '../loading/Loader';



class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    window.profilecomponent = this
    this.state = {
      confirmation: false,
      confirmationCode:'',
      confirmationCodeError:'',
      load: false,
      showModal: false,
      isLoggedIn: false,
      username: '',
      usernameError: '',
      password: '',
      passwordError: '',
      email: '',
      emailError: '',
      stateLogin: true,
      errorMessage: "ok",
      userLogged: null
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
  }

  getUserDetails = () => {
    if (this.state.isLoggedIn) {
      return this.state
    }
    return null
  }


  isLoggedIn = (result) => {
    var username = null;
    var email = null;
    try {
      //for cognito
      if (result && result != "Error" && result.username) {
        username = result.username;
        email = result.attributes.email;
        this.setState({ userLogged: { username: username, email: email }, isLoggedIn: true })
        //for google or facebook
      } else if (result && result != "Error" && result.name) {
        username = result.name;
        email = result.email
        this.setState({ userLogged: { username: username, email: email }, isLoggedIn: true })
      }
    } catch (error) {
      console.log("Error")
      console.log(error)
    }
  }



  componentDidMount() {
    AuthenticationManager.isLoggedIn(this.isLoggedIn)
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleClose() {
    this.setState({ show: false });
  }

  isLogged = (authState, data) => {
    console.log(data);
    if (authState == "signedIn") {
      this.props.handleLogin(data);
      this.handleClose()
    }
  }

  changeState = (state) => {
    if (state == "login") {
      this.setState({ stateLogin: true })
    } else {
      this.setState({ stateLogin: false })
    }
  }

  loginWithoutProvider = (message, method) => {
    console.log(message, method)
    if(message.includes("Utente non confermato")){
      this.setState({ confirmation:true })
    }
    if(message!="ok"|| message!=""){
      this.setState({ errorMessage: message, load: false })
    }
    this.setState({load: false })
    if (method === "signin") {
      if (message == 'ok') {
        window.location.reload()
      }
    } else if (method === "signup") {
      if (message == 'ok') {
        this.setState({confirmation:true})
        window.errorcomponent.showMessage("Utente creato...Controlla la tua mail per confermare la registrazione.", "success")
      }
    }else if(method === "confirmation"){
      if(message == 'ok'){
        this.setState({stateLogin:true,confirmation:false})
        window.errorcomponent.showMessage("Utente confermato.", "success")
        console.log(this.state)
      }
    }
  }

  checkTextFields = () => {
    var usernameError = "";
    var emailError = "";
    var passwordError = "";
    var confirmationCodeError = "";
    var noError = true;
    this.setState({ usernameError: "", passwordError: "", emailError: "",confirmationCodeError:"" })
    if (this.state.username.length <= 0) {
      usernameError = "Campo Obbligatorio"
      noError = false
    }
    if (!this.state.stateLogin && this.state.email.length <= 0) {
      emailError = "Campo Obbligatorio"
      noError = false
    }
    if (this.state.password.length <= 0) {
      passwordError = "Campo Obbligatorio"
      noError = false
    }
    if(this.state.confirmation && this.state.confirmationCode<=0){
      confirmationCodeError = "Campo obbligatorio"
      noError = false
    }
    if (!noError) {
      this.setState({ usernameError: usernameError, passwordError: passwordError, emailError: emailError, confirmationCodeError:confirmationCodeError})
      return
    } else if(this.state.confirmation){
      this.setState({ load: true })
      AuthenticationManager.confirmSignUp(this.state.username,this.state.confirmationCode).then((message) => this.loginWithoutProvider(message, "confirmation"))
    } else if (this.state.stateLogin) {
      this.setState({ load: true })
      AuthenticationManager.signIn(this.state.username, this.state.password).then((message) => this.loginWithoutProvider(message, "signin"))
      return
    } else if (!this.state.stateLogin) {
      this.setState({ load: true })
      AuthenticationManager.signUp(this.state.username, this.state.password, this.state.email).then((message) => this.loginWithoutProvider(message, "signup"))
      return
    }
  }

  saveUsername = (username) => {
    this.setState({ username: username })
  }


  savePassword = (password) => {
    this.setState({ password: password })
  }

  saveEmail = (email) => {
    this.setState({ email: email })
  }

  saveConfirmationCode = (confirmationCode) =>{
    this.setState({confirmationCode:confirmationCode})
  }

  onStateChange = (change) => {
    this.setState({ load: true })
    window.location.reload()
  }

  render() {
    const formComponent = (
      <Card style={{ margin: '10%' }} variant="outlined">
        <CardContent>
          <Typography gutterBottom variant="h5" component="h4">
            <b>{this.state.stateLogin ? "Accedi..." : "Crea un nuovo utente..."}</b>
          </Typography>
          <Card.Body>
            {!this.state.confirmation &&
              <Form>
                <Form.Group controlId="formBasicUsername">
                  <TextField
                    fullWidth
                    required
                    defaultValue = {this.state.username}
                    onChange={(e) => this.saveUsername(e.target.value)}
                    error={this.state.usernameError != ""}
                    type="email"
                    id="outlined-error-helper-text"
                    label={this.state.stateLogin ? "Nome Utente/Email" : "Nome Utente"}
                    helperText={this.state.usernameError}
                    variant="outlined"
                  />
                </Form.Group>
                {!this.state.stateLogin &&
                  <Form.Group controlId="formBasicEmail">
                    <TextField
                      fullWidth
                      required
                      onChange={(e) => this.saveEmail(e.target.value)}
                      error={this.state.emailError != ""}
                      id="outlined-error-helper-text"
                      label="Email"
                      type="email"
                      helperText={this.state.emailError}
                      variant="outlined"

                    />
                  </Form.Group>
                }
                <Form.Group controlId="formBasicPassword">

                  <TextField
                    fullWidth
                    required
                    defaultValue = {this.state.password}
                    onChange={(e) => this.savePassword(e.target.value)}
                    error={this.state.passwordError != ""}
                    id="outlined-error-helper-text"
                    label="Password"
                    type="password"
                    helperText={this.state.passwordError}
                    variant="outlined"
                  />
                </Form.Group>
                <Button variant="outline-success" onClick={() => this.checkTextFields()}>{this.state.stateLogin ? "Accedi" : "Registrati"}</Button>
                <br />
                <br />
                {(this.state.errorMessage != "ok" && this.state.errorMessage!="") &&
                  <Alert key="alert" variant="danger">
                    {this.state.errorMessage}
                  </Alert>
                }
              </Form>
            }
            {this.state.confirmation &&
              < Form >
              <Form.Group controlId="formBasicUsername">
                <TextField
                  fullWidth
                  required
                  onChange={(e) => this.saveConfirmationCode(e.target.value)}
                  error={this.state.confirmationCodeError != ""}
                  type="number"
                  id="outlined-error-helper-text"
                  label="Codice di verifica"
                  helperText={this.state.confirmationCodeError}
                  variant="outlined"
                />
              </Form.Group>
              <Form.Group controlId="formBasicUsername">
                <h5>Non hai ricevuto il codice? </h5><Button variant="link" color="primary"onClick={()=>AuthenticationManager.resendCodeSignUp(this.state.username)}>Rinviamelo</Button>
              </Form.Group>
              <Button variant="outline-success" onClick={() => this.checkTextFields()}>Conferma</Button>
              <br />
              <br />
            {this.state.errorMessage != "ok" &&  this.state.errorMessage != "" &&
              <Alert key="alert" variant="danger">
                {this.state.errorMessage}
              </Alert>
            }
          </Form>
          }
          </Card.Body>
        </CardContent>
      </Card >)



    const Buttons = (props) => (
      <Grid
        container
        justify="center"
        spacing={5}
        style={{ marginBottom: '5%' }}

      >
        <Grid item xs={2} flex zeroMinWidth alignContent='center' >
          <img
            onClick={props.googleSignIn}
            src="https://i.pinimg.com/originals/2e/0b/a5/2e0ba56f7ebcc9ecb2bb5293f9685b5f.png"
            width='50px'
            height='50px'
          />
        </Grid>
        <Grid item xs={2} flex zeroMinWidth >
          <img
            onClick={props.facebookSignIn}
            src="https://upload.wikimedia.org/wikipedia/commons/1/1b/Facebook_icon.svg"
            width='50px'
            height='50px'
          />
        </Grid>
      </Grid>
    )

    const Federated = withFederated(Buttons);

    const federatedL = {
      google_client_id: '934932606671-7fc3j9lccsqd5g7q55g2ro4hl6g5o1iu.apps.googleusercontent.com', // Enter your google_client_id here
      facebook_app_id: '779204449266915', // Enter your facebook_app_id here   
    };


    return (
      <>
        {!this.state.isLoggedIn &&
          <div >
            <p onClick={this.handleShow}>Login</p>
            <Modal show={this.state.show} onHide={() => this.handleClose()}>

              {this.state.load &&
                <MyLoader></MyLoader>
              }
              <LoginNav onChangeState={this.changeState}></LoginNav>

              {formComponent}
              <hr class="hr-text" data-content="Oppure"></hr>
              <Federated federated={federatedL} onStateChange={(data) => this.onStateChange(data)} />
              <Button onClick={this.handleClose}>Close</Button>
            </Modal>
          </div >
        }{
          this.state.isLoggedIn &&
          <div>
            <p onClick={() => window.location.href = '/profile'}>Benvenuto {this.state.userLogged.username} </p>
          </div>
        }
      </>
    )
  }
}

export default LoginPage;