import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';

import Book from '../components/Book';
import Profile from '../components/Profile';

//Redux
import {connect} from 'react-redux';
import {findBooks} from '../redux/actions/dataAction';


class find extends Component {
    componentDidMount(){
        const keyword = this.props.match.params.keyword
        this.props.findBooks(keyword);
    }
    render() {
        const {data: {books, loading}} = this.props;
        let recentBooksMarkup = loading ? (<CircularProgress/>) : (books.map((book) => <Book key={book.bookId} book={book}/>));
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

find.propTypes = {
    findBooks: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    data: state.data
});

export default connect(mapStateToProps,{findBooks})(find);
