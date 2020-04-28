import React from 'react'
import { Paper, Grid, Breadcrumbs, Link, Button } from '@material-ui/core'
import { Image } from 'react-bootstrap'
import zootecniaPng from '../../asset/atlante/Zootecnia.png';
import agricolturaJpg from '../../asset/atlante/Agricoltura.jpg';
import boviniPng from '../../asset/atlante/bovini.jpg';
import suiniPng from '../../asset/atlante/suini.jpg';
import oviniPng from '../../asset/atlante/ovini.jpg';
import { AtlanteResources } from '../resource/Api';
import { TipologyList } from './lists/TipologyList';

export class AtlanteHomePage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            breadcrumbs: ['Home'],
            ZOOTECNIA_FILTER: 'Zootecnia',
            AGRICOLTURA_FILTER: 'Agricoltura',
            BOVINI_FILTER: 'Bovini',
            OVINI_FILTER: 'Ovini',
            SUINI_FILTER: 'Suini',
            listToShow: null
        }
    }

    handleUpdateBreadcrumbs = (value) => {
        var tempBreadcrumbs = this.state.breadcrumbs
        tempBreadcrumbs.push(value)
        switch (value) {
            case this.state.BOVINI_FILTER:
            case this.state.OVINI_FILTER:
            case this.state.SUINI_FILTER:
                this.getListByCategory(value)
                break;
        }
        this.setState({ breadcrumbs: tempBreadcrumbs })
    }

    getListByCategory = (category) => {
        AtlanteResources.getByCategory(category).then(value => {
            this.setState({ listToShow: value.data.getByCategory.items })
        })
    }

    handleAddElement = () => {
        window.location.href = '/atlante/creator'
    }

    handleClickBreadcrumbs = (n) => {
        console.log(n)
        switch (n) {
            case 0:
                this.setState({ breadcrumbs: ['Home'] })
                break;
            case 1:
                var tempBreadcrumbs = this.state.breadcrumbs;
                tempBreadcrumbs.pop()
                console.log(tempBreadcrumbs)
                this.setState({ breadcrumbs: tempBreadcrumbs })
                break;
        }
    }

    render() {
        const paperStyle = { display: 'flex', justifyContent: 'center', alignItems: 'center', maxHeight: '300px' };
        const firstBreadcrumbs = <>
            <Grid item xs={12} sm={12} md={6} large={6} xl={6} zeroMinWidth style={{ width: '100%', margin: 0 }} >
                <Paper style={paperStyle} onClick={() => this.handleUpdateBreadcrumbs(this.state.ZOOTECNIA_FILTER)}><Image style={paperStyle} rounded src={zootecniaPng} /></Paper>
            </Grid>
            <Grid item xs={12} sm={12} md={6} large={6} xl={6} zeroMinWidth style={{ width: '100%', margin: 0 }} >
                <Paper style={paperStyle} onClick={() => this.handleUpdateBreadcrumbs(this.state.AGRICOLTURA_FILTER)}><Image style={paperStyle} rounded src={agricolturaJpg} /></Paper>
            </Grid>
            <Grid item xs={12} sm={12} md={12} large={12} xl={12} zeroMinWidth style={{ width: '100%', margin: 0 }} >
                <Paper style={paperStyle} onClick={() => this.handleAddElement()}>
                    <h1 width='100%'>Aggiungi</h1>
                </Paper>
            </Grid>
        </>

        const zootecniaBreadcrumbs = <>
            <Grid item xs={12} sm={12} md={6} large={6} xl={6} zeroMinWidth style={{ width: '100%', margin: 0 }} >
                <Paper style={paperStyle} onClick={() => this.handleUpdateBreadcrumbs(this.state.BOVINI_FILTER)}>
                    <Image style={paperStyle} rounded src={boviniPng} />
                </Paper>
            </Grid>
            <Grid item xs={12} sm={12} md={6} large={6} xl={6} zeroMinWidth style={{ width: '100%', margin: 0 }} >
                <Paper style={paperStyle} onClick={() => this.handleUpdateBreadcrumbs(this.state.SUINI_FILTER)}>
                    <Image style={paperStyle} rounded src={suiniPng} />
                </Paper>
            </Grid>
            <Grid item xs={12} sm={12} md={6} large={6} xl={6} zeroMinWidth style={{ width: '100%', margin: 0 }} >
                <Paper style={paperStyle} onClick={() => this.handleUpdateBreadcrumbs(this.state.OVINI_FILTER)}>
                    <Image style={paperStyle} rounded src={oviniPng} />
                </Paper>
            </Grid>
        </>

        return (
            <Grid container justify="center" spacing={2} style={{ paddingTop: '5%' }}>
                <Grid item xs={12} sm={12} md={12} large={12} xl={12} zeroMinWidth style={{ width: '100%' }} >
                    <Breadcrumbs separator="›" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {this.state.breadcrumbs.map((value, i) => {
                            console.log(this.state.breadcrumbs.length)
                            var disabledValue = this.state.breadcrumbs.length - 1 == i
                            return <Button key={i} disabled={disabledValue} onClick={() => this.handleClickBreadcrumbs(i)}>{value}</Button>
                        })}
                    </Breadcrumbs>
                </Grid>

                {this.state.breadcrumbs.length == 1 &&
                    firstBreadcrumbs
                }
                {this.state.breadcrumbs.length == 2 && this.state.breadcrumbs.includes(this.state.ZOOTECNIA_FILTER) &&
                    zootecniaBreadcrumbs
                }
                {this.state.breadcrumbs.length == 2 && this.state.breadcrumbs.includes(this.state.AGRICOLTURA_FILTER) &&
                    <div>Niente</div>
                }
                {this.state.breadcrumbs.length == 3 && this.state.listToShow != null &&
                    <TipologyList items={this.state.listToShow} onChange={this.onChange}></TipologyList>
                }
                
            </Grid>)
    }
}