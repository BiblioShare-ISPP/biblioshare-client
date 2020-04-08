import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { withTranslation } from 'react-i18next';
// REdux
import { connect } from 'react-redux';
import { requestBook } from '../redux/actions/requestAction';
import { Button } from '@material-ui/core';

const styles = {
    requestButton: {
       float: 'right'
    }
};

export class RequestButton extends Component {
  requestedBook = () => {
    if (
      this.props.user.requests &&
      this.props.user.requests.find(
        (request) => request.bookId === this.props.bookId
      )
    ){
      return true;
    }else {
      return false;
    }
  };
  requestBook = () => {
    this.props.requestBook(this.props.bookId);
  };

  render() {
    const { classes } = this.props;
    const { t } = this.props;
    const requestButton = this.requestedBook() ? (
      <Button variant="contained" color="primary" className={classes.requestButton} disabled>
          {t('BookRequested')}
      </Button>
    ) : (
      <Button variant="contained" color="primary" className={classes.requestButton} onClick={this.requestBook}>
        {t('RequestBook')}
      </Button>
    );
    return requestButton;
  }
}

RequestButton.propTypes = {
  user: PropTypes.object.isRequired,
  bookId: PropTypes.string.isRequired,
  requestBook: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user
});

const mapActionsToProps = {
  requestBook
};

const RequestButton1 = withTranslation()(RequestButton);
export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(RequestButton1));
