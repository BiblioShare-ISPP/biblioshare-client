import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
//Data actions
import {getBookData} from '../redux/actions/dataAction';

//Components
import BookDetails from '../components/BookDetails';

//MUI
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';


const styles = {
    progressBook: {
        margin: '7% 49%'
    }
}
class book extends Component {
    
    componentDidMount(){
        const bookId = this.props.match.params.bookId;
        this.props.getBookData(bookId);
    }
    render() {
        const { book, loading} = this.props.data;
        const {classes} = this.props;
        return (
            <Grid container spacing={6}>
                {loading ? (<CircularProgress className={classes.progressBook}/>): (
                    <Grid item xs={12}>
                        <BookDetails book={book} />
                    </Grid>)
                    }
            </Grid>
        )
    }
}

book.propTypes = {
    getBookData: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = state =>({
    data: state.data
});

export default connect(mapStateToProps, {getBookData})(withStyles(styles)(book));
