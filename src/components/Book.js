import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import RequestButton from './RequestButton';
import DeleteBook from './DeleteBook';
//MUI
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { red } from '@material-ui/core/colors';

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
    },
   noTickets: {
        float: 'right', 
   }
};
const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(red[300]),
      backgroundColor: red[300],
      '&:hover': {
        backgroundColor: red[500],
      },
    },
}))(Button);

class Book extends Component {

    render() {
        dayjs.extend(relativeTime);
        const { classes, book: {bookId, title, author, cover, owner, ownerImage, userPostDate, location, availability, price}, user: {authenticated,credentials: { handle,tickets }}} = this.props;
        let isOwner = (owner === handle) ? true : false;
        const deleteButton = authenticated && owner === handle && availability === 'available' ? (
            <DeleteBook bookId={bookId}/>
        ): null
        return (
            <Card className={classes.card}>
                <CardMedia image={cover} title="Cover image" className={classes.image}/>
                <CardContent className={classes.content}>
                    {deleteButton}
                    <Typography variant="h5" component={Link} to={`/books/${bookId}`} color="primary">{title}</Typography>
                    <Typography variant="body2" color="textSecondary">{author}</Typography>
                    <Typography variant="body2" color="primary">Status: {availability}</Typography>
                    <Avatar alt={owner} src={ownerImage} component={Link} to={`/users/${owner}`}/><Typography variant="body1" component={Link} to={`/users/${owner}`} color="primary">{owner}</Typography>
                    <Typography className={classes.date} variant="body2" color="textSecondary">Posted: {dayjs(userPostDate).fromNow()} from {location}</Typography>
                    { (!isOwner && authenticated && availability === 'available' && tickets >= price) ? (
                    <RequestButton bookId={bookId} price={price}/>
                    ) : null}
                    { (!isOwner && authenticated && availability === 'available' && tickets < price) ? (
                    <ColorButton component={Link} variant="contained" className={classes.noTickets} to="/ticket">
                    Buy tickets
                    </ColorButton>
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
