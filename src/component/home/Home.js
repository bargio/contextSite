import React from 'react';

import backgroung_image from '../../asset/home_background.png';
import growup_image from '../../asset/home_growup.png';
import './Home.css';

export class Home extends React.Component {

    render() {
        return (
            <div>
                <div class="container-fluid">
                    <p class="home-text">
                        <h1> Home </h1>
                        <h2> Dettagli</h2>
                    </p>
                    <img class="bg-sun-image imgwithborder" src={backgroung_image}></img>
                    <p class="home-text">
                        <h1> Home </h1>
                        <h2> Dettagli</h2>
                    </p>
                </div>
                <img class="bg-grow-image imgwithborder" src={growup_image}></img>
            </div>);
    }
}