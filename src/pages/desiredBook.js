import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import DesiredBook from '../components/DesiredBook';
import Profile from '../components/Profile';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import InfoIcon from '@material-ui/icons/Info';
import WarningOutlinedIcon from '@material-ui/icons/WarningOutlined';
//Redux
import {connect} from 'react-redux';


class desiredBook extends Component {
    
    render() {        
        const desireds = this.props.user.desireds;
        const { t } = this.props;
        const authenticated= this.props.user.authenticated;
        let recentDesiredBooksMarkup = authenticated  ? ( desireds[0]  ?(
            desireds.map((book) => 
                <DesiredBook key={book.bookId} book={book}/>)) : 
                <Card >
                <CardContent >
                     <Typography variant="h5" color="textPrimary" component="h2" ><InfoIcon />{t('Information')}</Typography>
                    <Typography variant="h5" color="textSecondary" component="h5">{t('noDesiredBooks')}</Typography>
            
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
                    {recentDesiredBooksMarkup}
                   
                </Grid>
               
               
            </Grid>
        )
    }
}

desiredBook.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    
};


const mapStateToProps = state => ({
    user: state.user,
});

const desiredBook1 = withTranslation()(desiredBook);
export default connect(mapStateToProps)(desiredBook1);
