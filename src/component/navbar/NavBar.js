import React from 'react';
import image from '../../asset/logo.jpg'
import './NavBar.css';
import { LoginManager } from '../manager/loginManager';
import { Nav, Navbar, Button, Alert, Toast } from 'react-bootstrap';
import { Dialog, DialogContent } from '@material-ui/core';


class NavBar extends React.Component {
    constructor(props) {
        super(props);
        window.errorcomponent = this
        this.state = {
            scrolling: false,
            alert: { showMessageAlert: false, textMessageAlert: "", typeAlert: "danger", onClick: "" }
        };
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll(event) {
        if (window.scrollY === 0 && this.state.scrolling === true) {
            this.setState({ scrolling: false });
        } else if (window.scrollY !== 0 && this.state.scrolling !== true) {
            this.setState({ scrolling: true });
        }
    }

    showMessage = (text, typeMessage, typeError) => {
        this.setState({ alert: { showMessageAlert: true, textMessageAlert: text, typeAlert: typeMessage, onClick: typeError } })
    }

    executeMethodAlert = () => {
        console.log("Execute method alert")
        console.log(window.profilecomponent)
        if (this.state.alert.onClick == "login") {
            this.setState({ alert: { showMessageAlert: false } })
            window.profilecomponent.handleShow()
        } else if(this.state.alert.onClick!=undefined){
            this.state.alert.onClick()
        }
    }

    render() {
        return (
            <Navbar collapseOnSelect className="navbar" expand="lg" fixed="top" style={{ position: this.state.scrolling ? 'fixed' : 'relative', top: 0, width: '100%', zIndex: 1 }} className="flex-column">
                {this.state.alert.showMessageAlert &&
                    <Dialog open={true}
                        style={{ backgroundColor: 'transparent' }}
                        onClick={() => this.executeMethodAlert()}
                    >
                        <DialogContent>
                            <Alert dismissible variant={this.state.alert.typeAlert} isOpen={true} onClose={() => this.setState({ alert: { showMessageAlert: false } })}>
                                {this.state.alert.textMessageAlert}
                            </Alert>
                        </DialogContent>
                    </Dialog>
                }
                <Navbar collapseOnSelect className="navbar" expand="lg" fixed="top" style={{ position: this.state.scrolling ? 'fixed' : 'relative', top: 0, width: '100%', zIndex: 1 }}>
                    <Navbar.Brand href="/">
                        <img
                            alt=""
                            src={image}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        SiteName
                </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ml-auto" >
                            <Nav.Item>
                                <Nav.Link href="/">Home</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/quiz">Quiz</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/profile">Contattaci</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link><LoginManager /></Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Navbar>
        );
    }
}

/*
      <Nav className="ml-auto" >
                            <Nav.Item>
                                <Nav.Link href="/">Home</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/contesthome">Contest</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/atlantehome">Atlante</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/quiz">Quiz</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/">Contattaci</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link><LoginManager /></Nav.Link>
                            </Nav.Item>
                        </Nav>
*/
export default NavBar;
