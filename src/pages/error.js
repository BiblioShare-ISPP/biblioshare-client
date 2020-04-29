import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import Grid from '@material-ui/core/Grid';

//MUI
import Typography from '@material-ui/core/Typography';

//Redux
import { connect } from 'react-redux';
const styles = {};
class terms extends Component {
    render() {
        const { t } = this.props;
        return (
            <Grid container spacing={1}>
            <Grid item xs />
            <Grid item xs={6}>
                <Typography variant="h1" color="primary">404</Typography>
                <Typography variant="h5" color="primary">{t('error')}</Typography>
                <Typography variant="body" color="primary">{t('goback')} <Link to="/">{t('home1')}</Link></Typography>
            </Grid>
            <Grid item xs />
        </Grid>
        );
    }
}

terms.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    signupUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
});
const terms1 = withTranslation()(terms)
export default connect(mapStateToProps)(withStyles(styles)(terms1));
