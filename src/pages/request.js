import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { withTranslation } from 'react-i18next';
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
        const { t } = this.props;
        const  {requests, loading }= this.props.requests;
        const user = this.props.user.authenticated;
        const handle = this.props.handle;
        let bookOwner;
        let request;
        if (requests !== undefined && requests.length > 0){
            bookOwner = requests[0].bookOwner;
            request = requests[0]
        }else{
            bookOwner = null;
            request = ''
        }
        let recentRequestsMarkup = user  ? (!loading ? (<CircularProgress style={styles.progress} />): (request && handle === bookOwner? (
            requests.map((request) => 
                
                <Request key={request.requestId} request={request}/>)): 
                <Card >
                <CardContent >
                     <Typography variant="h5" color="textPrimary" component="h2" ><InfoIcon />{t('Information')}</Typography>
                    <Typography variant="h5" color="textSecondary" component="h5">{t('noRequestForYou')}</Typography>
            
                </CardContent>
            </Card >)):
                
                
    
                (window.location.href = "/login");

       

        return (
            <Grid container spacing={6}>
                
                <Grid item sm={4} xs={12}>
                    <Profile/>
                </Grid>

                <Grid item sm={8} xs={12}>
                <Typography variant="h4" color="primary">{t('RequestsReceived')}</Typography>
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

const request1 = withTranslation()(request);
export default connect(mapStateToProps, mapActionsToProps)(request1);
