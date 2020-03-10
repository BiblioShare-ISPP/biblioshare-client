import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';

//MUI
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
//Icons
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import LocationOn from '@material-ui/icons/LocationOn';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import IconButton from '@material-ui/core/IconButton';

//Redux
import {connect} from 'react-redux';
import {logoutUser} from '../redux/actions/userActions';
import { Tooltip } from '@material-ui/core';


const styles = (theme) => ({
    progress: {
        margin: '20% 50%',
    },
    paper: {
        padding: 20
    },
    profile: {
    '& .image-wrapper': {
        textAlign: 'center',
        position: 'relative',
        '& button': {
        position: 'absolute',
        top: '80%',
        left: '70%'
        }
    },
    '& .profile-image': {
        width: 200,
        height: 200,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%'
    },
    '& .profile-details': {
        textAlign: 'center',
        '& span, svg': {
        verticalAlign: 'middle'
        },
        '& a': {
        color: theme.palette.primary.main
        }
    },
    '& hr': {
        border: 'none',
        margin: '0 0 10px 0'
    },
    '& svg.button': {
        '&:hover': {
        cursor: 'pointer'
        }
    }
    },
    buttons: {
        textAlign: 'center',
        '& a': {
            margin: '20px 10px'
        }
    },
    edit: {
        align: 'right'
    },
    button:{
        float: 'right'
    }
});

class Profile extends Component {
    handleLogout = () => {
        this.props.logoutUser();
    };
    render() {
        const { 
            classes, 
            user: {
                credentials: { handle, imageUrl, location, bio, tickets}, 
                loading,
                authenticated
            }
        } = this.props;
        
        let profileMarkup = !loading ? (
            authenticated ? (
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className="image-wrapper">
                        <img src={imageUrl} alt="profile" className="profile-image"/>
                    </div>
                        <hr />
                    <div className="profile-details">
                            <MuiLink component={Link} to={`/users/${handle}`} color="primary" variant="h5">{handle}</MuiLink>
                        <hr />
                        {bio}
                        <hr />
                        {location && (
                            <Fragment>
                                <LocationOn color="primary" />{location}
                            </Fragment>)}
                        <hr />
                        <ConfirmationNumberIcon color="primary" /><span>{tickets} tickets</span>
                    </div>
                    <Tooltip title="Logout" placement="top">
                        <IconButton onClick={this.handleLogout}>
                            <ExitToAppIcon color="primary" />
                        </IconButton>
                    </Tooltip>
                </div>
            </Paper>
        ) : (
            <Paper className={classes.paper}>
                <Typography variant="body2" align="center">
                    No profile found, please login</Typography>
                <div className={classes.buttons}>
                    <Button variant="contained" color="primary" component={Link} to="/login">
                        Login
                    </Button>
                    <Button variant="contained" color="secondary" component={Link} to="/signup">
                        Signup
                    </Button>
                </div>
            </Paper>
        )) : (<CircularProgress className={classes.progress} />);

        return profileMarkup;
    }
};

const mapStateToProps = (state) => ({
    user: state.user
});

const mapActionsToProps= { logoutUser };

Profile.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile));
