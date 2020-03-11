import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

import relativeTime from 'dayjs/plugin/relativeTime';

//MUI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { green, red } from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';
import {connect} from 'react-redux';
import {acceptedRequest, rejectedRequest } from '../redux/actions/requestAction';
import PropTypes from 'prop-types';

const styles = {
    progress: {
        margin: '20% 50%',
    },
    card: {
        display: 'flex',
        marginBottom: 20,
    },
    content: {
        padding: 25,
        objectFit: 'cover'
    },
    '& svg.button': {
        '&:hover': {
        cursor: 'pointer'
        }
    },
    margin: {
        margin: '10px 10px'
    },
    image:{
        minWidth: 100,
    }
    
    
};

const theme = createMuiTheme({
    palette: {
      primary: green,
    },
   
  });

  const theme1 = createMuiTheme({
    palette: {
      primary: red,
    },
    
  });

class Request extends Component {
  
    acceptedRequest = () => {
        this.props.acceptedRequest(this.props.request.requestId);
    }
    rejectedRequest = () => {
        this.props.rejectedRequest(this.props.request.requestId);
    }
    
    render() {
        dayjs.extend(relativeTime);
        const { classes, request: { title, cover, bookId, bookOwner, userHandle, status, createdAt } } = this.props;
        let button;
        if(status === 'pending' && bookOwner === this.props.user.credentials.handle){
            button= <div className={classes.buttons}>
                    
            <ThemeProvider theme={theme}>
                <Button variant="contained" color="primary" className={classes.margin} onClick={this.acceptedRequest}>
                    Accepted
                </Button>
            </ThemeProvider>
            <ThemeProvider theme={theme1}>
                <Button variant="contained" color="primary" className={classes.margin} onClick={this.rejectedRequest}>
                    Rejected
                </Button>
            </ThemeProvider>
            </div>
        }
        let owner;
        if(bookOwner !== this.props.user.credentials.handle){
           owner = <Typography variant="body2" color="textSecondary">Owner: {bookOwner}</Typography>
        }
        let applicant;
        if(bookOwner === this.props.user.credentials.handle){
            applicant = <Typography variant="body2" color="textSecondary">Applicant: {userHandle}</Typography>
         }
        return (
            <Card className={classes.card}>
                <CardMedia image={cover} title="Cover image" className={classes.image}/>
                <CardContent className={classes.content}>
                    <Typography variant="h5" color="textPrimary" component={Link} to={`/books/${bookId}`}>{title}</Typography>
                    {owner} 
                    {applicant}
                    <Typography variant="body2" color="textSecondary">Posted: {dayjs(createdAt).fromNow()}</Typography>
                    <Typography variant="body2" color="primary">Status: {status}</Typography>
                    {button}
                        
                    
                    
                </CardContent>
            </Card >
        );
    }
}

Request.propTypes = {
    acceptedRequest: PropTypes.func.isRequired,
    rejectedRequest: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    request: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    data: state.request,
    user: state.user,
   
});

const mapActionsToProps = {
    acceptedRequest,
    rejectedRequest,
    
}


export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Request));
