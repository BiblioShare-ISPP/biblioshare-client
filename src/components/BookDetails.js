import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import PropTypes from 'prop-types';

//MUI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

//Redux
import {connect} from 'react-redux';
import {bookRequest} from '../redux/actions/dataAction';


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
    },
    button: {
        width: '100%',
        height: 'fit-content !important',
    },
    contentButton: {
        width: '20%',
        height: 'fit-content !important',
        
    }
    
};

class BookDetails extends Component {

    render() {
        dayjs.extend(relativeTime);
        const { classes, loading, 
            book: {bookId, title, author, cover, owner, ownerImage, userPostDate, location},
            user: {
                credentials: { handle, imageUrl, locationUser, bio, tickets}, 
                authenticated
            }} = this.props; 

            return (
            <Fragment>
            <Card className={classes.card}>
                <CardMedia image={cover} title="Cover image" className={classes.image}/>
                <CardContent className={classes.content}>
                    <Typography variant="h5" component={Link} to={`/books/${bookId}`} color="primary">{title}</Typography>
                    
                    <Typography variant="body2" color="textSecondary">{author}</Typography>
                    <Typography variant="body2" color="textSecondary">Posted: {dayjs(userPostDate).fromNow()}</Typography>
                    <Typography variant="body2" color="textSecondary">Place: {location}</Typography>
                    <Avatar alt={owner} src={ownerImage}/><Typography variant="body1" component={Link} to={`/users/${owner}`} color="primary">{owner}</Typography>
                </CardContent>
                
                <CardContent className={classes.contentButton}>

                {this.props.book.owner === handle ? (
                    
                        <Button onClick={this.bookRequest} type="submit" variant="contained" color="primary" className={classes.button} disabled>
                                Este es tu libro! 
                                {loading && (
                                    <CircularProgress size={30} className={classes.progressSpinner} />
                                )}
                            </Button>

                    ): (
                        <Button  onClick={this.bookRequest} type="submit" variant="contained" color="primary" className={classes.button} disabled={loading}>
                        LO QUIERO! 
                        {loading && (
                            <CircularProgress size={30} className={classes.progressSpinner} />
                        )}
                    </Button>
                )}

                </CardContent>

            </Card>
            <Typography variant="body2" color="textSecondary">Comments: </Typography>

            </Fragment>
         );
    }

    bookRequest = (event) => {
        event.preventDefault();
        this.props.bookRequest({ 
            bookId: this.props.book.bookId,
        });
    };

    
}


BookDetails.propTypes = {
    bookRequest: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    UI: state.UI,
    data: state.data,
    user: state.user,
    handle: state.user.credentials.handle
});

const mapActionsToProps= {bookRequest};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(BookDetails));
