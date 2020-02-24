import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';

import Book from '../components/Book';
import Profile from '../components/Profile';

class home extends Component {
    state = {
        books: null
    }
    componentDidMount(){
        axios.get('/books')
        .then(res => {
            console.log(res.data)
            this.setState({
                books: res.data
            })
        })
        .catch(err => console.log(err));
    }
    render() {
        const styles = {
            progress: {
                margin: '20% 50%',
            }
        };

        let recentBooksMarkup = this.state.books ? (
            this.state.books.map(book => <Book key={book.bookId} book={book}/>)
        ) : <CircularProgress style={styles.progress} />
        return (
            <Grid container spacing={6}>
                <Grid item sm={8} xs={12}>
                    {recentBooksMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Profile/>
                </Grid>
            </Grid>
        )
    }
}

export default home
