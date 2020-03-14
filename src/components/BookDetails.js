import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
//MUI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import MyButton from '../util/MyButton';
import DeleteOutline from '@material-ui/icons/DeleteOutline';

// Redux
import { connect } from 'react-redux';
import { deleteBook } from '../redux/actions/dataAction';

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
        objectFit: 'cover'
    },
    deleteButton: {
        position: 'absolute',
        left: '85%',
        bottom:'75%',
        color: 'red'
    },
   
    
};

class BookDetails extends Component {
    deleteBook = () => {
        this.props.deleteBook(this.props.book.bookId);
    }
    render() {
        dayjs.extend(relativeTime);
        const { classes, book: {bookId, title, author, cover, owner, ownerImage, userPostDate, location, availability}, user: {authenticated,credentials: { handle }}} = this.props;
        const deleteButton = authenticated && owner === handle && availability === 'available' ? (
            <MyButton  tip="Delete Book" onClick={this.deleteBook}  btnClassName={classes.deleteButton}>
                    <a  btnClassName={classes.iconDelete} href={`/users/${owner}`}><DeleteOutline /> </a>
                </MyButton>
        ): null
        return (
            <Fragment>
            <Card className={classes.card}>
                <CardMedia image={cover} title="Cover image" className={classes.image}/>
                <CardContent className={classes.content}>
                    {deleteButton}
                    <Typography variant="h5" component={Link} to={`/books/${bookId}`} color="primary">{title}</Typography>
                    <Typography variant="body2" color="textSecondary">{author}</Typography>
                    <Typography variant="body2" color="textSecondary">Posted: {dayjs(userPostDate).fromNow()}</Typography>
                    <Typography variant="body2" color="textSecondary">Place: {location}</Typography>
                    <Avatar alt={owner} src={ownerImage}/><Typography variant="body1" component={Link} to={`/users/${owner}`} color="primary">{owner}</Typography>
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
   
}

const mapStateToProps = (state) => ({
    user: state.user
  });

const mapActionsToProps = {
    deleteBook,
    
    
}

export  default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(BookDetails));
