import React from 'react'
import { Paper, Grid, Breadcrumbs, Link, Button } from '@material-ui/core'
import { Image } from 'react-bootstrap'
import zootecniaPng from '../../asset/atlante/Zootecnia.png';
import boviniPng from '../../asset/atlante/bovini.jpg';
import suiniPng from '../../asset/atlante/suini.jpg';
import oviniPng from '../../asset/atlante/ovini.jpg';

export class AtlanteHomePage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            breadcrumbs: [],
            FIST_BREADCRUMBS: 0,
            SECOND_BREADCRUMBS: 1,
            isClickedOnFirst: false,
            isClickedOnSecond: false
        }
    }

    handleClickedOnFirst = (value) => {
        this.handleUpdateBreadcrumbs(value, this.state.FIST_BREADCRUMBS)
    }

    handleClickedOnSecond = (value) => {
        this.handleUpdateBreadcrumbs(value, this.state.SECOND_BREADCRUMBS)
    }

    handleUpdateBreadcrumbs = (value, n) => {
        var tempBreadcrumbs = this.state.breadcrumbs
        tempBreadcrumbs.push(value)
        switch (n) {
            case this.state.FIST_BREADCRUMBS:
                this.setState({ breadcrumbs: tempBreadcrumbs, isClickedOnFirst: true })
                break;
            case this.state.SECOND_BREADCRUMBS:
                this.setState({ breadcrumbs: tempBreadcrumbs, isClickedOnSecond: true })
                break;
        }
    }

    handleClickBreadcrumbs = (n) => {
        console.log(n)
        switch (n) {
            case this.state.FIST_BREADCRUMBS:
                this.setState({ breadcrumbs: [], isClickedOnFirst: false, isClickedOnSecond:false })
                break;
            case this.state.SECOND_BREADCRUMBS:
                var tempBreadcrumbs = this.state.breadcrumbs;
                tempBreadcrumbs.pop()
                console.log(tempBreadcrumbs)
                this.setState({ breadcrumbs: tempBreadcrumbs, isClickedOnSecond: false })
                break;
        }
    }

    render() {
        const paperStyle = { display: 'flex', justifyContent: 'center', alignItems: 'center', maxHeight: '300px' };
        const firstBreadcrumbs = <>
            <Grid item xs={12} sm={12} md={6} large={6} xl={6} zeroMinWidth style={{ width: '100%', margin: 0 }} >
                <Paper style={paperStyle} onClick={() => this.handleClickedOnFirst("Zootecnia")}><Image style={paperStyle} rounded src={zootecniaPng} /></Paper>
            </Grid>
            <Grid item xs={12} sm={12} md={6} large={6} xl={6} zeroMinWidth style={{ width: '100%', margin: 0 }} >
                <Paper style={paperStyle} onClick={() => this.handleClickedOnFirst("Altro")}><Image style={paperStyle} rounded src='https://upload.wikimedia.org/wikipedia/commons/2/25/S%C3%ADmbolo_Zootecnia_%28Animal_Science%29.jpg' /></Paper>
            </Grid>
        </>

        const secondBreadcrumbs = <>
            <Grid item xs={12} sm={12} md={6} large={6} xl={6} zeroMinWidth style={{ width: '100%', margin: 0 }} >
                <Paper style={paperStyle} onClick={() => this.handleClickedOnSecond("Bovini")}>
                    <Image style={paperStyle} rounded src={boviniPng} />
                </Paper>
            </Grid>
            <Grid item xs={12} sm={12} md={6} large={6} xl={6} zeroMinWidth style={{ width: '100%', margin: 0 }} >
                <Paper style={paperStyle} onClick={() => this.handleClickedOnSecond("Suini")}>
                    <Image style={paperStyle} rounded src={suiniPng} />
                </Paper>
            </Grid>
            <Grid item xs={12} sm={12} md={6} large={6} xl={6} zeroMinWidth style={{ width: '100%', margin: 0 }} >
                <Paper style={paperStyle} onClick={() => this.handleClickedOnSecond("Ovini")}>
                    <Image style={paperStyle} rounded src={oviniPng} />
                </Paper>
            </Grid>
        </>

        return (
            <Grid container justify="center" spacing={2} style={{ paddingTop: '5%' }}>
                <Grid item xs={12} sm={12} md={12} large={12} xl={12} zeroMinWidth style={{ width: '100%' }} >
                    <Breadcrumbs separator="›" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {this.state.breadcrumbs.map((value, i) => {
                            return <Button key={i} onClick={() => this.handleClickBreadcrumbs(i)}>{value}</Button>
                        })}
                    </Breadcrumbs>
                </Grid>

                {!this.state.isClickedOnFirst &&
                    firstBreadcrumbs
                }
                {this.state.isClickedOnFirst && !this.state.isClickedOnSecond &&
                    secondBreadcrumbs
                }

            </Grid>)
    }
}