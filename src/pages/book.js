import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

//Data actions
import {getBookData} from '../redux/actions/dataAction';

//Components
import BookDetails from '../components/BookDetails';

//MUI
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

class book extends Component {
    state = {
        book: null
    }
    componentDidMount(){
        const bookId = this.props.match.params.bookId;
        this.props.getBookData(bookId);
    }
    render() {
        const { loading, book} = this.props.data;
        return (
            <Grid container spacing={6}>
                {!loading ? (
                    <Grid item xs={12}>
                        <BookDetails book={book}/>
                    </Grid>)
                    :(<CircularProgress />)}
            </Grid>
        )
    }
}

book.propTypes = {
    getBookData: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = state =>({
    data: state.data
});

export default connect(mapStateToProps, {getBookData})(book);
