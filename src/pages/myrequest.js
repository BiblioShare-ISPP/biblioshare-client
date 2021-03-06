import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
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
        const { t } = this.props;
        const authenticated= this.props.user.authenticated;
        let recentRequestsMarkup = authenticated  ? ( requests[0]  ?(
            requests.map((request) => 
                <Request key={request.bookId} request={request}/>)) : 
                <Card >
                <CardContent >
                     <Typography variant="h5" color="textPrimary" component="h2" ><InfoIcon />{t('Information')}</Typography>
                    <Typography variant="h5" color="textSecondary" component="h5">{t('noRequest')}</Typography>
            
                </CardContent>
            </Card >) :
                <Card >
                <CardContent >
                     <Typography variant="h5" color="textPrimary" component="h2" ><WarningOutlinedIcon />{t('Warning')}</Typography>
                    <Typography variant="h5" color="textSecondary" component="h5">{t('AuthorizationRequired')}</Typography>
            
                </CardContent>
            </Card >;

       

        return (
            <Grid container spacing={6}>
                
                <Grid item sm={4} xs={12}>
                    <Profile/>
                </Grid>

                <Grid item sm={8} xs={12}>
                <Typography variant="h4" color="primary">{t('RequestDone')}</Typography>
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

const request1 = withTranslation()(request);
export default connect(mapStateToProps)(request1);
