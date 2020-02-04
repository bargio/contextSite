import React from 'react';
import mobiscroll from '../../card/mobiscroll.react.min.js';
import "../../card/mobiscroll.react.min.css";
import { AppItem } from '../../card/AppItem';
import { Grid, List, ListItem } from '@material-ui/core';
import ReactList from 'react-list';
import { ImgMediaCard } from '../../card/Card.js';
import SearchInput, { createFilter } from 'react-search-input'
import './TipologyList.css'

export class TipologyList extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            filtered: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleScroll = this.handleScroll.bind(this);

    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        this.setState({
            filtered: this.props.items
        });
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            filtered: nextProps.items
        });
    }

    handleChange(e) {
        // Variable to hold the original version of the list
        let currentList = [];
        // Variable to hold the filtered list before putting into state
        let newList = [];
        console.log(e)
        // If the search bar isn't empty
        if (e !== "") {
            // Assign the original list to currentList
            currentList = this.props.items;

            // Use .filter() to determine which items should be displayed
            // based on the search terms
            newList = currentList.filter(item => {
                // change current item to lowercase
                // change search term to lowercase
                const filter = e.toLowerCase();
                // check to see if the current list item includes the search term
                // If it does, it will be added to newList. Using lowercase eliminates
                // issues with capitalization in search terms and search content
                return item.name.toLowerCase().includes(filter);
            });
            console.log(newList);
        } else {
            // If the search bar is empty, set newList to original task list
            newList = this.props.items;
        }
        // Set the filtered state based on what our rules added to newList
        this.setState({
            filtered: newList
        });
    }





    handleScroll(event) {
        if (window.scrollY === 0 && this.state.scrolling === true) {
            this.setState({ scrolling: false });
        } else if (window.scrollY !== 0 && this.state.scrolling !== true) {
            this.setState({ scrolling: true });
        }
    }

    render() {

        return (
            <Grid
                container
                style={{ marginLeft: '20px', marginRight: '20px' }}
                justify='center'
            >

                <div className="searchDiv" style={{ position: this.state.scrolling ? 'fixed' : 'relative', top:'3%',left: '30%', zIndex: 1, width: '100%' }}>
                    <SearchInput style={{ width: '30%', borderRadius: '20px' }} className="search-input " onChange={this.handleChange} placeholder="Search..." />
                </div>

                <Grid container justify="center" spacing={2} style={{ paddingTop: '2%' }}>

                    {this.state.filtered.map(function (app) {
                        return (
                            <Grid item xs={6} sm={4} md={3} large={2} xl={2} zeroMinWidth >
                                <ImgMediaCard app={app} needDetails={false} ></ImgMediaCard>
                            </Grid>
                        )
                    })}
                </Grid>
            </Grid>

        )
    }
}