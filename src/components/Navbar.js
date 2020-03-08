import React, { Component, Fragment } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import CustomBotton from '../util/CustomButton';
import PostBook from './PostBook';
//MUI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

//Icons
import HomeIcon from '@material-ui/icons/Home';
import Notifications from '@material-ui/icons/Notifications';


class Navbar extends Component {
    render() {
        const {authenticated, handle} = this.props;
        return (
            <AppBar>
                <Toolbar className="nav-container">
                    {authenticated ? (
                        <Fragment>
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
                        </Fragment>
                    )}
                </Toolbar>
            </AppBar>
        )
    }
};

Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    authenticated: state.user.authenticated,
    handle: state.user.credentials.handle
});

export default connect(mapStateToProps)(Navbar);
