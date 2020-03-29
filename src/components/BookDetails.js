import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {Link} from 'react-router-dom';
import RequestButton from './RequestButton';
import CommentForm from './CommentForm';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';

//MUI
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import MyButton from '../util/MyButton';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import ChatIcon from '@material-ui/icons/Chat';
import { deleteBook } from '../redux/actions/dataAction';
import IconButton from '@material-ui/core/IconButton';

import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';


const styles = {
    card: {
        display: 'flex',
        marginBottom: 20,
    },
    image:{
        minWidth: 200,
    },
    content: {
        padding: 25,
        objectFit: 'cover',
        width: '100%'
    },
    deleteButton: {
        float: 'right'   
    },
    noTickets: {
        float: 'right',
        
   }
};

class BookDetails extends Component {
    deleteBook = () => {
        this.props.deleteBook(this.props.book.bookId);
    }
    mapUserDetailsToState = (credentials) => {
        this.setState({
            bio: credentials.bio ? credentials.bio : '',
            location: credentials.location ? credentials.location : ''
        });
    };
    handleOpen = () => {
        this.setState({ open: true });
        this.mapUserDetailsToState(this.props.credentials);
    };
    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        dayjs.extend(relativeTime);
        const { classes, book: {bookId, title, author, cover, owner, ownerImage, userPostDate, location, availability, commentCount,  comments},  user: {authenticated,credentials: { handle, tickets }}} = this.props;
        let isOwner = (owner === handle) ? true : false;
        const deleteButton = authenticated && owner === handle && availability === 'available' ? (
            <MyButton  tip="Delete Book" onClick={this.deleteBook}   btnClassName={classes.deleteButton}>
                    <a  btnClassName={classes.iconDelete} href={`/users/${owner}`}><DeleteOutline color="error"/> </a>
            </MyButton>
        ): null
        return (
            <Fragment>
            <Card className={classes.card}>
                <CardMedia image={cover} title="Cover image" className={classes.image}/>
                <CardContent className={classes.content}>
                    {deleteButton}
                    <Typography variant="h5" color="primary">{title}</Typography>
                    <Typography variant="body2" color="textSecondary">{author}</Typography>
                    <Typography variant="body2" color="primary">Status: {availability}</Typography>
                    <Typography variant="body2" color="textSecondary">Posted: {dayjs(userPostDate).fromNow()}</Typography>
                    <Typography variant="body2" color="textSecondary">Place: {location}</Typography>
                    <Avatar alt={owner} src={ownerImage}/>
                    <Typography variant="body1" component={Link} to={`/users/${owner}`} color="primary">{owner}</Typography>
                    <IconButton tip="comments">
                        <ChatIcon color="primary"/>
                    </IconButton>
                     <span>{commentCount} comments</span>
                     <hr className={classes.visibleSeparator} />
                    { (!isOwner && authenticated && availability === 'available' && tickets > 1) ? (
                    <RequestButton bookId={bookId} />
                    ) : null}
                     { (!isOwner && authenticated && availability === 'available' && tickets < 1) ? (
                    <Button component={Link} variant="contained" color="primary" className={classes.noTickets} to="/ticket">
                    You don´t have any tickets
                    </Button>
                    ) : null}
                    <Button component={Link} variant="contained" color="primary" className={classes.noTickets} onClick={this.handleOpen}
                    tip="Comment Book">
                        Comment Book</Button>
                </CardContent>
            </Card>
            </Fragment>  
        )
    }
}
BookDetails.propTypes = {
    user: PropTypes.object.isRequired,
    book: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    getOffers: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
    user: state.user,
    data: state.data
  });

const mapActionsToProps = {
    deleteBook,
}
  

export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(BookDetails));
