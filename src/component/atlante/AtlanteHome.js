import React from 'react';
import backgroung_image from '../../asset/atlante_background.png';
import { MDBCol, MDBIcon } from 'mdbreact';
import "./AtlanteHome.css";
import SearchPage from "./SearchPage";
import { BaseCard } from './BaseCard';
import { Container, Button } from 'react-bootstrap';
import { Parallax, ParallaxLayer } from 'react-spring/renderprops-addons'
import { Grid, Divider } from '@material-ui/core';
import { ImgMediaCard } from '../card/Card';
import { FormRow } from 'react-bootstrap/Form';
import CardItem from '../card/CardItem';
import mobiscroll from '../card/mobiscroll.react.min.js';
import "../card/mobiscroll.react.min.css";
import { AppItem } from '../card/AppItem';
import HorizontalScroll from 'react-scroll-horizontal'
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ImagePicker from 'react-image-picker'
import { TipologyList } from './lists/TipologyList';


export class AtlanteHome extends React.Component {

    onItemTap = (event, inst) => {
        console.log(event.target.id);
    }

    constructor(props) {
        super(props)
        this.state = {
            image: null,
            onChange:null
        }
        this.onPick = this.onPick.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    onPick(image) {
        this.setState({ image })
    }
    onChange(e){
        this.setState({e})
    }

    render() {
        const useStyles = makeStyles(theme => ({
            root: {
                display: 'flex',
                justifyContent: 'space-around',
                overflow: 'hidden',
                backgroundColor: theme.palette.background.paper,
            },
            gridList: {
                flexWrap: 'nowrap',
                // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
                transform: 'translateZ(0)',
            },
        }));
        return (

            <Grid
                container
                justify="space-around"
                alignItems="center"
            >
                <TipologyList items={this.props.birds.concat(this.props.animals)} onChange={this.onChange}></TipologyList>
            </Grid>
        );
    }
    static defaultProps = {
        birds: [{
            id: 1,
            img: 'https://lh3.googleusercontent.com/proxy/LPHLy6WDQvIXeE-pDvebGh03M6ezRGhFY68P1_OZeOe3u7_N3vrLY7egVtYnmsLiTU-SVJ1rLnmCclHl_nFNEkhQkt514CQ',
            name: 'Altsteirer - Vecchia Stiria Nana'
        }, {
            id: 2,
            img: 'https://img.mobiscroll.com/demos/gridlayout/kingfisher.jpg',
            name: 'Kingfisher'
        }, {
            id: 3,
            img: 'https://img.mobiscroll.com/demos/gridlayout/swift.jpg',
            name: 'Swift'
        }, {
            id: 4,
            img: 'https://img.mobiscroll.com/demos/gridlayout/humming.jpg',
            name: 'Humming bird'
        }, {
            id: 5,
            img: 'https://img.mobiscroll.com/demos/gridlayout/columbidae.jpg',
            name: 'Columbidae'
        }, {
            id: 6,
            img: 'https://img.mobiscroll.com/demos/gridlayout/hornbill.jpg',
            name: 'Hornbill'
        }, {
            id: 7,
            img: 'https://img.mobiscroll.com/demos/gridlayout/spoonbill.jpg',
            name: 'Spoonbill'
        }, {
            id: 8,
            img: 'https://img.mobiscroll.com/demos/gridlayout/bee-eater.jpg',
            name: 'Bee-eater'
        }, {
            id: 9,
            img: 'https://img.mobiscroll.com/demos/gridlayout/parrot.jpg',
            name: 'Parrot'
        }, {
            id: 10,
            img: 'https://img.mobiscroll.com/demos/gridlayout/goose.jpg',
            name: 'Goose bird'
        }, {
            id: 11,
            img: 'https://img.mobiscroll.com/demos/gridlayout/woodpecker.jpg',
            name: 'Woodpecker'
        }, {
            id: 12,
            img: 'https://img.mobiscroll.com/demos/gridlayout/penguin.jpg',
            name: 'Penguin'
        }],
        animals: [{
            id: 1,
            img: 'https://img.mobiscroll.com/demos/gridlayout/okapi.jpg',
            name: 'Okapi',
            about: 'The okapi is an animal native to the Democratic Republic of Congo in Africa.'
        }, {
            id: 2,
            img: 'https://img.mobiscroll.com/demos/gridlayout/dragon.jpg',
            name: 'The Blue Dragon',
            about: 'These little dragon-like creatures can be found in the Indian Pacific Oceans.'
        }, {
            id: 3,
            img: 'https://img.mobiscroll.com/demos/gridlayout/wolf.jpg',
            name: 'The Maned Wolf',
            about: 'The maned wolf is often found in south, CW, and SE parts of Brazil.'
        }, {
            id: 4,
            img: 'https://img.mobiscroll.com/demos/gridlayout/fossa.jpg',
            name: 'Fossa',
            about: 'A carnivorous animal located in Madagascar related to the Mongoose.'
        }, {
            id: 5,
            img: 'https://img.mobiscroll.com/demos/gridlayout/shark.jpg',
            name: 'Goblin Shark',
            about: 'Last representative of sharks that lived about 125 million years ago.'
        }, {
            id: 6,
            img: 'https://img.mobiscroll.com/demos/gridlayout/deer.jpg',
            name: 'Leaf Deer',
            about: 'The leaf deer is usually found in dense forests in the NW of Putao.'
        }, {
            id: 7,
            img: 'https://img.mobiscroll.com/demos/gridlayout/spidercrab.jpg',
            name: 'Japanese Spider Crab',
            about: 'As the name suggestions, it inhabits the waters surrounding Japan.'
        }, {
            id: 8,
            img: 'https://img.mobiscroll.com/demos/gridlayout/rabbit.jpg',
            name: 'Angora Rabbit',
            about: 'These rabbits originated in Turkey but managed to spread throughout Europe.'
        }, {
            id: 9,
            img: 'https://img.mobiscroll.com/demos/gridlayout/axolotl.jpg',
            name: 'Axolotl',
            about: 'The "Mexican salamander" is often spotted in lakes around Mexico.'
        }, {
            id: 10,
            img: 'https://img.mobiscroll.com/demos/gridlayout/liger.jpg',
            name: 'Liger',
            about: 'The liger is a real animal created by a lion and a tiger mating.'
        }, {
            id: 11,
            img: 'https://img.mobiscroll.com/demos/gridlayout/panda.jpg',
            name: 'Red Panda',
            about: 'This cute, small panda lives in the eastern Himalayas and SW China.'
        }, {
            id: 12,
            img: 'https://img.mobiscroll.com/demos/gridlayout/superbird.jpg',
            name: 'Superbird',
            about: 'Found in New Guinea, it is unsure how many of these birds there are.'
        }]
    };
}