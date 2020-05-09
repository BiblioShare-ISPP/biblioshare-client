import React, { Component, Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import MyButton from '../util/MyButton';
import { withTranslation } from 'react-i18next';
//MUI Stuff

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { blue, red } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { removeDesiredBook } from '../redux/actions/userActions';

const style = {
    deleteButton: {
        float: 'right'
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

class DeleteDesiredBook extends Component {
    state = {
      open: false
    };
    desiredBook = () => {
      let value = this.props.user.desireds && this.props.user.desireds.find((book) => book.bookId === this.props.bookId) ? true : false;
      return value
    };
    handleOpen = () => {
        this.setState({ open: true });
    }
    handleClose = () => {
        this.setState({ open: false });
    }
    deleteDesiredBook = () => {
        this.props.removeDesiredBook(this.props.bookId);
        this.setState({ open: false });
    }
    render() {
        const { classes } = this.props;
        const { t } = this.props;
        const deleteDesiredButton = this.desiredBook() ? (<Fragment>
        <MyButton tip={t('deleteBook')} onClick={this.handleOpen} btnClassName={classes.deleteButton}>
            <DeleteOutline color="error"/>
        </MyButton>
        <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle title="a">
            {t('askDeleteDesiredBook')}
                </DialogTitle>
            <DialogActions>

                <ThemeProvider theme={theme}>
                    <Button variant="contained" color="primary" className={classes.margin} onClick={this.handleClose}>
                    {t('cancel')}
                </Button>
                </ThemeProvider>
                <ThemeProvider theme={theme1}>
                    <Button variant="contained" color="primary" className={classes.margin} onClick={this.deleteDesiredBook}>
                    {t('delete')}
                </Button>
                </ThemeProvider>
            </DialogActions>
        </Dialog>
    </Fragment>): null
        return deleteDesiredButton;
    }
}

DeleteDesiredBook.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    bookId: PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
  });

const DeleteDesiredBook1 = withTranslation()(DeleteDesiredBook)
export default connect(mapStateToProps , { removeDesiredBook })(withStyles(style)(DeleteDesiredBook1));
