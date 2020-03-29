import React, { Component, Fragment } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import CustomBotton from '../util/CustomButton';
import PostBook from './PostBook';
import PostAd from './PostAd';
import {findBooks} from '../redux/actions/dataAction';

//MUI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { fade, withStyles } from '@material-ui/core/styles';

//Icons
import HomeIcon from '@material-ui/icons/Home';
import Notifications from '@material-ui/icons/Notifications';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import EqualizerIcon from '@material-ui/icons/Equalizer';

class Navbar extends Component {
    constructor(){
        super();
        this.state = {
            keyword: '',
        }
    }

    handleFind = (event) =>{
        event.preventDefault();
        this.setState({
            loading: true
        });
        this.props.findBooks(this.state.keyword);
        window.location.href = `/find/${this.state.keyword}`;
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })      
      };

    render() {
        const { authenticated,handle,authenticatedHall } = this.props;
        const { classes } = this.props;
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
                                    placeholder="Search…"
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
                                <CustomBotton tip="Home">
                                    <HomeIcon color="secondary"/>
                                </CustomBotton>
                            </Link>
                            <Link to={`/requests/${handle}`}>
                            <CustomBotton tip="Requests">
                                <Notifications color="secondary"/>
                            </CustomBotton>
                            </Link>
                            <Link to="/myRequests">
                            <CustomBotton tip="My requests">
                                <LocalLibraryIcon color="secondary"/>
                            </CustomBotton>
                            </Link>
                        </Fragment>
                    ) : (
                        <Fragment>
                            {authenticatedHall ? (
                                <Fragment>
                                <Link to="/hall">
                                    <CustomBotton tip="Home">
                                        <HomeIcon color="secondary"/>
                                    </CustomBotton>
                                </Link>
                                <CustomBotton tip="Stats">
                                    <EqualizerIcon color="secondary"/>
                                </CustomBotton>
                                <PostAd/>
                            </Fragment>
                            ) : (
                                <Fragment>
                                    <Button color="inherit" component={Link} to="/login">
                                        Login
                                    </Button>
                                    <Button color="inherit" component={Link} to="/">
                                        Home
                                    </Button>
                                    <Button color="inherit" component={Link} to="/signup">
                                        Signup
                                    </Button>
                                    <Button color="inherit" component={Link} to="/hall/login">
                                        Halls
                                    </Button>
                            </Fragment>
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
    classes: PropTypes.object.isRequired,
    authenticatedHall : PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    authenticated: state.user.authenticated,
    handle: state.user.credentials.handle,
    data: state.data,
    authenticatedHall : state.hall.authenticated
});

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

export default connect(mapStateToProps,{findBooks})(withStyles(styles)(Navbar));
