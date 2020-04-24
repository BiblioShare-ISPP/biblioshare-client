import React, { Component , Fragment } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { withTranslation } from 'react-i18next';
import { withScriptjs, withGoogleMap, GoogleMap, Circle } from "react-google-maps"

//Data actions
import {getBookData} from '../redux/actions/dataAction';

//Components
import BookDetails from '../components/BookDetails';

//MUI
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';

const styles = (theme) => ({
    progressBook: {
        margin: '7% 49%'
    },
    list: {
        width: "100%",
        backgroundColor: theme.palette.background.paper
    },
    commentFont: {
        fontWeight: "bold"
    },
    commentAlign: {
        display: "inline"
      }
});

class book extends Component {

    componentDidMount(){
        const bookId = this.props.match.params.bookId;
        this.props.getBookData(bookId);
    }
    render() {
        dayjs.extend(relativeTime);
        const { book,comments, loading} = this.props.data;
        const {classes} = this.props;
        const { t } = this.props;
        const options = {
            strokeColor: "#1976d2",
            fillColor: '#63a4ff',
        };
        const MyMapComponent = ((typeof(book.geo) === "undefined") || Object.entries(book.geo).length === 0) ?(null): (withScriptjs(withGoogleMap((props) =>
        <GoogleMap defaultZoom={14} defaultCenter={{ lat: book.geo.lat, lng: book.geo.lng }}>
            {props.isMarkerShown && <Circle defaultCenter={{ lat: book.geo.lat, lng: book.geo.lng }} radius={1000} options={options}/>}
        </GoogleMap>)));

        return (
            <Fragment>
            <Grid container spacing={6}>
                {loading ? (<CircularProgress className={classes.progressBook}/>): (
                    <Grid item xs={12}>
                        <BookDetails book={book} />
                    </Grid>)}
            </Grid>
            <Grid container spacing={6}>
                <Grid item sm={4} xs={12}>
                <Typography variant="h5" color="primary">{t('Geolocation')}: </Typography>
                    {loading ? (<CircularProgress className={classes.progressBook}/>):((typeof(book.geo) === "undefined")?(<Paper elevation={2}><center><br /><Typography variant="body1" color="textPrimary">No map available</Typography><br /></center></Paper>) : (<MyMapComponent
                        isMarkerShown
                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC9ycD9EfrxCYfKThb-v-QZoMk-CKt6Eus&libraries=geometry,drawing,places"
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `400px` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                        />))}
                </Grid>
                <Grid item sm={8} xs={12}>
                    <Typography variant="h5" color="primary">{t('Comments')}: </Typography>
                        {loading ? (<CircularProgress className={classes.progressBook}/>) : ((comments.length === 0) ? (
                            <Fragment>
                                <List className={classes.list}>
                                    <ListItem>
                                        <ListItemText>{t('noComment')}</ListItemText>
                                    </ListItem>
                                </List>
                            </Fragment>
                        ) :(comments.map((comment, index)=>
                            <Fragment>
                            <List className={classes.list}>
                                <ListItem key={comment.userHandle+"-"+comment.createdAt}>
                                    <ListItemAvatar>
                                        <Avatar alt="avatar" src={comment.userImage} />
                                    </ListItemAvatar>
                                    <ListItemText primary={<Typography className={classes.commentFont}> {comment.userHandle} </Typography>}secondary={`${dayjs(comment.createdAt).fromNow()} - ${comment.body}`}/>
                                </ListItem>
                                {index!==(comments.length-1) ?(<Divider />):null}
                                </List>
                            </Fragment>
                        )))}
                </Grid>
            </Grid>
            </Fragment>
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
const book1 = withTranslation()(book);
export default connect(mapStateToProps, {getBookData})(withStyles(styles)(book1));
