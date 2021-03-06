import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import ButtonAddCounts from './ButtonAddCounts';
import { withTranslation } from 'react-i18next';
//MUI
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import MyButton from '../util/MyButton';
//Icons
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LocationOn from '@material-ui/icons/LocationOn';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
//Redux
import {connect} from 'react-redux';
import { logoutHall} from '../redux/actions/hallAction';
import { Tooltip } from '@material-ui/core';
import { uploadImage } from '../redux/actions/hallAction';

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
        [theme.breakpoints.down("sm")]: {
            width: 100,
            height: 100,
        },
        [theme.breakpoints.down("xs")]: {
            width: 200,
            height: 200,
        },
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

class HallProfile extends Component {
    handleLogout = () => {
        this.props.logoutHall();
    };
    handleImageChange = (event) => {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append('image', image, image.name);
        this.props.uploadImage(formData);
      };
      handleEditPicture = () => {
        const fileInput = document.getElementById('imageInput');
        fileInput.click();
      };
    render() {
        const { 
            classes, 
            hall: {
                credentials: {imageUrl, location, accounts}, 
                loading,
                authenticated
            }
        } = this.props;
        const { t } = this.props;
        let profileMarkup = !loading ? (
            authenticated ? (
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className="image-wrapper">
                        <img src={imageUrl} alt="profile" className="profile-image"/>
                        <Fragment>
                            <input
                                type="file"
                                id="imageInput"
                                hidden="hidden"
                                onChange={this.handleImageChange}
                            />
                            <MyButton
                                tip={t('editProfilePicture')}
                                onClick={this.handleEditPicture}
                                btnClassName={classes.button}
                                >
                                <EditIcon color="primary" />
                            </MyButton>
                        </Fragment>
                       
                       
                    </div>
                        <hr />
                    <div className="profile-details">
                            <Typography variant="h5" color="primary">{location} {t('cityHall')}</Typography>
                        <hr />
                        {location && (
                            <Fragment>
                                <LocationOn color="primary" />{location}
                            </Fragment>)}
                        <hr />
                        <AccountCircleIcon color="primary" /><span>{accounts} {t('accountsRemaining')}</span>
                    </div>
                    <Tooltip title={t('logout')} placement="top">
                        <IconButton onClick={this.handleLogout}>
                            <ExitToAppIcon color="primary" /> 
                        </IconButton>
                        
                    </Tooltip>
                    <ButtonAddCounts/>
                </div>
                
            </Paper>
        ) : (null)) : (<CircularProgress className={classes.progress} />);

        return profileMarkup;
    }
}

const mapStateToProps = (state) => ({
    hall: state.hall
});

const mapActionsToProps= { logoutHall,  uploadImage };

HallProfile.propTypes = {
    logoutHall: PropTypes.func.isRequired,
    hall: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    uploadImage: PropTypes.func.isRequired,
};
const HallProfile1 = withTranslation()(HallProfile);
export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(HallProfile1));
