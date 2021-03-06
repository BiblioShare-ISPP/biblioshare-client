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

//Redux
import {connect} from 'react-redux';
import {loginHall} from '../redux/actions/hallAction';

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

class login extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        };
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
        const hallData = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginHall(hallData, this.props.history);
    };
    
    handleChange = (event) => {
      this.setState({
          [event.target.name]: event.target.value
      })      
    };
    render() {
        const {classes, UI: {loading }} = this.props;
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
                        {errors.general && (
                            <Typography variant="body2" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}
                        <Button type="submit" variant="contained" color="primary" className={classes.button} disabled={loading} >{t('login1')}{loading && (
                            <CircularProgress size={30} className={classes.progress}/>)}</Button>
                        <br />
                        <small> {t('noAccount')} <Link to="/hall/signup"> {t('here')}</Link></small>
                    </form>
                </Grid>
                <Grid item sm />
            </Grid>
        );
    }
}

login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginHall: PropTypes.func.isRequired,
    UI:  PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
    UI: state.UI
});

const mapActionsToProps = {
    loginHall   
};
const login1 = withTranslation()(login)
export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(login1));
