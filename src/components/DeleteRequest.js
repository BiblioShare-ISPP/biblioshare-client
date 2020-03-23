import React, { Component, Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import MyButton from '../util/MyButton';

//MUI Stuff

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { blue, red } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { deleteRequest } from '../redux/actions/requestAction';

const style = {
    deleteButton: {
        float: 'left',
        color: 'red'
    },
   
};

const theme = createMuiTheme({
    palette: {
      primary: blue,
    },
   
  });

  const theme1 = createMuiTheme({
    palette: {
      primary: red,
    },
    
  });

class DeleteRequest extends Component {
    state = {
        open: false
    };
    handleOpen = () => {
        this.setState({ open: true });
    }
    handleClose = () => {
        this.setState({ open: false });
    }
    deleteRequest = () => {
        this.props.deleteRequest(this.props.bookId);
        this.setState({ open: false });
    }
    render() {
        const { classes } = this.props;

        return (
            <Fragment>
                <MyButton tip="Delete Request" onClick={this.handleOpen} btnClassName={classes.deleteButton}>
                    <DeleteOutline color="error"/>
                </MyButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm"
                >
                    <DialogTitle title="a">
                        Are you sure you want to delete this request?
                        </DialogTitle>
                    <DialogActions>

                        <ThemeProvider theme={theme}>
                            <Button variant="contained" color="primary" className={classes.margin} onClick={this.handleClose}>
                                Cancel
                        </Button>
                        </ThemeProvider>
                        <ThemeProvider theme={theme1}>
                            <Button variant="contained" color="primary" className={classes.margin} onClick={this.deleteRequest}>
                                Delete
                        </Button>
                        </ThemeProvider>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

DeleteRequest.propTypes = {
    deleteRequest: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    bookId: PropTypes.string.isRequired
}

export default connect(null, { deleteRequest })(withStyles(style)(DeleteRequest));
