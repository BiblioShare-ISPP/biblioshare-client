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

//Redux
import {connect} from 'react-redux';
import {postBook} from '../redux/actions/dataAction';

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
        left: '90%',
        top: '5%'
    }
};

class PostBook extends Component{
    state = {
        open: false,
        title: '',
        author: '',
        cover: '',
        errors: {}
    };
    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({
                errors: nextProps.UI.errors
            });
        };
        if(!nextProps.UI.errors && !nextProps.UI.loading){
            this.setState({ 
                author: '',
                title: '',
                cover: ''
            });
            this.handleClose();
        };
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
        this.props.postBook({ 
            title: this.state.title,
            author: this.state.author,
            cover: this.state.cover
        });
    };
    render(){
        const { errors } = this.state;
        const { classes, UI: {loading}} = this.props;
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
                            <TextField name="title" type="text" label="Title" placeholder="Title" error={errors.title ? true : false } helperText={errors.title} className={classes.textField} onChange={this.handleChange} fullWidth />
                            <TextField name="author" type="text" label="Author" placeholder="Author" error={errors.author ? true : false } helperText={errors.author} className={classes.textField} onChange={this.handleChange} fullWidth />
                            <TextField name="cover" type="text" label="Cover" placeholder="Cover" error={errors.cover ? true : false } helperText={errors.cover} className={classes.textField} onChange={this.handleChange} fullWidth />
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
    UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    UI: state.UI
});

export default connect(mapStateToProps, {postBook})(withStyles(styles)(PostBook));