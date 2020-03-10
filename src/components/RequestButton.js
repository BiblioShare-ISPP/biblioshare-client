import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

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
    )
      return true;
    else return false;
  };
  requestBook = () => {
    this.props.requestBook(this.props.bookId);
  };

  render() {
    const { classes } = this.props;
    const requestButton = this.requestedBook() ? (
      <Button variant="contained" color="primary" className={classes.requestButton} disabled>
          Book requested
      </Button>
    ) : (
      <Button variant="contained" color="primary" className={classes.requestButton} onClick={this.requestBook}>
        Request book
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

export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(RequestButton));
