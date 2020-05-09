import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import BookSkeleton from '../util/BookSkeleton';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import Book from '../components/Book';
import Profile from '../components/Profile';

//MUI
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';


//Redux
import {connect} from 'react-redux';
import {findBooks} from '../redux/actions/dataAction';

const styles = (theme) => ({
    paper: {
        padding: 20
    }
})

class find extends Component {
    state = {
        location: '',
        onlyLocation: false,
        onlyAvailables: false
    };
    componentDidMount(){
        const keyword = this.props.match.params.keyword
        this.props.findBooks(keyword);
    }
    componentDidUpdate(prevProps){
        if(prevProps.user.credentials !== this.props.user.credentials){
            this.setState({
                location: this.props.user.credentials.location,
            });
        }
    }
    handleChange = (event) => {
        this.setState({ ...this.state, [event.target.name]: event.target.checked });
    };
    handleTagsChange = (event,values) => {
        this.setState({tags: values});
    };
    render() {
        const {classes, data: {books, loading}, user: {authenticated,isHallMember, description, image}} = this.props;
        const { t } = this.props;
        let filteredBooks = books.filter((b) => {
            if(!b.tags){
                b.tags = [];
            }
            if(this.state.onlyLocation === true && this.state.onlyAvailables === false && Array.isArray(this.state.tags)){
                return b.location.toLowerCase().indexOf(this.state.location.toLowerCase()) !== -1;
            } else if(this.state.onlyLocation === false && this.state.onlyAvailables === true && Array.isArray(this.state.tags)){
                return b.availability === "available";
            } else if(this.state.onlyLocation === true && this.state.onlyAvailables === true && Array.isArray(this.state.tags)){
                return b.location.toLowerCase().indexOf(this.state.location.toLowerCase()) !== -1 && b.availability === "available";
            } else if (this.state.onlyLocation === false && this.state.onlyAvailables === false && Array.isArray(this.state.tags)){
                return true;
            } else if (this.state.onlyLocation === true && this.state.onlyAvailables === false && ! Array.isArray(this.state.tags)){
                return b.location.toLowerCase().indexOf(this.state.location.toLowerCase()) !== -1 && b.tags.includes(this.state.tags.tag);
            } else if (this.state.onlyLocation === false && this.state.onlyAvailables === true && ! Array.isArray(this.state.tags)){
                return b.availability === "available" && b.tags.includes(this.state.tags.tag);
            } else if (this.state.onlyLocation === true && this.state.onlyAvailables === true && ! Array.isArray(this.state.tags)){
                return b.location.toLowerCase().indexOf(this.state.location.toLowerCase()) !== -1 && b.availability === "available" && b.tags.includes(this.state.tags.tag);
            } else {
                if(this.state.tags){
                    return b.tags.includes(this.state.tags.tag);
                } else {
                    return true;
                }
            }
        });
        let recentBooksMarkup = loading ? (<BookSkeleton />) : (filteredBooks.map((book) => <Book key={book.bookId} book={book}/>));
        const genres = [
            {tag: 'Drama', title: t('Drama')},
            {tag: 'Comedy', title: t('Comedy')},
            {tag: 'Tragedy', title: t('Tragedy')},
            {tag: 'Fiction', title: t('Fiction')},
            {tag: 'Realistic-Fiction', title: t('Realistic-Fiction')},
            {tag: 'Science-Fiction', title: t('Science-Fiction')},
            {tag: 'Fantasy', title: t('Fantasy')},
            {tag: 'Folklore', title: t('Folklore')},
            {tag: 'Historical', title: t('Historical')},
            {tag: 'Mystery', title: t('Mystery')},
            {tag: 'Romance', title: t('Romance')},
            {tag: 'Thriller', title: t('Thriller')},
            {tag: 'Biography', title: t('Biography')},
            {tag: 'Autobiography', title: t('Autobiography')},
            {tag: 'Narrative', title: t('Narrative')},
            {tag: 'Lyric', title: t('Lyric')},
            {tag: 'Poetry', title: t('Poetry')}
        ]
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
                            <Autocomplete
                                id="combo-box"
                                options={genres}
                                onChange={this.handleTagsChange}
                                getOptionLabel={(option) => option.title}
                                style={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} label={t('FilterGenres')} variant="outlined" />}
                            />
                        </FormGroup>
                    ) :(null)}

                    {recentBooksMarkup.length===0 ?
                        (<Paper className={classes.paper}><p>{t('noBook')}</p></Paper>):recentBooksMarkup}
                </Grid>
            </Grid>
        )
    }
}

find.propTypes = {
    findBooks: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    data: state.data,
    user: state.user
});
const find1 = withTranslation()(find)
export default connect(mapStateToProps,{findBooks})(withStyles(styles)(find1));