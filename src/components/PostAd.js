import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CustomButton from '../util/CustomButton';

//MUI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddAlertIcon from '@material-ui/icons/AddAlert';
import CloseIcon from '@material-ui/icons/Close';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';

//Icons
import DescriptionIcon from '@material-ui/icons/Description';

//Redux
import {connect} from 'react-redux';
import {postAd, uploadAdImage} from '../redux/actions/hallAction';
import { Tooltip } from '@material-ui/core';
const styles = {
    palette: {
        primary: {
        light: '#df487f',
        main: '#d81b60',
        dark: '#971243',
        contrastText: '#fff',
        },
        secondary: {
        light: '#c1eff4',
        main: '#b2ebf2',
        dark: '#7ca4a9',
        contrastText: '#fff',
        }
    },
    typography: {
        useNextVariants: true,
    },
    submitButton: {
        position: 'relative',
        margin: '10px 5px 0px 0px'
    },
    progressSpinner: {
        position: 'absolute'
    },
    closeButton: {
        position: 'absolute',
        right: '3%',
        top: '3%'
    },
    input: {
    },
    divImage:{
        position: 'relative',
        margin: '0 auto'
    },
    addButton: {
        position: 'fixed',
        bottom: '10%',
        right: '5%'
    }
};

class PostAd extends Component{
    state = {
        open: false,
        description: '',
        image: '',
        errors: {}
    };
    componentWillReceiveProps(nextProps){
        if(nextProps.UI.adImageUploaded){
            document.getElementById('coverImg').src = nextProps.UI.adImageUploaded;
            this.setState({
                image: nextProps.UI.adImageUploaded
            });
            nextProps.UI.adImageUploaded = null;
        }
    }
    handleOpen = () => {
        this.setState({ 
            open: true,
            errors: {},
            description: '',
            image: ''
        });
    };
    handleClose = () => {
        this.setState({ 
            open: false,
            errors: {},
            description: '',
            image: ''
        });
    };
    handleImageChange = (event) => {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append('cover', image, image.name);
        this.props.uploadAdImage(formData);
    };
    handleUploadCover = () => {
        const fileInput = document.getElementById('coverInput');
        fileInput.click();
    };
    render(){
        const { errors } = this.state;
        const { classes, UI: {loading}, hall} = this.props;

        return (
            <Fragment>
                <CustomButton onClick={this.handleOpen} tip="Post an ad">
                    <AddAlertIcon color="secondary" />
                </CustomButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <CustomButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon />
                    </CustomButton>
                    <DialogTitle>Post an add</DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>
                            <div className={classes.divImage}>
                                <center><img id="coverImg" alt="Ad image" src="https://firebasestorage.googleapis.com/v0/b/ispp-99815.appspot.com/o/AdImage.png?alt=media" width="100px" /></center>
                                <center><input type="file" id="coverInput" name="cover" onChange={this.handleImageChange} hidden="hidden" />
                                <Tooltip title="Upload add image" placement="bottom">
                                    <IconButton className="button" onClick={this.handleUploadCover}>
                                        <ImageSearchIcon color="primary" /> 
                                    </IconButton>
                                </Tooltip>
                                </center>
                            </div>
                            <TextField className={classes.input} id="description" name="description" placeholder="Description" InputProps={{startAdornment: ( <InputAdornment position="start"> <DescriptionIcon color="primary" /> </InputAdornment>),}} error={errors.description ? true : false } helperText={errors.description} onChange={this.handleChange} fullWidth/>
                            <Button type="submit" variant="contained" color="primary" className={classes.submitButton} disabled={loading}>
                                Submit 
                                {loading && (
                                    <CircularProgress size={30} className={classes.progressSpinner} />
                                )}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

PostAd.propTypes = {
    postAd: PropTypes.func.isRequired,
    uploadAdImage: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    hall:PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    UI: state.UI,
    hall: state.user
});

const mapActionsToProps= { postAd, uploadAdImage};


export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(PostAd));