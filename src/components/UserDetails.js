import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
//MUI

import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

//Icons
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import LocationOn from '@material-ui/icons/LocationOn';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';
//Redux
import {connect} from 'react-redux';
import {logoutUser} from '../redux/actions/userActions';
import {deleteProfile} from '../redux/actions/userActions';
import EditDetails from './EditDetails';
import { uploadImage } from '../redux/actions/userActions';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import MyButton from '../util/MyButton';



const styles = (theme) => ({
    progress: {
        margin: '20% 50%',
    },
    paper: {
        padding: 20,
  
        
  
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
    '& .hall-image': {
        width: 100,
        height: 100,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%'
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

class UserDetails extends Component {
    constructor(){
        super();
        this.state = {
            open: false
        }
    }

    handleLogout = () => {
        this.props.logoutUser();
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
    handleClickOpen = (event) => {
        this.setState({
            open: true
        })
      };
    handleClose = (event) => {
        this.setState({
            open: false
        })
      };
    handleAccept = (event) => {
        this.props.deleteProfile();
    }
    render() {
        const { 
            classes, 
            user: {
                credentials: { handle},
                loading,
                isHallMember, 
                hallImage,
                authenticated,
                userData,
            }
        } = this.props;
        const { t } = this.props;
        let tickets;
   
        let isLoggedUser = (handle === userData.user.handle) ? true : false;
        if(isLoggedUser=== true){
            tickets=  <ConfirmationNumberIcon color="primary" />
         }
        let profileMarkup = !(loading && authenticated) ? (
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                           
                    <div className="image-wrapper">
                        <img src={userData.user.imageUrl} alt="profile" className="profile-image"/>
                        {isLoggedUser && isHallMember ? 
                        <img src={hallImage} alt="profile" className="hall-image" />:
                        null}
                        {isLoggedUser ? (
                        <Fragment>
                            <input
                                type="file"
                                id="imageInput"
                                hidden="hidden"
                                onChange={this.handleImageChange}
                            />
                            <MyButton
                                tip= {t('editProfilePicture')}
                                onClick={this.handleEditPicture}
                                btnClassName={classes.button}
                                >
                                <EditIcon color="primary" />
                            </MyButton>
                        </Fragment>
                        ) : null}
                    </div>
                    <hr />
                    <div className="profile-details">
                    <Typography variant="h4" component="h5">
                    {userData.user.handle}
                    </Typography>             
                        <hr />
                        {userData.user.bio}
                        <hr />
                        {userData.user.location && (
                            <Fragment>
                                <LocationOn color="primary" />{userData.user.location}
                            </Fragment>)}
                        <hr />
                        {tickets}{isLoggedUser === true  && (<span>{userData.user.tickets} tickets</span>)}
                    </div>
                    {isLoggedUser ? (
                        <Fragment>
                            <Dialog
                                open={this.state.open}
                                onClose={this.handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">{t('deleteProfileHeader')}</DialogTitle>
                                <DialogContent>
                                <DialogContentText id="alert-dialog-description">{t('deleteProfileBody')}</DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                <Button onClick={this.handleClose} color="primary" autoFocus>
                                    {t('cancel')}
                                </Button>
                                <Button onClick={this.handleAccept} color="primary">
                                    {t('agree')}
                                </Button>
                                </DialogActions>
                            </Dialog>
                            <EditDetails/>
                            <MyButton
                                    tip= {t('deleteProfile')}
                                    onClick={this.handleClickOpen}
                                    btnClassName={classes.button}
                            >
                                    <DeleteIcon color="primary" />
                            </MyButton>
                        </Fragment>
                    ) : null}
                </div>
                { isLoggedUser ? (
                    <MuiLink component={Link} to={`/ticket`} color="primary" variant="h5">{t('buyTickets')}</MuiLink>
                ): null}
            </Paper>
        ): (<CircularProgress className={classes.progress} />);
                            
        return profileMarkup;
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});

const mapActionsToProps= { logoutUser, uploadImage, deleteProfile };

UserDetails.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    deleteProfile: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    uploadImage: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};
const UserDetails1 = withTranslation()(UserDetails)
export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(UserDetails1));