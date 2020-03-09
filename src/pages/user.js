import React, { Component } from 'react'

import PropTypes from 'prop-types';

import axios from 'axios';


//MUI
import Grid from '@material-ui/core/Grid';

import CircularProgress from '@material-ui/core/CircularProgress';

//Redux
import {connect} from 'react-redux';
import {getUserData} from '../redux/actions/userActions';
import {getBooksByUser} from '../redux/actions/dataAction';

import Book from '../components/Book';
import UserDetails from '../components/UserDetails';


class user extends Component{
    componentDidMount(){
        const handle = this.props.match.params.handle;
        this.props.getUserData(handle);
        this.props.getBooksByUser(handle);
        axios.get(`/user/${handle}`)
            .then(res =>{
                    this.setState({
                        profile: res.data.user
                    })
            })
            .catch(err =>console.log(err));
    }
    render(){
        const {data: {book, loading}} = this.props;
        let recentBooksMarkup = loading ? (<CircularProgress/>) : (
            book.map((book) => 
                <Book key={book.bookId} book={book}/>)
        );
        return (        
            <Grid container spacing={3}> 
                 <Grid item xs>   
               </Grid>
               <Grid item xs={6}>
                 <UserDetails/>
                 <br/>
                 {recentBooksMarkup}
               </Grid>
               <Grid item xs>   
            </Grid>
            </Grid>
        )
    }


}

user.propTypes = {
    getUserData: PropTypes.func.isRequired, 
    data: PropTypes.object.isRequired,
    getBooksByUser: PropTypes.func.isRequired,

}

const mapStateToProps = state =>({
    data: state.data

})

export default connect(mapStateToProps, {getUserData, getBooksByUser})(user);