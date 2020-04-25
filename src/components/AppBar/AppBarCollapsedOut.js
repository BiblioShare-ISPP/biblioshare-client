import React, {Component, Fragment } from 'react';
import { Button, MenuItem } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import ButtonAppBarCollapseOut from "./ButtonAppBarCollapsedOut";
import {Link} from 'react-router-dom';
import CustomButtonText from '../../util/CustomButtonText';
import { withTranslation } from 'react-i18next';

const styles = theme => ({
  root: {
    position: "relative",
    right: 0
  },
  buttonBar: {
    [theme.breakpoints.down("xs")]: {
      display: "none"
    },
    margin: "10px",
    paddingLeft: "16px",
    right: 0,
    position: "relative",
    width: "100%",
    background: "transparent"
  }
});

class AppBarCollapseOut extends Component {
    constructor(){
        super();
        this.state = {
            keyword: '',
            notifications: '',
            webLanguage: 'en',
        }
    }
    handleChangeLanguage = () => {
        if(this.state.webLanguage==='en'){
            this.props.i18n.changeLanguage('es');
            this.setState({webLanguage: 'es'});
        }else{
            this.props.i18n.changeLanguage('en');
            this.setState({webLanguage: 'en'});
        }
    };
    render(){
        const {t, classes} = this.props;
        return(
            <div className={classes.root}>
            <ButtonAppBarCollapseOut>
                <MenuItem><Button color="inherit" component={Link} to="/">{t('home')}</Button></MenuItem>
                <MenuItem><Button color="inherit" component={Link} to="/login">{t('login')}</Button></MenuItem>
                <MenuItem><Button color="inherit" component={Link} to="/signup">{t('signup')}</Button></MenuItem>
                <MenuItem><Button color="inherit" component={Link} to="/hall/login">{t('hall')}</Button></MenuItem>
                <MenuItem><CustomButtonText tip={t('language')} text={t('currentLanguage') } onClick={this.handleChangeLanguage}/></MenuItem>
            </ButtonAppBarCollapseOut>
            <div className={classes.buttonBar} id="appbar-collapse">
            <Fragment>
                <Button color="inherit" component={Link} to="/login">
                {t('login')}
                </Button>
                <Button color="inherit" component={Link} to="/">
                {t('home')}
                </Button>
                <Button color="inherit" component={Link} to="/signup">
                {t('signup')}
                </Button>
                <Button color="inherit" component={Link} to="/hall/login">
                {t('hall')}
                </Button>
                <CustomButtonText tip={t('language')} text={t('currentLanguage') } onClick={this.handleChangeLanguage} />
            </Fragment>
            </div>
          </div>
        );
    }

};
const AppBarCollapseOut1 = withTranslation()(AppBarCollapseOut)
export default withStyles(styles)(withStyles(styles)(AppBarCollapseOut1));
