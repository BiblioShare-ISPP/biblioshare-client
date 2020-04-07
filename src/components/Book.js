import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import RequestButton from './RequestButton';
import DeleteBook from './DeleteBook';
import { withTranslation } from 'react-i18next';
//MUI
import Button from '@material-ui/core/Button';
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
    },
   noTickets: {
        float: 'right',
        
   }
};

class Book extends Component {

    render() {
        dayjs.extend(relativeTime);
        const { classes, book: {bookId, title, author, cover, owner, ownerImage, userPostDate, location, availability}, user: {authenticated,credentials: { handle,tickets }}} = this.props;
        const { t } = this.props;
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
                    <Typography variant="body2" color="primary">{t('status')}: {availability}</Typography>
                    <Typography variant="body2" color="textSecondary">{t('place')}: {location}</Typography>
                    <Avatar alt={owner} src={ownerImage}/><Typography variant="body1" component={Link} to={`/users/${owner}`} color="primary">{owner}</Typography>
                    <Typography className={classes.date} variant="body2" color="textSecondary">{t('posted')}: {dayjs(userPostDate).fromNow()}</Typography>
                    { (!isOwner && authenticated && availability === 'available' && tickets >1) ? (
                    <RequestButton bookId={bookId} />
                    ) : null}
                    { (!isOwner && authenticated && availability === 'available' && tickets < 1) ? (
                    <Button component={Link} variant="contained" color="primary" className={classes.noTickets} to="/ticket">
                    {t('noTickets')}
                    </Button>
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
  
const Book1 = withTranslation()(Book)
export default connect(mapStateToProps)(withStyles(styles)(Book1));
