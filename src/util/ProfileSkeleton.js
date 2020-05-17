import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
// MUI
import Paper from '@material-ui/core/Paper';
import Skeleton from '@material-ui/lab/Skeleton';

const styles = (theme) => ({
  handle: {
    height: 20,
    backgroundColor: theme.palette.primary.main,
    width: 60,
    margin: '0 auto 7px auto'
  },
  fullLine: {
    height: 15,
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: '100%',
    marginBottom: 10
  },
  halfLine: {
    height: 15,
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: '50%',
    marginBottom: 10
  },
  avatarSize: {
    width: 200,
    height: 200,
    [theme.breakpoints.down("sm")]: {
      width: 100,
      height: 100,
    },
    [theme.breakpoints.down("xs")]: {
      width: 200,
      height: 200,
    },
  }
});
const ProfileSkeleton = (props) => {
  const { classes } = props;
  return (
    <Paper className={classes.paper}>
        <center><Skeleton animation="wave" variant="circle" className={classes.avatarSize}/></center>
        <br />
          <div className={classes.handle} />
          <Skeleton variant="text" animation="wave" height={20} width="100%" />
          <Skeleton variant="text" animation="wave" height={20} width="100%" />
          <center>
          <Skeleton variant="text" animation="wave" height={20} width="30%" />
          <Skeleton variant="text" animation="wave" height={20} width="30%" />
          <br />
          </center>
    </Paper>
  );
};

ProfileSkeleton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfileSkeleton);