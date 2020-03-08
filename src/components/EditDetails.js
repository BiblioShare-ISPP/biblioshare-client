import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../util/MyButton';
// Redux stuff
import { connect } from 'react-redux';
import { editUserDetails } from '../redux/actions/userActions';
// MUI Stuff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// Icons
import EditIcon from '@material-ui/icons/Edit';
import Autocomplete from '@material-ui/lab/Autocomplete';
//Export 
import {spainCities} from '../util/cities';
import Typography from '@material-ui/core/Typography';



const styles = {
  button: {
    float: 'right'
  }
};

class EditDetails extends Component {
  state = {
    bio: '',
    location: '',
    open: false,
    errors: {}
  };
  mapUserDetailsToState = (credentials) => {
    this.setState({
      bio: credentials.bio ? credentials.bio : '',
      location: credentials.location ? credentials.location : ''
    });
  };
  handleOpen = () => {
    this.setState({ open: true });
    this.mapUserDetailsToState(this.props.credentials);
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  componentDidMount() {
    const { credentials } = this.props;
    this.mapUserDetailsToState(credentials);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  handleSubmit = () => {
    const userDetails = {
      bio: this.state.bio,
      location: this.state.location
    };
    this.props.editUserDetails(userDetails);
    this.handleClose();
  };
  render() {
    const { classes } = this.props;
    const {errors} = this.state;
    return (
      <Fragment>
        <MyButton
          tip="Edit Details"
          onClick={this.handleOpen}
          btnClassName={classes.button}
        >
          <EditIcon color="primary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Edit your details</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                name="bio"
                tpye="text"
                label="Bio"
                multiline
 
                placeholder="A short bio about yourself"
                className={classes.textField}
                value={this.state.bio}
                onChange={this.handleChange}
                fullWidth
              />
              <Autocomplete freeSolo id="location" value={this.state.location}  placeholder="Where you live" name="location" options={spainCities} getOptionLabel={option => option.title} renderInput={params => <TextField {...params} label="Location" margin="normal" />} onChange={(event, value) => this.setState({location: value.title})} />
              {errors.location && (
                  <Typography variant="body2" className={classes.customError}>
                      {errors.location}
                  </Typography>
                )}
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

EditDetails.propTypes = {
  editUserDetails: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  credentials: state.user.credentials
});

export default connect(
  mapStateToProps,
  { editUserDetails }
)(withStyles(styles)(EditDetails));