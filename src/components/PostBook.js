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
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

//Icons
import { Icon } from '@iconify/react';
import barcodeIcon from '@iconify/icons-mdi/barcode';

//Redux
import {connect} from 'react-redux';
import {postBook, checkISBN, uploadImage} from '../redux/actions/dataAction';
import { Tooltip } from '@material-ui/core';

//Others
import Scanner from "./Scanner";


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

class PostBook extends Component{
    titleISBN = '';
    authorISBN = '';
    state = {
        open: false,
        openISBN: false,
        books: this.props.data.books.length,
        title: '',
        author: '',
        cover: '',
        isbn: '',
        camera: false,
        reads: [],
        errors: {}
    };
    componentWillReceiveProps(nextProps){
        console.log(this.state);
        console.log(nextProps);
        if(nextProps.UI.errors){
            console.log('Entro 1');
            this.titleISBN = '';
            this.authorISBN = '';
            this.setState({
                title: '',
                author: '',
                cover: '',
                isbn: '',
                errors: nextProps.UI.errors
            });
        }
        if(!nextProps.UI.errors && !nextProps.UI.loading && !this.state.openISBN && !nextProps.UI.coverUploaded && (nextProps.data.books.length > this.state.books)){
            console.log('Entro 2');

            this.setState({ 
                author: '',
                title: '',
                cover: '',
                isbn: '',
                books: nextProps.data.books.length,
                reads: []
            });
            this.titleISBN = '';
            this.authorISBN = '';
            this.handleClose();
        }
        if(nextProps.data.isbn.length > 0 && (nextProps.data.isbn[0].items[0].volumeInfo.title !== this.titleISBN)){
            console.log('Entro 3');

            this.titleISBN = nextProps.data.isbn[0].items[0].volumeInfo.title;
            if(nextProps.data.isbn[0].items[0].volumeInfo.authors != null){
                this.authorISBN = nextProps.data.isbn[0].items[0].volumeInfo.authors[0];
            }  
            document.getElementById('title').value = this.titleISBN;
            document.getElementById('author').value = this.authorISBN;
            this.setState({
                title: this.titleISBN,
                author: this.authorISBN,
                isbn: ''
            });
            this.handleISBNClose();
        }
        if(nextProps.UI.coverUploaded){
            console.log('Entro 4');
            document.getElementById('coverImg').src = nextProps.UI.coverUploaded;
            this.setState({
                cover: nextProps.UI.coverUploaded
            });
            nextProps.UI.coverUploaded = null;
        }
    }
    handleISBNOpen = () => {
        this.setState({ openISBN: true });
    };
    
