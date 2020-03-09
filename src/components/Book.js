import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

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
import { request } from 'http';

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
        width: "100%",
    },
    button: {
        float: 'right',
        width: "30%",
        
    }
    
};

class Book extends Component {
   
    isMybook() {
        this.props.user.requests.forEach(req => {
            if (this.props.book.bookId === req.bookId ){
                return true;
            } else{
                return false;
            }
        });
    }
    
    render() {
        dayjs.extend(relativeTime);
        const { classes, loading, 
            book: {bookId, title, author, cover, owner, ownerImage, userPostDate, location},
            user: {
                credentials: { handle, imageUrl, locationUser, bio, tickets}, 
                authenticated
            }} = this.props;

        const requests = this.props.user.requests;

       
    

        return (
            <Card className={classes.card}>
                <CardMedia image={cover} title="Cover image" className={classes.image}/>
                <CardContent className={classes.content}>
                    <Typography variant="h5" component={Link} to={`/books/${bookId}`} color="primary">{title}</Typography>
                    <Typography variant="body2" color="textSecondary">{author}</Typography>
                    <Typography variant="body2" color="textSecondary">Posted: {dayjs(userPostDate).fromNow()}</Typography>
                    <Typography variant="body2" color="textSecondary">Place: {location}</Typography>
                    <Avatar alt={owner} src={ownerImage}/><Typography variant="body1" component={Link} to={`/users/${owner}`} color="primary">{owner}</Typography>
                </CardContent>
                
                {this.props.book.owner === handle ? (
                   
                   

                    <Button style={{ cursor: 'not-allowed' }} onClick={this.bookRequest} type="submit" variant="contained" color="primary" className={classes.button} disabled>
                        LO QUIERO!
                        {loading && (
                            <CircularProgress size={30} className={classes.progressSpinner} />
                        )}
                    </Button>

                ): (

                    
                        <Button  onClick={this.bookRequest} type="submit" variant="contained" color="primary" className={classes.button} disabled={this.isMybook}>
                        LO QUIERO! 
                        {loading && (
                            <CircularProgress size={30} className={classes.progressSpinner} />
                        )}
                    </Button>

                    

                    
                )}
                
                


            </Card>
        );
    }

    bookRequest = (event) => {
        event.preventDefault();
        this.props.bookRequest({ 
            bookId: this.props.book.bookId,
        });
        console.log(this.props.user.requests);
    };


}


Book.propTypes = {
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

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Book));
