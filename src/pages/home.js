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
import {geoLocateUser} from '../redux/actions/userActions';

//MUI
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import YouTubeIcon from '@material-ui/icons/YouTube';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';

const styles  = theme => ({
    progressBook: {
        margin: '50px 50%'
    },
    ad: {
        margin: '10px'
    },
    paper: {
        padding: 20
    },
    socials: {
        [theme.breakpoints.down("xs")]: {
            display: "none"
        },
        margin: '10px 0px 0px 0px'
    },
    icons: {
        margin:'0px 10px 0px 10px'
    }
});
class home extends Component {
    constructor(){
        super();
        this.state = {
            location: '',
            onlyLocation: false,
            onlyAvailables: false,
            lng: '',
            lat: '',
            tags: []
        };
        this.displayLocationInfo = this.displayLocationInfo.bind(this);
    }

    componentDidMount(){
        this.props.getBooks();
    }
    componentDidUpdate(prevProps){
        if(prevProps.user.credentials !== this.props.user.credentials){
            this.setState({
                location: this.props.user.credentials.location,
            });
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(this.displayLocationInfo);
            }
        }
        if(this.state.lat !== ""){
            this.props.geoLocateUser(this.state.lng, this.state.lat);
        }
    };
    displayLocationInfo(position) {
        const lng = position.coords.longitude;
        const lat = position.coords.latitude;
        this.setState({
            lng: lng,
            lat: lat
        });
    };
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
        let recentBooksMarkup = loading ? (<BookSkeleton />) : (
            filteredBooks.map((book) => 
                <Book key={book.bookId} book={book}/>)
        );
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
                    <div className={classes.socials}>
                        <center><a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/channel/UCuu9luzMlXQkq6jX0BBxw8Q"><YouTubeIcon fontSize="large" color="primary" className={classes.icons}/></a><a target="_blank" rel="noopener noreferrer" href="https://twitter.com/BiblioShareUS"><TwitterIcon fontSize="large" color="primary" className={classes.icons}/></a><a target="_blank" rel="noopener noreferrer" href="/"><FacebookIcon fontSize="large" color="primary" className={classes.icons}/></a><a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/biblioshareus/"><InstagramIcon fontSize="large" color="primary" className={classes.icons}/></a></center>
                    </div>
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
                    <br/>
                    {recentBooksMarkup.length===0 ?
                        (<Paper className={classes.paper}><p>{t('noBook')}</p></Paper>):recentBooksMarkup}
                </Grid>
            </Grid>
        )
    }
}

home.propTypes = {
    getBooks: PropTypes.func.isRequired,
    geoLocateUser: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    data: state.data,
    user: state.user
});

const mapActionsToProps = {
    getBooks,
    geoLocateUser,
}

const home1 = withTranslation()(home)
export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(home1));
