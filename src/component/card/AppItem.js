import React from 'react';
import mobiscroll from './mobiscroll.react.min.js';

export class AppItem extends React.Component {


    render = () => {
        const app = this.props.app;
        return (
                <mobiscroll.Card 
                style={{ width: '4%' }}>
                    <img resizeMode="cover" alt="Img" src={app.img} draggable="false" onClick={console.log("ciao")}/>
                    <mobiscroll.CardContent>{app.name}</mobiscroll.CardContent>
                </mobiscroll.Card>
        );
    }
}

