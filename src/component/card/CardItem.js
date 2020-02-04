import React from 'react';
import mobiscroll from './mobiscroll.react.min.js';

export class CardItem extends React.Component {
    render = () => {
        const app = this.props.app;
        return (<div className="mbsc-col-12 mbsc-col-sm-6 mbsc-col-lg-4 mbsc-col-xl-3">
            <mobiscroll.Card >
                <img src={app.img} />
                <mobiscroll.CardContent>
                    <div className="mbsc-card-title">{app.name}</div>
                    <p className="mbsc-txt-muted">{app.about}</p>
                </mobiscroll.CardContent>
            </mobiscroll.Card>
        </div>);
    }
}
export default CardItem;