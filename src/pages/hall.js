import React, { Component, Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import HallProfile from '../components/HallProfile';

//Redux
import {connect} from 'react-redux';
import { getResidents} from '../redux/actions/hallAction';

//MaterialUI
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
    progress: {
        margin: '50px 50%'
    },
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    }
});

class hall extends Component {
    componentDidUpdate(prevProps){
        /* Funcion para obtener todos los habitantes de la region del ayuntamiento */
        if(this.props.hall.credentials !== prevProps.hall.credentials){
            this.props.getResidents(this.props.hall.credentials.location);
        }
    };
    render() {
        const {classes, hall:{loadingResidents, residents}} = this.props;
        let members = !loadingResidents ? (
            residents.map((resident) => (
                <ListItem button>
                    <ListItemAvatar>
                        <Avatar alt={resident.handle} src={resident.imageUrl}/>
                    </ListItemAvatar>
                    <ListItemText primary={resident.handle} />
                    <ListItemSecondaryAction>
                        <Checkbox edge="end"/>
                    </ListItemSecondaryAction>
                </ListItem>
            ))): (<CircularProgress className={classes.progress} />);
        return (
            <Grid container spacing={6}>
                <Grid item sm={4} xs={12}>
                    <HallProfile/>
                </Grid>
                <Grid item sm={8} xs={12}>
                    <Typography variant="h4" color="primary">Users</Typography>
                    <br />
                    <List dense className={classes.root}>
                        {members}
                    </List>
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
