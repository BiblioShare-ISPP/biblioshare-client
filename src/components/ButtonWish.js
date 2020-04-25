import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { withTranslation } from 'react-i18next';
// REdux
import { connect } from 'react-redux';
import { addDesiredBook } from '../redux/actions/userActions';
import { Button, Typography } from '@material-ui/core';

//Icons
import FavoriteIcon from '@material-ui/icons/Favorite';

const styles = {
    buttonWish: {
       float: 'right'
    }
};

export class ButtonWish extends Component {
  desiredBook = () => {
    if (
      this.props.user.desiredBooks &&
      this.props.user.desiredBooks.find(
        (book) => book.bookId === this.props.bookId
      )
    ){
      return true;
    }else {
      return false;
    }
  };
  addDesiredBook = () => {
    this.props.addDesiredBook(this.props.bookId);
  };

  render() {
    const { classes } = this.props;
    const { t } = this.props;
    const ButtonWish = this.desiredBook() ? (
      <Button variant="contained" color="primary" className={classes.buttonWish} disabled>
          {t('DesiredBook')}
      </Button>
    ) : (
      <Button variant="contained" color="primary" className={classes.buttonWish} onClick={this.addDesiredBook}>
        <Typography variant="body1" color="secondary">+ </Typography><FavoriteIcon color="secondary" />
      </Button>
    );
    return ButtonWish;
  }
}

ButtonWish.propTypes = {
  user: PropTypes.object.isRequired,
  bookId: PropTypes.string.isRequired,
  addDesiredBook: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user
});

const mapActionsToProps = {
  addDesiredBook
};

const ButtonWish1 = withTranslation()(ButtonWish);
export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(ButtonWish1));
