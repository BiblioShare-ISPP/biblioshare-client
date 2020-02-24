import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import PropTypes from 'prop-types';

import Book from '../components/Book';
import Profile from '../components/Profile';

//Redux
import {connect} from 'react-redux';
import {getBooks} from '../redux/actions/dataAction';

class home extends Component {
    componentDidMount(){
        this.props.getBooks();
    };
    render() {
        const styles = {
            progress: {
                margin: '20% 50%',
            }
        };

        const { books, loading} = this.props.data;

        let recentBooksMarkup = loading ? (
            books.map((book) => 
                <Book key={book.bookId} book={book}/>)
        ) : (<CircularProgress style={styles.progress} />);
        return (
            <Grid container spacing={6}>
                <Grid item sm={8} xs={12}>
                    {recentBooksMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Profile/>
                </Grid>
            </Grid>
        )
    }
}

home.propTypes = {
    getBooks: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    data: state.data
});

export default connect(mapStateToProps, {getBooks})(home);
