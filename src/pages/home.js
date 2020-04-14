import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { withTranslation } from 'react-i18next';
import Book from '../components/Book';
import Profile from '../components/Profile';
import BookSkeleton from '../util/BookSkeleton';

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
    state = {
        location: '',
    };
    componentDidMount(){
        this.props.getBooks();
    }
    componentDidUpdate(prevProps){
        if(prevProps.user.credentials !== this.props.user.credentials){
            this.setState({
                location: this.props.user.credentials.location,
            });
        }
    };
    render() {
        const {classes, data: {books, loading}, user: {isHallMember, description, image}} = this.props;
        const { t } = this.props;
        let filteredBooks = books.filter((b) => {
            if(typeof this.state.location !== "undefined"){
                return b.location.toLowerCase().indexOf(this.state.location.toLowerCase()) !== -1;
            }
            else{
                return true;
            }
        });
        let recentBooksMarkup = loading ? (<BookSkeleton />) : (
            filteredBooks.map((book) => 
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
                        (<Paper className={classes.paper}><p>{t('noBook')}</p></Paper>):recentBooksMarkup}
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
const home1 = withTranslation()(home)
export default connect(mapStateToProps, {getBooks})(withStyles(styles)(home1));
