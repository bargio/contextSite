import React from 'react';
import { Grid, TextField} from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { Badge } from 'react-bootstrap';

export class AttributeAnimal extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            attributeLabel: null,
            attributeValue: null,
            id: this.props.numElement
        }
    }

    getKey=()=>{
       return this.state.attributeLabel
       
    }
    getValue=()=>{
        return this.state.attributeValue
    }

    render() {
        var centerStyle = { display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }
        return (<Grid container spacing={1} alignItems="flex-end" >
            <Grid item xs={5} sm={5} md={5} large={5} xl={5}>
                <TextField id="input-with-icon-grid"
                    label="Attributo"
                    fullWidth
                    required
                    multiline={true}
                    defaultValue={this.state.attributeLabel}
                    onChange={(e) => { this.setState({ attributeLabel: e.target.value }) }} />
            </Grid>
            <Grid item xs={5} sm={5} md={5} large={5} xl={5}>
                <TextField id="input-with-icon-grid"
                    fullWidth
                    required
                    multiline={true}
                    label="Valore"
                    defaultValue={this.state.attributeValue}
                    onChange={(e) => { this.setState({ attributeValue: e.target.value }) }} />
            </Grid>
            <Grid item xs>
                <Badge pill variant="danger" onClick={() => this.props.deleteMethod(this.state.id)}>Elimina</Badge>
            </Grid>
        </Grid>)
    }
}