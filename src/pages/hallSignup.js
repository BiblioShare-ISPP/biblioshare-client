import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import BiblioShareIcon from '../images/logo.png';
import {Link} from 'react-router-dom';
import { withTranslation } from 'react-i18next';
//MUI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Autocomplete from '@material-ui/lab/Autocomplete';

//Redux
import { connect } from 'react-redux';
import { signupHall } from '../redux/actions/hallAction';

//Export 
import {spainCities} from '../util/cities';

const styles = {
  form: {
    textAlign: 'center'
  },
  image: {
      margin: '20px auto 20px auto'
  },
  pageTitle: {
      margin: '20px auto 20px auto'
  },
  textField: {
      margin: '10px auto 10px auto'
  },
  button: {
      marginTop: '10px',
      position: 'relative'
  },
  customError: {
      color: 'red',
      fontSize: '0.8rem'
  },
  progress: {
      position: 'absolute'
  }
};

class signup extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            location: '',
            errors: {}
        }
    }
    componentDidMount(){
        this.setState({
            errors: {}
        });
    }  
    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({ errors: nextProps.UI.errors });
        }
    }
    handleSubmit = (event) =>{
        event.preventDefault();
        this.setState({
            loading: true
        });
        const newHallData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            location: this.state.location
        }
        this.props.signupHall(newHallData, this.props.history);
    };
    handleAutoComplete = (event, value) => {
        if(value !== null) {
            this.setState({location: value.title});
        }
    };
    handleChange = (event) => {
      this.setState({
          [event.target.name]: event.target.value
      })      
    };
    render() {
        const {classes, UI: { loading }} = this.props;
        const {errors} = this.state;
        const { t } = this.props;
        return (
            <Grid container className = {classes.form}>
                <Grid item sm />
                <Grid item sm >
                    <img src={BiblioShareIcon} alt="BiblioShare" className={classes.image}/>
                    <Typography variant="h4" color="primary">{t('hall1')}</Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField id="email" name="email" type="email" label={t('email')} className={classes.textField} helperText={errors.email} error={errors.email ? true : false }
                            value={this.state.email} onChange={this.handleChange} fullWidth />
                        <TextField id="password" name="password" type="password" label={t('password')} className={classes.textField} helperText={errors.password} error={errors.password ? true : false }
                            value={this.state.password} onChange={this.handleChange} fullWidth />
                        <TextField id="confirmPassword" name="confirmPassword" type="password" label={t('ConfirmPassword')} className={classes.textField} helperText={errors.confirmPassword} error={errors.confirmPassword ? true : false }
                            value={this.state.confirmPassword} onChange={this.handleChange} fullWidth />
                        <Autocomplete freeSolo id="location" name="location" options={spainCities} getOptionLabel={option => option.title} renderInput={params => <TextField {...params} label={t('location')} margin="normal" />} 
                            onChange={this.handleAutoComplete} />
                        {errors.location && (
                            <Typography variant="body2" className={classes.customError}>
                                {errors.location}
                            </Typography>
                        )}
                        {errors.general && (
                            <Typography variant="body2" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}
                        <Button type="submit" variant="contained" color="primary" className={classes.button} disabled={loading} >{t('signup1')} {loading && (
                            <CircularProgress size={30} className={classes.progress}/>)}</Button>
                        <br />
                        <small> {t('hadAccount')} <Link to="/hall/login">  {t('here')}</Link></small>
                    </form>
                </Grid>
                <Grid item sm />
            </Grid>
        );
    }
}

signup.propTypes = {
    classes: PropTypes.object.isRequired,
    hall: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    signupUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    hall: state.user,
    UI: state.UI
});
const signup1 = withTranslation()(signup);
export default connect(mapStateToProps, {signupHall})(withStyles(styles)(signup1));
