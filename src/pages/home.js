import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

import Book from '../components/Book';

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
        let recentBooksMarkup = this.state.books ? (
            this.state.books.map(book => <Book key={book.bookId} book={book}/>)
        ) : <p>Loading...</p>
        return (
            <Grid container spacing={6}>
                <Grid item sm={8} xs={12}>
                    {recentBooksMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <p> Profile </p>
                </Grid>
            </Grid>
        )
    }
}

export default home
