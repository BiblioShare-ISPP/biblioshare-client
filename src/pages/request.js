import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import Request from '../components/Request';
import Profile from '../components/Profile';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import InfoIcon from '@material-ui/icons/Info';
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
        let recentRequestsMarkup = user  ? (!loading ? (<CircularProgress style={styles.progress} />): (requests!== undefined && requests.length > 0 && handle === bookOwner? (
            requests.map((request) => 
                
                <Request key={request.requestId} request={request}/>)): 
                <Card >
                <CardContent >
                     <Typography variant="h5" color="textPrimary" component="h2" ><InfoIcon />Information</Typography>
                    <Typography variant="h5" color="textSecondary" component="h5">There aren´t any request for you</Typography>
            
                </CardContent>
            </Card >)):
                
                
    
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
