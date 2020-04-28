import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import PublicIcon from '@material-ui/icons/Public';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import ProfileUser from '../user/ProfileUser';
import { LoginManager } from '../manager/loginManager';
import LoginPage from '../auth/LoginPage';
import { Image, Badge } from 'react-bootstrap';
import { Auth } from 'aws-amplify';
import login from '../../asset/login.svg';
import profileImage from '../../asset/icon1.png';
import profileQuiz from '../../asset/icon2.png';
import profileAtlante from '../../asset/icon3.png';
import getRandomImage from '../utils/Images';
import PersonIcon from '@material-ui/icons/Person';

export class MyDrawer extends React.Component {


  constructor(props) {
    super(props)
    this.state = {
      show: false,
      username: undefined,
      showLogin: false,
      src: getRandomImage(),
    }
  }

  toggleDrawer = () => {
    this.setState({ show: !this.state.show })
  }

  onClickHanlder = (value) => {
    window.location.href = value
  }

  componentDidMount() {
    console.log(this)
    ProfileUser.getProfile(this.profileHandler)
  }

  profileHandler = (user) => {
    if (user.error != undefined) {
      console.log("setUser")
      this.setState({ username: user.username })
    }
  }

  loginButtonHandler = () => {
    console.log("loginButtonHandler")
    this.toggleDrawer()
    window.profilecomponent.handleShow()
  }

  handleLogout = () => {
    console.log("Logout")
    Auth.signOut()
      .then(data => console.log(data))
      .catch(err => console.log(err));
    window.location.href = ('/')
  }

  render() {
    const principalButton = (<List>
      <ListItem onClick={() => this.onClickHanlder("/")} button key={"Home"}>
        <ListItemIcon><HomeIcon /></ListItemIcon>
        <ListItemText primary={"Home"} />
      </ListItem>
      <ListItem onClick={() => this.onClickHanlder("/quiz")} button key={"Quiz"}>
        <ListItemIcon><LiveHelpIcon /></ListItemIcon>
        <ListItemText primary={"Quiz"} />
      </ListItem>
      <ListItem onClick={() => this.onClickHanlder("/atlantehome")} button key={"Atlante"}>
        <ListItemIcon><PublicIcon /></ListItemIcon>
        <ListItemText primary={"Atlante"} />
      </ListItem>
      <ListItem button key={"Foto"}>
        <ListItemIcon><PhotoCameraIcon /></ListItemIcon>
        <ListItemText primary={"Foto"} />
      </ListItem>
      <ListItem button key={"Contattaci"}>
        <ListItemIcon><ContactMailIcon /></ListItemIcon>
        <ListItemText primary={"Contattaci"} />
      </ListItem>
    </List>)
    const profileButtons = (
      <List>
        <ListItem onClick={() => this.onClickHanlder("/profile")} button key={"Home"}>
          <ListItemIcon><PersonIcon /></ListItemIcon>
          <ListItemText primary={"I tuoi quiz"} />
        </ListItem>
        <ListItem onClick={() => this.onClickHanlder("/profile")} button key={"Home"}>
          <ListItemIcon><PersonIcon /></ListItemIcon>
          <ListItemText primary={"Le tue foto"} />
        </ListItem>
        <ListItem onClick={() => this.onClickHanlder("/profile")} button key={"Home"}>
          <ListItemIcon><PersonIcon /></ListItemIcon>
          <ListItemText primary={"Il tuo atlante"} />
        </ListItem>
      </List>)
    const sideList = (
      <div
        style={{ width: '250' }}
        role="presentation"
        onKeyDown={this.toggleDrawer}
      >
        {ProfileUser.profile.isValid() &&
          <List style={{ padding: '10%' }}  >
            <ListItem onClick={() => window.location.href = '/profile'}><Image style={{ maxWidth: '100px' }} src={this.state.src} roundedCircle fluid /></ListItem>
            <ListItemText onClick={() => window.location.href = '/profile'}
              style={{ width: '100%', textAlign: 'center' }}
              primary={ProfileUser.profile.username}
              secondary={ProfileUser.profile.email}
            />
            <ListItem >
              <Badge style={{ width: '100%' }} variant="danger" pill onClick={this.handleLogout}>Logout</Badge>
            </ListItem>
          </List>
        }
        {!ProfileUser.profile.isValid() &&
          <List style={{ padding: '10%' }}>
            <ListItem ><Image style={{ maxWidth: '100px' }} src={login} roundedCircle fluid /></ListItem>
            <ListItem >
              <Button style={{ width: '100%' }} onClick={() => this.loginButtonHandler()}>Login</Button>
            </ListItem>
          </List>
        }
        <Divider />
        <List>
          {principalButton}
        </List>
        <Divider />
        {ProfileUser.profile.isValid() && 
          <List>
            {profileButtons}
          </List>
       }
      </div>
    );
    return (
      <div>
        <MenuIcon onClick={this.toggleDrawer} />
        <Drawer anchor="right" open={this.state.show} onClose={this.toggleDrawer}>
          {sideList}
        </Drawer>
      </div>
    );
  }
}