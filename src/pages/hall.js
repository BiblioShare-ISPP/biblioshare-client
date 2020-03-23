import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import HallProfile from '../components/HallProfile';

//Redux
import {connect} from 'react-redux';
import { getResidents} from '../redux/actions/hallAction';

const styles = {
    progressBook: {
        margin: '50px 50%'
    }
}
class hall extends Component {
    componentDidUpdate(prevProps){
        /* Funcion para obtener todos los habitantes de la region del ayuntamiento */
        if(this.props.hall.credentials !== prevProps.hall.credentials){
            this.props.getResidents(this.props.hall.credentials.location);
        }
    };
    render() {
        const {classes, hall: {
                credentials:{
                    location,
                }
            }
        } = this.props;
        return (
            <Grid container spacing={6}>
                <Grid item sm={4} xs={12}>
                    <HallProfile/>
                </Grid>
                <Grid item sm={8} xs={12}>
                    
                </Grid>
            </Grid>
        )
    }
}

hall.propTypes = {
    hall: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    hall: state.hall,
    getResidents: PropTypes.func.isRequired

});

export default connect(mapStateToProps, {getResidents})(withStyles(styles)(hall));
