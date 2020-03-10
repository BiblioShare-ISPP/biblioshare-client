import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import RequestButton from './RequestButton';
//MUI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

// Redux
import { connect } from 'react-redux';

const styles = {
    card: {
        display: 'flex',
        marginBottom: 20,
    },
    image:{
        minWidth: 150,
    },
    content: {
        padding: 25,
        objectFit: 'cover',
        width: '100%'
    },
    requestButton: {
       float: 'right'
    }
};

class Book extends Component {
    render() {
        dayjs.extend(relativeTime);
        const { classes, book: {bookId, title, author, cover, owner, ownerImage, userPostDate, location}, user: {authenticated,credentials: { handle }}} = this.props;
        let isOwner = (owner === handle) ? true : false;
        return (
            <Card className={classes.card}>
                <CardMedia image={cover} title="Cover image" className={classes.image}/>
                <CardContent className={classes.content}>
                    <Typography variant="h5" component={Link} to={`/books/${bookId}`} color="primary">{title}</Typography>
                    <Typography variant="body2" color="textSecondary">{author}</Typography>
                    <Typography variant="body2" color="textSecondary">Place: {location}</Typography>
                    <Avatar alt={owner} src={ownerImage}/><Typography variant="body1" component={Link} to={`/users/${owner}`} color="primary">{owner}</Typography>
                    <Typography className={classes.date} variant="body2" color="textSecondary">Posted: {dayjs(userPostDate).fromNow()}</Typography>
                    { (!isOwner && authenticated) ? (
                    <RequestButton bookId={bookId} />
                    ) : null}
                </CardContent>
            </Card>
        );
    }
}

Book.propTypes = {
    user: PropTypes.object.isRequired,
    book: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
  });
  

export default connect(mapStateToProps)(withStyles(styles)(Book));
