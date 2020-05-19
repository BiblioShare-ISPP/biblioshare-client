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
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

//Redux
import { connect } from 'react-redux';
import { signupUser } from '../redux/actions/userActions';

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

const CustomCheckbox = withStyles({
    root: {
      "&$checked": {
        color: '#4287f5',
      },
    },
    checked: {}
  })(props => <Checkbox color="default" {...props} />);

class signup extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            handle: '',
            location: '',
            checked: false,
            open: false,
            scroll: 'paper',
            descriptionElementRef: '',
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
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle,
            location: this.state.location
        }
        this.props.signupUser(newUserData, this.props.history);
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
    handleCheckbox = (event) => {
        this.setState({
            checked: !this.state.checked
        })      
      };
    handleClickOpen = (event) => {
        this.setState({
            open: true
        })
      };
    handleClose = (event) => {
        this.setState({
            open: false
        })
      };
    handleAccept = (event) => {
        this.setState({
            checked: true,
            open: false
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
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField id="email" name="email" type="email" label={t('email')} className={classes.textField} helperText={errors.email} error={errors.email ? true : false }
                            value={this.state.email} onChange={this.handleChange} fullWidth />
                        <TextField id="password" name="password" type="password" label={t('password')} className={classes.textField} helperText={errors.password} error={errors.password ? true : false }
                            value={this.state.password} onChange={this.handleChange} fullWidth />
                        <TextField id="confirmPassword" name="confirmPassword" type="password" label={t('ConfirmPassword')} className={classes.textField} helperText={errors.confirmPassword} error={errors.confirmPassword ? true : false }
                            value={this.state.confirmPassword} onChange={this.handleChange} fullWidth />
                        <TextField id="handle" name="handle" type="text" label={t('handle')} className={classes.textField} helperText={errors.handle} error={errors.handle ? true : false }
                            value={this.state.handle} onChange={this.handleChange} fullWidth />
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
                        <Dialog
                            open={this.state.open}
                            onClose={this.handleClose}
                            scroll={this.state.scroll}
                            aria-labelledby="scroll-dialog-title"
                            aria-describedby="scroll-dialog-description"
                        >
                            <DialogTitle id="scroll-dialog-title"><h3>{t('termsTitle')}</h3></DialogTitle>
                            <DialogContent dividers={this.state.scroll === 'paper'}>
                                <DialogContentText
                                    id="scroll-dialog-description"
                                    ref={this.state.descriptionElementRef}
                                    tabIndex={-1}
                                >
                                    <Typography variant="h6" color="textPrimary"><b>{t('ht1')}</b></Typography>
                                    <br/>
                                    <Typography variant="body1" color="textSecondary">{t('bt11')}</Typography>
                                    <Typography variant="body1" color="textSecondary">{t('bt12')}</Typography>
                                    <Typography variant="body1" color="textSecondary">{t('bt13')}</Typography>
                                    <Typography variant="body1" color="textSecondary">{t('bt14')}</Typography>
                                    <Typography variant="body1" color="textSecondary">{t('bt15')}</Typography>
                                    <br/>
                                    <Typography variant="h6" color="textPrimary">{t('ht2')}</Typography>
                                    <br/>
                                    <Typography variant="body1" color="textSecondary">{t('bt21')}</Typography>
                                    <Typography variant="body1" color="textSecondary">{t('bt22')}</Typography>
                                    <ul>
                                        <li><Typography variant="body1" color="textSecondary">{t('bt221')}</Typography></li>
                                        <li><Typography variant="body1" color="textSecondary">{t('bt222')}</Typography></li>
                                        <li><Typography variant="body1" color="textSecondary">{t('bt223')}</Typography></li>
                                        <li><Typography variant="body1" color="textSecondary">{t('bt224')}</Typography></li>
                                    </ul>
                                    <Typography variant="body1" color="textSecondary">{t('bt23')}</Typography>
                                    <Typography variant="body1" color="textSecondary">{t('bt24')}</Typography>
                                    <Typography variant="body1" color="textSecondary">{t('bt25')}</Typography>
                                    <Typography variant="body1" color="textSecondary">{t('bt26')}</Typography>
                                    <Typography variant="body1" color="textSecondary">{t('bt27')}</Typography>
                                    <ul>
                                        <li><Typography variant="body1" color="textSecondary">{t('bt271')}</Typography></li>
                                        <li><Typography variant="body1" color="textSecondary">{t('bt272')}</Typography></li>
                                        <li><Typography variant="body1" color="textSecondary">{t('bt273')}</Typography></li>
                                        <li><Typography variant="body1" color="textSecondary">{t('bt274')}</Typography></li>
                                    </ul>
                                    <Typography variant="body1" color="textSecondary">{t('bt28')}</Typography>
                                    <br/>
                                    <Typography variant="h6" color="textPrimary">{t('ht3')}</Typography>
                                    <br/>
                                    <Typography variant="body1" color="textSecondary">{t('bt31')}</Typography>
                                    <ul>
                                        <li><Typography variant="body1" color="textSecondary">{t('bt311')}</Typography></li>
                                        <li><Typography variant="body1" color="textSecondary">{t('bt312')}</Typography></li>
                                        <li><Typography variant="body1" color="textSecondary">{t('bt313')}</Typography></li>
                                        <li><Typography variant="body1" color="textSecondary">{t('bt314')}</Typography></li>
                                        <li><Typography variant="body1" color="textSecondary">{t('bt315')}</Typography></li>
                                    </ul>
                                    <Typography variant="body1" color="textSecondary">{t('bt32')}</Typography>
                                    <Typography variant="body1" color="textSecondary">{t('bt33')}</Typography>
                                    <ul>
                                        <li><Typography variant="body1" color="textSecondary">{t('bt331')}</Typography></li>
                                        <li><Typography variant="body1" color="textSecondary">{t('bt332')}</Typography></li>
                                        <li><Typography variant="body1" color="textSecondary">{t('bt333')}</Typography></li>
                                        <li><Typography variant="body1" color="textSecondary">{t('bt334')}</Typography></li>
                                        <li><Typography variant="body1" color="textSecondary">{t('bt335')}</Typography></li>
                                        <li><Typography variant="body1" color="textSecondary">{t('bt336')}</Typography></li>
                                    </ul>
                                    <Typography variant="body1" color="textSecondary">{t('bt34')}</Typography>
                                    <Typography variant="body1" color="textSecondary">{t('bt35')}</Typography>
                                    <Typography variant="body1" color="textSecondary">{t('bt36')}</Typography>
                                    <Typography variant="body1" color="textSecondary">{t('bt37')}</Typography>
                                    <ul>
                                        <li><Typography variant="body1" color="textSecondary">{t('bt371')}</Typography></li>
                                        <li><Typography variant="body1" color="textSecondary">{t('bt372')}</Typography></li>
                                        <li><Typography variant="body1" color="textSecondary">{t('bt373')}</Typography></li>
                                    </ul>
                                    <Typography variant="body1" color="textSecondary">{t('bt38')}</Typography>
                                    <br/>
                                    <Typography variant="h6" color="textPrimary">{t('ht4')}</Typography>
                                    <br/>
                                    <Typography variant="body1" color="textSecondary">{t('bt41')}</Typography>
                                    <br/>
                                    <Typography variant="h6" color="textPrimary">{t('ht5')}</Typography>
                                    <br/>
                                    <Typography variant="body1" color="textSecondary">{t('bt51')}</Typography>
                                    <br/>
                                    <Typography variant="h6" color="textPrimary">{t('ht6')}</Typography>
                                    <br/>
                                    <Typography variant="body1" color="textSecondary">{t('bt61')}</Typography>
                                    <br/>
                                    <Typography variant="h6" color="textPrimary">{t('ht7')}</Typography>
                                    <br/>
                                    <Typography variant="body1" color="textSecondary">{t('bt71')}</Typography>
                                    <Typography variant="body1" color="textSecondary">{t('bt72')}</Typography>
                                    <br/>
                                    <Typography variant="h6" color="textPrimary">{t('ht8')}</Typography>
                                    <br/>
                                    <Typography variant="body1" color="textSecondary">{t('bt81')}</Typography>
                                    <ul>
                                        <li><Typography variant="body1" color="textSecondary">{t('bt811')}</Typography></li>
                                        <li><Typography variant="body1" color="textSecondary">{t('bt812')}</Typography></li>
                                        <li><Typography variant="body1" color="textSecondary">{t('bt813')}</Typography></li>
                                        <li><Typography variant="body1" color="textSecondary">{t('bt814')}</Typography></li>
                                    </ul>
                                    <Typography variant="body1" color="textSecondary">{t('bt82')}</Typography>
                                    <Typography variant="body1" color="textSecondary">{t('bt83')}</Typography>
                                    <br/>
                                    <Typography variant="h6" color="textPrimary"><b>{t('privacyTitle')}</b></Typography>
                                    <br/>
                                    <Typography variant="body1" color="textSecondary">{t('bp11')}</Typography>
                                    <Typography variant="body1" color="textSecondary">{t('bp12')}</Typography>
                                    <Typography variant="body1" color="textSecondary">{t('bp13')}</Typography>
                                    <br/>
                                    <Typography variant="h6" color="textPrimary">{t('hp2')}</Typography>
                                    <br/>
                                    <Typography variant="body1" color="textSecondary">{t('bp21')}</Typography>
                                    <br/>
                                    <Typography variant="h6" color="textPrimary">{t('hp3')}</Typography>
                                    <br/>
                                    <Typography variant="body1" color="textSecondary">{t('bp31')}</Typography>
                                    <Typography variant="body1" color="textSecondary">{t('bp32')}</Typography>
                                    <Typography variant="body1" color="textSecondary">{t('bp33')}</Typography>
                                    <br/>
                                    <Typography variant="h6" color="textPrimary">{t('hp4')}</Typography>
                                    <br/>
                                    <Typography variant="body1" color="textSecondary">{t('bp41')}</Typography>
                                    <ul>
                                        <li><Typography variant="body1" color="textSecondary">{t('bp411')}</Typography></li>
                                        <li><Typography variant="body1" color="textSecondary">{t('bp412')}</Typography></li>
                                        <li><Typography variant="body1" color="textSecondary">{t('bp413')}</Typography></li>
                                        <li><Typography variant="body1" color="textSecondary">{t('bp414')}</Typography></li>
                                        <li><Typography variant="body1" color="textSecondary">{t('bp415')}</Typography></li>
                                        <li><Typography variant="body1" color="textSecondary">{t('bp416')}</Typography></li>
                                        <li><Typography variant="body1" color="textSecondary">{t('bp417')}</Typography></li>
                                    </ul>
                                    <br/>
                                    <Typography variant="h6" color="textPrimary">{t('hp5')}</Typography>
                                    <br/>
                                    <Typography variant="body1" color="textSecondary">{t('bp51')}</Typography>
                                    <Typography variant="body1" color="textSecondary">{t('bp52')}</Typography>
                                    <br/>
                                    <Typography variant="h6" color="textPrimary">{t('hp6')}</Typography>
                                    <br/>
                                    <Typography variant="body1" color="textSecondary">{t('bp61')}</Typography>
                                    <Typography variant="body1" color="textSecondary">{t('bp62')}</Typography>
                                    <Typography variant="body1" color="textSecondary">{t('bp63')}</Typography>
                                    <br/>
                                    <Typography variant="h6" color="textPrimary">{t('hp7')}</Typography>
                                    <br/>
                                    <Typography variant="body1" color="textSecondary">{t('bp71')}</Typography>
                                    <br/>
                                    <Typography variant="h6" color="textPrimary">{t('hp8')}</Typography>
                                    <br/>
                                    <Typography variant="body1" color="textSecondary">{t('bp81')}</Typography>
                                    <Typography variant="body1" color="textSecondary">{t('bp82')}</Typography>
                                    <Typography variant="body1" color="textSecondary">{t('bp83')}</Typography>
                                    <Typography variant="body1" color="textSecondary">{t('bp84')}</Typography>
                                    <Typography variant="body1" color="textSecondary">{t('bp85')}</Typography>
                                    <Typography variant="body1" color="textSecondary">{t('bp86')}</Typography>
                                    <Typography variant="body1" color="textSecondary">{t('bp87')}</Typography>
                                    <Typography variant="body1" color="textSecondary">{t('bp88')}</Typography>
                                    <Typography variant="body1" color="textSecondary">{t('bp89')}</Typography>
                                    <br/>
                                    <Typography variant="h6" color="textPrimary">{t('hp9')}</Typography>
                                    <br/>
                                    <Typography variant="body1" color="textSecondary">{t('bp91')}</Typography>
                                    <Typography variant="body1" color="textSecondary">{t('bp92')}</Typography>
                                    <br/>
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.handleClose} color="primary">
                                    Cancel
                                </Button>
                                <Button onClick={this.handleAccept} color="primary">
                                    Accept
                                </Button>
                                </DialogActions>
                        </Dialog>
                        <FormControlLabel
                            control={
                            <CustomCheckbox
                                icon={<ImportContactsIcon />}
                                checkedIcon={<ImportContactsIcon />}
                                name="checkbox"
                                checked={this.state.checked}
                                onChange={this.handleCheckbox}
                            />
                            }
                            label={<div><span>{t('acceptThe')}</span><Link onClick={this.handleClickOpen}>{t('termsAndConditions')}</Link></div>}
                        />
                        <Button type="submit" variant="contained" color="primary" className={classes.button} disabled={loading || !this.state.checked} >{t('signup1')} {loading && (
                            <CircularProgress size={30} className={classes.progress}/>)}</Button>
                        <br />
                        <small>{t('hadAccount')}<Link to="/login"> {t('here')}</Link></small>
                    </form>
                </Grid>
                <Grid item sm />
            </Grid>
        );
    }
}

signup.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    signupUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
});
const signup1 = withTranslation()(signup)
export default connect(mapStateToProps, {signupUser})(withStyles(styles)(signup1));
