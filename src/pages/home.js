import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import Book from '../components/Book';
import Profile from '../components/Profile';

//Redux
import {connect} from 'react-redux';
import {getBooks} from '../redux/actions/dataAction';

const styles = {
    progressBook: {
        margin: '50px 50%'
    },
    ad: {
        margin: '10px'
    },
    paper: {
        padding: 20
    }
}
class home extends Component {
    componentDidMount(){
        this.props.getBooks();
    };
    render() {
        const {classes, data: {books, loading}, user: {isHallMember, description, image}} = this.props;
        let recentBooksMarkup = loading ? (<CircularProgress className={classes.progressBook} />) : (
            books.map((book) => 
                <Book key={book.bookId} book={book}/>)
        );
        return (
            <Grid container spacing={6}>
                <Grid item sm={4} xs={12}>
                    <Profile/>
                    {isHallMember ? (
                        <div className={classes.ad}>
                            <Typography variant="h5" color="primary">{description}</Typography>
                            <img alt="Ad" src={image} width="100%"/>
                        </div>
                    ):
                    null}
                </Grid>
                <Grid item sm={8} xs={12}>
                    {recentBooksMarkup.length===0 ?
                        (<Paper className={classes.paper}><p>No books found...</p></Paper>):recentBooksMarkup}
                </Grid>
            </Grid>
        )
    }
}

home.propTypes = {
    getBooks: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    data: state.data,
    user: state.user
});

export default connect(mapStateToProps, {getBooks})(withStyles(styles)(home));
