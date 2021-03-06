import React, {Component, Fragment } from 'react';
import { MenuItem } from "@material-ui/core";
import {Link} from 'react-router-dom';
import { withStyles } from "@material-ui/core/styles";
import ButtonAppBarCollapseLogged from "./ButtonAppBarCollapsedLogged";
import CustomButtonText from '../../util/CustomButtonText';
import CustomButtonTextTerms from '../../util/CustomButtonTextTerms';
import CustomButtonTextDesired from '../../util/CustomButtonTextDesired';
import { withTranslation } from 'react-i18next';
import CustomBotton from '../../util/CustomButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SubjectIcon from '@material-ui/icons/Subject';
const styles = theme => ({
  root: {
    position: "relative",
    right: 0
  },
  buttonBar: {
    [theme.breakpoints.down("xs")]: {
      display: "none"
    },
    paddingLeft: "0px",
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
                <MenuItem><Link to="/wishList"><CustomButtonTextDesired tip={t('wishList')} text={t('wishList') }/></Link></MenuItem>
                <MenuItem><Link to="/terms"><CustomButtonTextTerms tip={t('terms')} text={t('terms') }/></Link></MenuItem>
                <MenuItem><CustomButtonText tip={t('language')} text={t('currentLanguage') } onClick={this.handleChangeLanguage}/></MenuItem>
            </ButtonAppBarCollapseLogged>
            <div className={classes.buttonBar} id="appbar-collapse">
              <Link to="/wishList">
                <CustomBotton tip={t('wishList')}>
                    <FavoriteIcon color="secondary"/>
                </CustomBotton>
              </Link>
            <Fragment>
              <Link to="/terms">
                <CustomBotton tip={t('terms')}>
                    <SubjectIcon color="secondary"/>
                </CustomBotton>
              </Link>
              <CustomButtonText tip={t('language')} text={t('currentLanguage')} onClick={this.handleChangeLanguage} />
            </Fragment>
            </div>
          </div>
        );
    }
}
const AppBarCollapseLogged1 = withTranslation()(AppBarCollapseLogged)
export default withStyles(styles)(withStyles(styles)(AppBarCollapseLogged1));
