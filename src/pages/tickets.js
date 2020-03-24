import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Profile from '../components/Profile';
import {getOffers} from '../redux/actions/dataAction';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import Tickets from '../components/Tickets';
import withStyles from '@material-ui/core/styles/withStyles';

//Redux
import {connect} from 'react-redux';

const styles = {
    progressBook: {
        margin: '50px 50%'
    }
}
class tickets extends Component {

    componentDidMount(){
       
        this.props.getOffers();
    }

    render() {
        
        const {classes, data: {offers, loading}} = this.props;
        let recentOffersMarkup = loading ? (<CircularProgress className={classes.progressBook} />) : (
            offers.map((offer) => 
                <Tickets key={offer.items.sku} offer={offer}/>)
        );
        return (
            <Grid container spacing={6}>
                <Grid item sm={4} xs={12}>
                    <Profile/>
                </Grid>
                <Grid item sm={8} xs={12}>
                    {recentOffersMarkup}
                </Grid>
            </Grid>
           
        )
        
    }
}

tickets.propTypes = {
    getOffers: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    data: state.data
});


export default connect(mapStateToProps, {getOffers})(withStyles(styles)(tickets));