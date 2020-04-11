import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {Link} from 'react-router-dom';
import RequestButton from './RequestButton';
import PropTypes from 'prop-types';
import CustomButton from '../util/CustomButton';

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
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import CreateIcon from '@material-ui/icons/Create';
import { red } from '@material-ui/core/colors';

import { deleteBook, commentBook } from '../redux/actions/dataAction';

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
        margin: '0px 5px 0px 5px'
        
   },
   closeButton: {
    position: 'absolute',
    right: '3%',
    top: '3%'
    },
    submitButton: {
        position: 'relative',
        margin: '10px 5px 0px 0px'
    },
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

class BookDetails extends Component {
    state = {
        open: false,
        body: '',
        errors: {}
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({
                body: '',
                errors: nextProps.UI.errors
            });
        }
        if(!nextProps.UI.errors && !nextProps.UI.loading){
            this.setState({ 
                body: '',
                open: false,
                errors: {}
            });
        }
    }
    handleOpen = () => {
        this.setState({ open: true });
    };
    handleClose = () => {
        this.setState({ 
            open: false,
            body: '',
            errors: {}
        });
    };
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.commentBook({ 
            bookId: this.props.book.bookId,
            body: this.state.body,
        });
    };
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };
    deleteBook = () => {
        this.props.deleteBook(this.props.book.bookId);
    }
    render() {
        dayjs.extend(relativeTime);
        const { classes, book: {bookId, title, author, cover, owner, ownerImage, userPostDate, location, availability, price},  user: {authenticated,credentials: { handle, tickets }},  UI: {loading}} = this.props;
        const { errors } = this.state;
        let isOwner = (owner === handle) ? true : false;
        const deleteButton = authenticated && owner === handle && availability === 'available' ? (
            <MyButton  tip="Delete Book" onClick={this.deleteBook}   btnClassName={classes.deleteButton}>
                    <a  btnClassName={classes.iconDelete} href={`/users/${owner}`}><DeleteOutline color="error"/> </a>
            </MyButton>
        ): null
        return (
            <Fragment>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <CustomButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon />
                    </CustomButton>
                    <DialogTitle>Post a comment</DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>
                            <TextField id="body" name="body" placeholder="Comment" InputProps={{startAdornment: ( <InputAdornment position="start"> <CreateIcon color="primary" /> </InputAdornment>),}} error={errors.body ? true : false } helperText={errors.body} onChange={this.handleChange} fullWidth/>
                            <Button type="submit" variant="contained" color="primary" className={classes.submitButton} disabled={loading}>
                                Submit 
                                {loading && (
                                    <CircularProgress size={30} className={classes.progressSpinner} />
                                )}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            <Card className={classes.card}>
                <CardMedia image={cover} title="Cover image" className={classes.image}/>
                <CardContent className={classes.content}>
                    {deleteButton}
                    <Typography variant="h5" color="primary">{title}</Typography>
                    <Typography variant="body2" color="textSecondary">{author}</Typography>
                    <Typography variant="body2" color="primary">Status: {availability}</Typography>
                    <Typography variant="body2" color="textSecondary">Posted: {dayjs(userPostDate).fromNow()}</Typography>
                    <Typography variant="body2" color="textSecondary">Place: {location}</Typography>
                    <Avatar alt={owner} src={ownerImage}/><Typography variant="body1" component={Link} to={`/users/${owner}`} color="primary">{owner}</Typography>
                    { authenticated ? (
                        <Button variant="contained" color="primary" className={classes.noTickets} onClick={this.handleOpen}>
                            Post a comment
                        </Button>
                    ) : null}
                    { (!isOwner && authenticated && availability === 'available' && tickets > 1) ? (
                    <RequestButton bookId={bookId} price={price}/>
                    ) : null}
                    { (!isOwner && authenticated && availability === 'available' && tickets < price) ? (
                    <ColorButton component={Link} variant="contained" className={classes.noTickets} to="/ticket">
                    Buy tickets
                    </ColorButton>
                    ) : null}
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
    UI: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
  });

const mapActionsToProps = {
    deleteBook,
    commentBook
}
  

export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(BookDetails));
