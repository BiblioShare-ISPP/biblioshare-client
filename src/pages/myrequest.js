import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

import Request from '../components/Request';
import Profile from '../components/Profile';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import InfoIcon from '@material-ui/icons/Info';
import WarningOutlinedIcon from '@material-ui/icons/WarningOutlined';
//Redux
import {connect} from 'react-redux';


class request extends Component {
    
    render() {        
        const requests = this.props.user.requests;
        const authenticated= this.props.user.authenticated;
        let recentRequestsMarkup = authenticated  ? ( requests[0]  ?(
            requests.map((request) => 
                <Request key={request.bookId} request={request}/>)) : 
                <Card >
                <CardContent >
                     <Typography variant="h5" color="textPrimary" component="h2" ><InfoIcon />Information</Typography>
                    <Typography variant="h5" color="textSecondary" component="h5">You don´t  have request to any book</Typography>
            
                </CardContent>
            </Card >) :
                <Card >
                <CardContent >
                     <Typography variant="h5" color="textPrimary" component="h2" ><WarningOutlinedIcon />Warning</Typography>
                    <Typography variant="h5" color="textSecondary" component="h5">Authorization required</Typography>
            
                </CardContent>
            </Card >;

       

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

request.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    
};


const mapStateToProps = state => ({
   
    user: state.user,
   
});



export default connect(mapStateToProps)(request);
