import React, { Component, Fragment } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import CustomBotton from '../util/CustomButton';
import CustomButtonText from '../util/CustomButtonText';
import PostBook from './PostBook';
import PostAd from './PostAd';
import {findBooks, getBooks} from '../redux/actions/dataAction';
import { createBrowserHistory } from 'history'
import { withTranslation } from 'react-i18next';
//MUI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { fade, withStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';

//Icons
import HomeIcon from '@material-ui/icons/Home';
import Notifications from '@material-ui/icons/Notifications';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import AppBarCollapseOut from './AppBar/AppBarCollapsedOut';
import AppBarCollapseLogged from './AppBar/AppBarCollapsedLogged';
import FavoriteIcon from '@material-ui/icons/Favorite';
class Navbar extends Component {
    constructor(){
        super();
        this.state = {
            keyword: '',
            notifications: '',
            webLanguage: 'en',
        }
    }
    
    componentDidUpdate(prevProps){
        if(this.props.user.notifications !== prevProps.user.notifications){
            this.setState({
                notifications: this.props.user.notifications,
            });
        }
    };    
    handleFind = (event) =>{
        let history = createBrowserHistory()
        event.preventDefault();
        this.setState({
            loading: true
        });
        this.props.findBooks(this.state.keyword);
        var array = window.location.pathname.split("/");
        if((window.location.pathname.split("/").length - 1)===1 && array[1]===""){
            history.push(`/find/${this.state.keyword}`);
        }else{
            if(this.state.keyword.length > 0){
                window.location.href = `/find/${this.state.keyword}`;
            }
        }
        
    };
    handleHome = () =>{
        this.props.getBooks();
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })      
      };
    handleChangeLanguage = () => {
        if(this.state.webLanguage==='en'){
            this.props.i18n.changeLanguage('es');
            this.setState({webLanguage: 'es'});
        }else{
            this.props.i18n.changeLanguage('en');
            this.setState({webLanguage: 'en'});
        }
    };
    
    render() {
        const { authenticated,handle,authenticatedHall } = this.props;
        const { classes } = this.props;
        const { t } = this.props;
        return (
            <AppBar>
                <Toolbar className="nav-container">
                    {authenticated ? (
                        <Fragment>
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon />
                                </div>
                                <form onSubmit={this.handleFind}>
                                <InputBase
                                    name="keyword"
                                    onChange={this.handleChange}
                                    placeholder={t('search')}
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    inputProps={{ 'aria-label': 'search' }}
                                    value={this.state.keyword}
                                />
                                </form>
                            </div>
                            <PostBook/>
                            <Link to="/">
                                <CustomBotton onClick={this.handleHome} tip={t('home1')}>
                                    <HomeIcon color="secondary"/>
                                </CustomBotton>
                            </Link>
                            <Link to={`/requests/${handle}`}>
                            <CustomBotton tip={t('requests')}>
                                <Badge color="error" badgeContent={this.state.notifications.length} max={9}>
                                    <Notifications color="secondary"/>
                                </Badge>
                            </CustomBotton>
                            </Link>
                            <Link to="/myRequests">
                            <CustomBotton tip={t('myrequests')}>
                                <LocalLibraryIcon color="secondary"/>
                            </CustomBotton>
                            </Link>
                            <Link to="/wishList">
                            <CustomBotton tip={t('wishList')}>
                                <FavoriteIcon color="secondary"/>
                            </CustomBotton>
                            </Link>
                            <AppBarCollapseLogged t={t}/>
                        </Fragment>
                    ) : (
                        <Fragment>
                            {authenticatedHall ? (
                                <Fragment>
                                <Link to="/hall">
                                    <CustomBotton tip={t('home1')}>
                                        <HomeIcon color="secondary"/>
                                    </CustomBotton>
                                </Link>
                                <Link to="/hall/stats">
                                    <CustomBotton tip={t('stats')}>
                                        <EqualizerIcon color="secondary"/>
                                    </CustomBotton>
                                </Link>
                                <PostAd/>
                                <CustomButtonText tip={t('language')} text={t('currentLanguage')} onClick={this.handleChangeLanguage} />
                            </Fragment>
                            ) : (
                                <AppBarCollapseOut t={t}/>
                            )}
                        </Fragment>
                    )}
                </Toolbar>
            </AppBar>
        )
    }
}

Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    findBooks: PropTypes.func.isRequired,
    getBooks: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    authenticatedHall : PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    authenticated: state.user.authenticated,
    user: state.user,
    handle: state.user.credentials.handle,
    data: state.data,
    authenticatedHall : state.hall.authenticated
});
const mapActionsToProps = {
    findBooks,
    getBooks
}
const styles = theme => ({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(1),
          width: 'auto',
        },
      },
      searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      inputRoot: {
        color: 'inherit',
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          width: 120,
          '&:focus': {
            width: 200,
          },
        },
      },
});
const Navbar1 = withTranslation()(Navbar)
export default  connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(Navbar1));
