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


export class MyDrawer extends React.Component{


    constructor(props){
        super(props)
        this.state={
            show:false
        }
    }

    toggleDrawer=()=>{
        this.setState({show:!this.state.show})
    }

    render() {
        const sideList = (
            <div
            style={{width:'250'}}
              role="presentation"
              onClick={this.toggleDrawer}
              onKeyDown={this.toggleDrawer}
            >
              <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                  <ListItem button key={text}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
              </List>
              <Divider />
              <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                  <ListItem button key={text}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
              </List>
            </div>
          );
          return (
            <div>
              <Button onClick={this.toggleDrawer}>Open Left</Button>
              <Drawer anchor="right" open={this.state.show} onClose={this.toggleDrawer}>
                {sideList}
              </Drawer>
            </div>
          );
    }
}