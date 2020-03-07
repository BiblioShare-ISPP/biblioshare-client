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
       let handle = this.props.user.credentials.handle;
       this.props.getRequestsByUser(handle);
    };
    
    render() {
        const styles = {
            progress: {
                margin: '20% 50%',
            }
        };

        const  {requests }= this.props.data;
        
        const user = this.props.user.authenticated;
        const loading  = this.props.data1;
        let recentRequestsMarkup =  user? ( loading ? (
            requests.map((request) => 
                <Request key={request.requestId} request={request}/>)
        ) : (<CircularProgress style={styles.progress} />)) :
        (
          window.location.href = "/login"
        );
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
    data: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
   

};

const mapStateToProps = state => ({
    data: state.request,
    user: state.user,
    data1: state.data
});

const mapActionsToProps = {
    acceptedRequest,
    rejectedRequest,
    getRequestsByUser
}

export default connect(mapStateToProps, mapActionsToProps)(request);
