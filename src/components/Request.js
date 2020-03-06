import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

import relativeTime from 'dayjs/plugin/relativeTime';

//MUI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { green, red } from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';

import { acceptedRequest, rejectedRequest } from '../redux/actions/requestAction';

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
    render() {
        dayjs.extend(relativeTime);
        const { classes, request: { requestId, bookId, bookOwner, userHandle, status, createdAt } } = this.props;

        return (
            <Card className={classes.card}>
                <CardContent className={classes.content}>
                    <Typography variant="h6">Request: {bookId}</Typography>
                    <Typography variant="body2" color="textSecondary">Applicant: {userHandle}</Typography>
                    <Typography variant="body2" color="textSecondary">Posted: {dayjs(createdAt).fromNow()}</Typography>
                    <Typography variant="body2" color="textSecondary">Status: {status}</Typography>
                    <div className={classes.buttons}>

                        <ThemeProvider theme={theme}>
                            <Button variant="contained" color="primary" fontColor="blank" className={classes.margin} onClick={acceptedRequest(requestId)}>
                                Accepted
                            </Button>
                        </ThemeProvider>
                        <ThemeProvider theme={theme1}>
                            <Button variant="contained" color="primary" className={classes.margin} onClick={rejectedRequest(requestId)}>
                                Rejected
                            </Button>
                        </ThemeProvider>
                </div>
                </CardContent>
            </Card >
        );
    }
}




export default (withStyles(styles)(Request));
