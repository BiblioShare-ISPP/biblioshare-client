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
import MenuBookIcon from '@material-ui/icons/MenuBook';
import CloseIcon from '@material-ui/icons/Close';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import IconButton from '@material-ui/core/IconButton';

//Redux
import {connect} from 'react-redux';
import {postBook, checkISBN} from '../redux/actions/dataAction';
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
        margin: '10px 0px 0px 0px'
    },
    progressSpinner: {
        position: 'absolute'
    },
    closeButton: {
        position: 'absolute',
        right: '3%',
        top: '3%'
    }
};

class PostBook extends Component{
    titleISBN = '';
    authorISBN = '';
    state = {
        open: false,
        title: '',
        author: '',
        cover: '',
        isbn: '',
        errors: {}
    };
    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({
                errors: nextProps.UI.errors
            });
        };
        if(!nextProps.UI.errors && !nextProps.UI.loading && nextProps.UI.loadingISBN){
            this.setState({ 
                author: '',
                title: '',
                cover: '',
                isbn: ''
            });
            this.handleClose();
        };
        if(nextProps.data.isbn.length > 0 && (nextProps.data.isbn[0].items[0].volumeInfo.title !== this.titleISBN)){
            this.titleISBN = nextProps.data.isbn[0].items[0].volumeInfo.title;
            this.authorISBN = nextProps.data.isbn[0].items[0].volumeInfo.authors;
            console.log(this.titleISBN);
            console.log(this.authorISBN);
        }
    };
    handleOpen = () => {
        this.setState({ open: true });
    };
    handleClose = () => {
        this.setState({ open: false, errors: {}});
    };
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };
    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state);
        this.props.postBook({ 
            title: this.state.title,
            author: this.state.author,
            cover: this.state.cover
        });
    };
    handleImageChange = (event) => {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append('cover', image, image.name);
        this.props.uploadImage(formData);
    };
    handleUploadCover = () => {
        const fileInput = document.getElementById('coverInput');
        fileInput.click();
    };
    checkISBN = (event) => {
        event.preventDefault();
        this.props.checkISBN({isbn: this.state.isbn});
    };
    render(){
        const { errors } = this.state;
        const { classes, UI: {loading, loadingISBN}} = this.props;
        return (
            <Fragment>
                <CustomButton onClick={this.handleOpen} tip="Post a book">
                    <MenuBookIcon color="secondary" />
                </CustomButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <CustomButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon />
                    </CustomButton>
                    <DialogTitle>Post a book</DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.checkISBN}>
                           <TextField name="isbn" type="text" label="ISBN" placeholder="ISBN" onChange={this.handleChange} error={errors.isbn ? true : false } helperText={errors.isbn} className={classes.textField} fullWidth />
                           <Button type="submit" variant="contained" color="primary" className={classes.submitButton} disabled={loadingISBN}>
                                CHECK ISBN 
                                {loadingISBN && (
                                    <CircularProgress size={30} className={classes.progressSpinner} />
                                )}
                            </Button>
                        </form>
                        <form onSubmit={this.handleSubmit}>
                            <input type="file" id="coverInput" onChange={this.handleImageChange} hidden="hidden" />
                            <Tooltip title="Upload a cover image" placement="bottom">
                                <IconButton className="button" onClick={this.handleUploadCover}>
                                    <ImageSearchIcon color="primary" /> 
                                </IconButton>
                            </Tooltip>
                            <TextField id="title" name="title" type="text" label="Title" placeholder="Title" error={errors.title ? true : false } helperText={errors.title} className={classes.textField} onChange={this.handleChange} fullWidth />
                            <TextField id="author" name="author" type="text" label="Author" placeholder="Author" error={errors.author ? true : false } helperText={errors.author} className={classes.textField} onChange={this.handleChange} fullWidth />
                            <p>{errors.location}</p>
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

PostBook.propTypes = {
    postBook: PropTypes.func.isRequired,
    checkISBN: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    UI: state.UI,
    data: state.data
});

const mapActionsToProps= { postBook, checkISBN};


export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(PostBook));