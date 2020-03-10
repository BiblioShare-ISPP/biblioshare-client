import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import Book from '../components/Book';
import Profile from '../components/Profile';

//Redux
import {connect} from 'react-redux';
import {getBooks} from '../redux/actions/dataAction';

const styles = {
    progressBook: {
        margin: '50px 50%'
    }
};
class home extends Component {
    componentDidMount(){
        this.props.getBooks();
    };
    render() {
        const {classes, data: {books, loading}} = this.props;
        let recentBooksMarkup = loading ? (<CircularProgress className={classes.progressBook} />) : (
            books.map((book) => 
                <Book key={book.bookId} book={book}/>)
        );
        return (
            <Grid container spacing={6}>
                <Grid item sm={4} xs={12}>
                    <Profile/>
                </Grid>
                <Grid item sm={8} xs={12}>
                    {recentBooksMarkup}
                </Grid>
            </Grid>
        )
    }
}

home.propTypes = {
    getBooks: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    data: state.data
});

export default connect(mapStateToProps, {getBooks})(withStyles(styles)(home));
