import React, { Component } from 'react'
import PropTypes from 'prop-types';

//MUI
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import withStyles from '@material-ui/core/styles/withStyles';

//Redux
import {connect} from 'react-redux';
import {getProfileData} from '../redux/actions/userActions';

import Book from '../components/Book';
import UserDetails from '../components/UserDetails';

const styles = {
    progressBook: {
        margin: '50px 50%'
    }
};
class user extends Component{
    componentDidMount(){
        const handle = this.props.match.params.handle;
        this.props.getProfileData(handle);
    }
    render(){
        const {classes, user: {loadingProfile, userData}} = this.props;
        let recentBooksMarkup = (loadingProfile) ? (<CircularProgress className={classes.progressBook}/>) : (
            userData.books.map((book) => 
                <Book key={book.bookId} book={book}/>)
        );
        return (        
            <Grid container spacing={3}  justify="center"> 
           
               <Grid item xs={12}>
                 {loadingProfile ? (<CircularProgress className={classes.progressBook}/>) : (
                 <UserDetails/> )}
                 <br/>
                 {recentBooksMarkup}
       
            </Grid>
            </Grid>
        )
    }


}

user.propTypes = {
    getProfileData: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = state =>({
    user: state.user,
    data: state.data
})

export default connect(mapStateToProps, {getProfileData})(withStyles(styles)(user));