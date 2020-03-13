import React, { Component, Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import MyButton from '../util/MyButton';

//MUI Stuff

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteOutline from '@material-ui/icons/DeleteOutline';

import {connect} from 'react-redux';
import {deleteBook} from '../redux/actions/dataAction';

const style = {
    deleteButton: {
        position: 'absolute',
        left:'85%',
        
        color: 'red'
    },
    deleteText: {
        color: 'red'
    },
    cancelText: {
        color: 'blue'
    }
};

class DeleteBook extends Component {
    state = {
        open: false
    };
    handleOpen = () => {
        this.setState({ open: true});
    }
    handleClose = () => {
        this.setState({ open: false});
    }
    deleteBook = () => {
        this.props.deleteBook(this.props.bookId);
        this.setState({ open: false});
    }
    render() {
        const {classes} = this.props;

        return (
           <Fragment>
               <MyButton tip="Delete Book" onClick={this.handleOpen}  btnClassName={classes.deleteButton}>
                   <DeleteOutline />
               </MyButton>
               <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm"
                    >
                        <DialogTitle title="a">
                            Are you sure you want to delete this book?
                        </DialogTitle>
                        <DialogActions>
                            <MyButton onClick={this.handleClose}  btnClassName={classes.cancelText}>
                                Cancel
                            </MyButton>
                            <MyButton onClick={this.deleteBook}  btnClassName={classes.deleteText}>
                                Delete
                            </MyButton>
                        </DialogActions>
                    </Dialog>
           </Fragment>
        )
    }
}

DeleteBook.propTypes = {
    deleteBook: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    bookId: PropTypes.string.isRequired
}

export default connect(null, {deleteBook})(withStyles(style)(DeleteBook));
