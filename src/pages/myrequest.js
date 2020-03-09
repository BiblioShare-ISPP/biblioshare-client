import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

import CircularProgress from '@material-ui/core/CircularProgress';
import {Alert, AlertTitle } from '@material-ui/lab';
import PropTypes from 'prop-types';
import Request from '../components/Request';
import Profile from '../components/Profile';
import Book from '../components/Book';
//Redux

import {connect} from 'react-redux';

class request extends Component {
    
    render() {
        const styles = {
            progress: {
                margin: '20% 50%',
            }
        };
        
        const  requests= this.props.user.requests;
        const authenticated= this.props.user.authenticated;
        let recentRequestsMarkup = authenticated  ? ( requests.lenght !== 0 ?(
            requests.map((request) => 
                <Request key={request.bookId} request={request}/>)) : <Alert variant="outlined" severity="success"><AlertTitle>Information</AlertTitle>You don´t have request to any book</Alert>) :
                <Alert variant="outlined" severity="warning"><AlertTitle>Information</AlertTitle>Authorization required</Alert>;

       

        return (
            <Grid container spacing={6}>
                
                <Grid item sm={4} xs={12}>
                    <Profile/>
                </Grid>

                <Grid item sm={8} xs={12}>
                    {recentRequestsMarkup}
                   
                </Grid>
               
               
            </Grid>
        )
    }
}



const mapStateToProps = state => ({
   
    user: state.user,
   
});



export default connect(mapStateToProps)(request);
