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

//MUI
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

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
        onlyLocation: false,
        onlyAvailables: false
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
    handleChange = (event) => {
        this.setState({ ...this.state, [event.target.name]: event.target.checked });
    };
    render() {
        const {classes, data: {books, loading}, user: {authenticated,isHallMember, description, image}} = this.props;
        const { t } = this.props;
        let filteredBooks = books.filter((b) => {
            if(this.state.onlyLocation === true && this.state.onlyAvailables === false){
                return b.location.toLowerCase().indexOf(this.state.location.toLowerCase()) !== -1;
            } else if(this.state.onlyLocation === false && this.state.onlyAvailables === true){
                return b.availability === "available";
            } else if(this.state.onlyLocation === true && this.state.onlyAvailables === true){
                return b.location.toLowerCase().indexOf(this.state.location.toLowerCase()) !== -1 && b.availability === "available";
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
                    {authenticated ? (
                        <FormGroup row>
                            <FormControlLabel control={<Switch checked={this.state.onlyAvailables} onChange={this.handleChange} name="onlyAvailables" color="primary"/>} label={t('onlyAvailables')}/>
                            <FormControlLabel control={<Switch checked={this.state.onlyLocation} onChange={this.handleChange} name="onlyLocation" color="primary"/>} label={t('onlyLocation')}/>
                        </FormGroup>
                    ) :(null)}

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
