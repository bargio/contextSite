import React from 'react';
import image from '../../asset/logo.jpg';
import './UserNavBarProfile.css'
import { Dropdown, ButtonToolbar, DropdownButton, ProgressBar, SplitButton, Overlay, Popover, Button } from 'react-bootstrap';
import { IconButton, Grid, CircularProgress, LinearProgress } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom';


export class UserNavBarProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'test',
            imgProfile: '',
            show: false
        };
        this.ref = React.createRef();
    }


    logOut = () => {
        this.props.onStateChange('logOut', {});
        this.props.handleLogout();
    }

    handleClick = () => {
        let path = `/quiz`;
        let history = useHistory();
        history.push(path);
    }

    goToProfilePage = () =>{
        window.location.href='/profile'
    }

    render() {
        return (
            <ButtonToolbar onClick={event => this.goToProfilePage() } >
                Holy guacamole!
            </ButtonToolbar>
        )
    }
}