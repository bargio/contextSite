import React from 'react';
import { Select, MenuItem, InputLabel, Grid, Link } from '@material-ui/core';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { Button } from 'react-bootstrap';
import ControlPoint from '@material-ui/icons/ControlPoint';


export class AtlanteChooseAnimalCategory extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            categoryValue: 'Bovini',
            macroAreaValue:'Zootecnia',
            listMacroArea:['Zootecnia', 'Altri'],
            listCategory: ['Bovini','Suini','Ovini','Avicoli']
        }
    }

    handleChangeCategory = (event) => {
        this.setState({ categoryValue: event.target.value })
    }

    handleChangeMacroArea = (event) => {
        this.setState({ macroAreaValue: event.target.value })
    }

    getCategory=()=>{
        return this.state.categoryValue
    }

    render() {
        var centerStyle = { display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }

        return (<Grid container justify="center" spacing={2} style={centerStyle}>
            <Grid item xs={12} sm={12} md={12} large={12} xl={12} zeroMinWidth style={centerStyle}>
                <FormControl>
                    <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                        Macro Area
            </InputLabel>
                    <Select
                        native
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={this.state.macroAreaValue}
                        onChange={this.handleChangeMacroArea}
                    >
                        {this.state.listMacroArea.map((value, i) => {
                            return <option value={i}>{value}</option>
                        })}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={12} large={12} xl={12} zeroMinWidth style={centerStyle}>
                <FormControl>

                    <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                        Categoria
                    </InputLabel>

                    <Select
                        native
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={this.state.categoryValue}
                        onChange={this.handleChangeCategory}
                    >
                        {this.state.listCategory.map((value, i) => {
                            return <option value={i}>{value}</option>
                        })}
                    </Select>
                </FormControl>
            </Grid>
        </Grid>)
    }
}