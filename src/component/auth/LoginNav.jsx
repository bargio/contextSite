import React from 'react'
import { Nav } from 'react-bootstrap';
export class LoginNav extends React.Component {

    constructor(props) {
        super(props)
        this.state = { 
            selectedStyle : {fontWeight:"bold",color:"#000000"},
            unselectedStyle: {backgroundColor:"#f1f1f1",color:"#000000"},
            login: {fontWeight:"bold",color:"#000000"},
            register: {backgroundColor:"#f1f1f1",color:"#000000"},
        }
    }

    handleNavClick = (navItem)=>{
        console.log(navItem)
        const selectedStyle = {fontWeight:"bold"}
        const unselectedStyle = {backgroundColor:"#f1f1f1"}
        if(navItem=="login"){
            this.setState({login:this.state.selectedStyle,register:this.state.unselectedStyle})
            this.props.onChangeState("login")
        }else{
            this.setState({login:this.state.unselectedStyle,register:this.state.selectedStyle}) 
            this.props.onChangeState("register")
        }
    }

    render() {
        return (<Nav fill variant="tabs" defaultActiveKey="login" className="flex-row">
            <Nav.Item>
                <Nav.Link style={this.state.login} onSelect={(eventKey) =>this.handleNavClick(eventKey)} eventKey="login">Login</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link style={this.state.register} onSelect={(eventKey) =>this.handleNavClick(eventKey)} eventKey="register">Registrati</Nav.Link>
            </Nav.Item>
        </Nav>);
    }
}