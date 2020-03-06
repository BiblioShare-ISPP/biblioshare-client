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
       console.log(this.props.user);
        this.props.getRequestsByUser(this.props.user.credentials.handle);
    };
    render() {
        const styles = {
            progress: {
                margin: '20% 50%',
            }
        };

        const { requests, loading} = this.props.data;
        const user = this.props.user;
        let recentRequestsMarkup = loading ? (
            requests.map((request) => 
                <Request key={request.requestId} request={request}/>)
        ) : (<CircularProgress style={styles.progress} />);
        return (
            <Grid container spacing={6}>
                
                <Grid item sm={4} xs={12}>
                    <Profile/>
                </Grid>

                <Grid item sm={8} xs={12}>
                    {recentRequestsMarkup}
                    
                    {requests.length === 0 && user.authenticated === true &&  (<Alert variant="outlined"><AlertTitle>INFORMATION</AlertTitle>There aren´t requests for you</Alert>)}
                    {user.authenticated === false && (<Alert variant="filled"  severity="warning"><AlertTitle>WARNING</AlertTitle>Authentication Required</Alert>)}
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
    classes: PropTypes.object.isRequired

};

const mapStateToProps = state => ({
    data: state.request,
    user: state.user,
});

const mapActionsToProps = {
    acceptedRequest,
    rejectedRequest,
    getRequestsByUser
}

export default connect(mapStateToProps, mapActionsToProps)(request);
