import React, {Component, Fragment } from 'react';
import { MenuItem } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import ButtonAppBarCollapseLogged from "./ButtonAppBarCollapsedLogged";
import CustomButtonText from '../../util/CustomButtonText';
import { withTranslation } from 'react-i18next';
import {Link} from 'react-router-dom';
import CustomBotton from '../../util/CustomButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
const styles = theme => ({
  root: {
    position: "relative",
    right: 0
  },
  buttonBar: {
    [theme.breakpoints.down("xs")]: {
      display: "none"
    },
    paddingLeft: "16px",
    right: 0,
    position: "relative",
    width: "100%",
    background: "transparent"
  }
});

class AppBarCollapseLogged extends Component {
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
            <ButtonAppBarCollapseLogged>
            <MenuItem><Link to="/wishList">
                            <CustomBotton tip={t('wishList')}>
                                <FavoriteIcon color="primary"/>
                            </CustomBotton>
                            </Link></MenuItem>
                <MenuItem><CustomButtonText tip={t('language')} text={t('currentLanguage') } onClick={this.handleChangeLanguage}/></MenuItem>
                
            </ButtonAppBarCollapseLogged>
            <div className={classes.buttonBar} id="appbar-collapse">
            <Link to="/wishList">
                            <CustomBotton tip={t('wishList')}>
                                <FavoriteIcon color="secondary"/>
                            </CustomBotton>
            </Link>
            <Fragment>
              <CustomButtonText tip={t('language')} text={t('currentLanguage')} onClick={this.handleChangeLanguage} />
            </Fragment>
           
            </div>
          </div>
        );
    }

};
const AppBarCollapseLogged1 = withTranslation()(AppBarCollapseLogged)
export default withStyles(styles)(withStyles(styles)(AppBarCollapseLogged1));
