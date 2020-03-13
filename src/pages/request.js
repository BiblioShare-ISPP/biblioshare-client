import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

import CircularProgress from '@material-ui/core/CircularProgress';
import {Alert, AlertTitle } from '@material-ui/lab';
import PropTypes from 'prop-types';
import Request from '../components/Request';
import Profile from '../components/Profile';
//Redux

import {connect} from 'react-redux';
import {getRequestsByUser, acceptedRequest, rejectedRequest} from '../redux/actions/requestAction';

class request extends Component {
    
    componentDidMount(){
        const handle = this.props.match.params.handle;
        this.props.getRequestsByUser(handle);
    }

    

    
    render() {
        const styles = {
            progress: {
                margin: '20% 50%',
            }
        };

        const  {requests, loading }= this.props.requests;
        const user = this.props.user.authenticated;
        const handle = this.props.handle;
        let bookOwner;
        if (requests !== undefined && requests.length > 0){
            bookOwner = requests[0].bookOwner;
            
        }else{
            bookOwner = null;
        }
        let recentRequestsMarkup = user  ?  (loading ? ( requests.length > 0 && handle === bookOwner? (
            requests.map((request) => 
                <Request key={request.requestId} request={request}/>)): 
                <Alert variant="outlined" severity="success"><AlertTitle>Information</AlertTitle>There aren´t  request for you</Alert>):
                <CircularProgress style={styles.progress} />):
                (window.location.href = "/login");

       

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
    getRequestsByUser: PropTypes.func.isRequired,
    acceptedRequest: PropTypes.func.isRequired,
    rejectedRequest: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
   

};

const mapStateToProps = state => ({
    requests: state.request,
    user: state.user,
    handle: state.user.credentials.handle
});

const mapActionsToProps = {
    acceptedRequest,
    rejectedRequest,
    getRequestsByUser
}

export default connect(mapStateToProps, mapActionsToProps)(request);
