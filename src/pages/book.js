import React, { Component , Fragment } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

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
        return (
            <Grid container spacing={6}>
                {loading ? (<CircularProgress className={classes.progressBook}/>): (
                    <Grid item xs={12}>
                        <BookDetails book={book} />
                    </Grid>)}
                <Grid item xs={12}>
                <Typography variant="h5" color="primary">Comments: </Typography>
                    {loading ? (<CircularProgress className={classes.progressBook}/>) : ((comments.length === 0) ? (
                        <Fragment>
                            <List className={classes.list}>
                                <ListItem>
                                    <ListItemText>There arent any comment yet...</ListItemText>
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

export default connect(mapStateToProps, {getBookData})(withStyles(styles)(book));