    handleISBNClose = () => {
        this.setState({ 
            openISBN: false, 
            isbn: '',
            errors: {}});
        this.titleISBN = '';
        this.authorISBN = '';
    };
    handleOpen = () => {
        this.setState({ 
            open: true,
            errors: {},
            title: '',
            author: '',
            cover: '',
            isbn: ''
        });
        this.titleISBN = '';
        this.authorISBN = '';
    };
    handleClose = () => {
        this.setState({ 
            open: false, 
            errors: {},
            title: '',
            author: '',
            cover: '',
            isbn: ''
        });
        this.titleISBN = '';
        this.authorISBN = '';
        this.props.data.isbn = '';
    };
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.postBook({ 
            title: this.state.title,
            author: this.state.author,
            cover: this.state.cover
        });
        this.titleISBN = '';
        this.authorISBN = '';
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
    onDetected = (result) => {
        if(this.state.camera){
            let expresion = /^(97(8|9))?\d{9}(\d|X)$/;
            if(result.match(expresion) && this.state.reads.length < 10){
                this.state.reads.push(result);
            }
            if(this.state.reads.length === 10){
                let counts = this.state.reads.reduce((a,c) =>{
                    a[c] = (a[c] || 0) + 1;
                    return a;
                }, {});
                let maxCount = Math.max(...Object.values(counts));
                let mostRepeated = Object.keys(counts).filter(k => counts[k] === maxCount);
                this.setState({
                    camera: false,
                    isbn: mostRepeated[0]
                });
                document.getElementById("isbn").value = mostRepeated[0];
            }
        }
    };
    handleCamera = () => {
        document.getElementById("isbn").value = '';
        this.setState({
            isbn: '',
            camera: true,
            reads: []
        });
    };
    handleCameraClose = () => {
        document.getElementById("isbn").value = '';
        this.setState({
            camera: false,
            isbn: '',
            reads: []
        });
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
                        <form onSubmit={this.handleSubmit}>
                            <div className={classes.divImage}>
                                <img id="coverImg" alt="Book cover" src="https://firebasestorage.googleapis.com/v0/b/ispp-99815.appspot.com/o/no-cover.jpg?alt=media" width="100px" />
                                <input type="file" id="coverInput" name="cover" onChange={this.handleImageChange} hidden="hidden" />
                                <Tooltip title="Upload a cover image" placement="bottom">
                                    <IconButton className="button" onClick={this.handleUploadCover}>
                                        <ImageSearchIcon color="primary" /> 
                                    </IconButton>
                                </Tooltip>
                            </div>
                            <TextField className={classes.input} id="title" name="title" placeholder="Title" InputProps={{startAdornment: ( <InputAdornment position="start"> <MenuBookIcon color="primary" /> </InputAdornment>),}} error={errors.title ? true : false } helperText={errors.title} onChange={this.handleChange} fullWidth/>
                            <TextField className={classes.input} id="author" name="author" placeholder="Author" InputProps={{startAdornment: ( <InputAdornment position="start"> <AccountCircle color="primary" /> </InputAdornment>),}} error={errors.author ? true : false } helperText={errors.author} onChange={this.handleChange} fullWidth/>
                            <p>{errors.location}</p>
                            <Button variant="contained" className={classes.submitButton} color="secondary" onClick={this.handleISBNOpen}>
                                Search by ISBN
                            </Button><Button type="submit" variant="contained" color="primary" className={classes.submitButton} disabled={loading}>
                                Submit 
                                {loading && (
                                    <CircularProgress size={30} className={classes.progressSpinner} />
                                )}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
                <Dialog open={this.state.openISBN} onClose={this.handleISBNClose} fullWidth maxWidth="sm">
                    <CustomButton tip="Close" onClick={this.handleISBNClose} tipClassName={classes.closeButton}>
                        <CloseIcon />
                    </CustomButton>
                    <DialogTitle>Search Book by ISBN</DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.checkISBN}>
                           <TextField id="isbn" name="isbn" type="text" label="ISBN matches with barcode" placeholder="ISBN" onChange={this.handleChange} error={errors.isbn ? true : false } helperText={errors.isbn} className={classes.textField} InputProps={{startAdornment: ( <InputAdornment position="start"> <Icon icon={barcodeIcon} /> </InputAdornment>),}} fullWidth />
                           <Button type="submit" variant="contained" color="primary" className={classes.submitButton} disabled={loadingISBN}>
                                CHECK ISBN 
                                {loadingISBN && (
                                    <CircularProgress size={30} className={classes.progressSpinner} />
                                )}
                            </Button><Button variant="contained" color="primary" className={classes.submitButton} onClick={this.handleCamera}>
                                START CAMERA
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
                <Dialog open={this.state.camera} onClose={this.handleCameraClose} fullWidth maxWidth="sm">
                    <CustomButton tip="Close" onClick={this.handleCameraClose} tipClassName={classes.closeButton}>
                        <CloseIcon />
                    </CustomButton>
                    <DialogTitle>Scan the barcode</DialogTitle>
                    <DialogContent>
                        <div className="camara">
                            <Scanner onDetected={this.onDetected}/>
                        </div>
                    </DialogContent>
                </Dialog>
                <div className={classes.addButton}>
                    <Fab color="primary" aria-label="add" onClick={this.handleOpen}>
                        <AddIcon />
                    </Fab>
                </div>
            </Fragment>
        )
    }
}

PostBook.propTypes = {
    postBook: PropTypes.func.isRequired,
    checkISBN: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    UI: state.UI,
    data: state.data
});

const mapActionsToProps= { postBook, checkISBN, uploadImage};


export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(PostBook));