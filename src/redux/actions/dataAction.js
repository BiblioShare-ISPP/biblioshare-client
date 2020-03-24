import {LOADING_UI, POST_BOOK, SET_ERRORS, CLEAR_ERRORS, LOADING_DATA, SET_BOOKS, SET_BOOK, CHECK_ISBN, ISBN_CHECKED, CHECKING_ISBN, ISBN_ERRORS, COVER_UPLOADED, DELETE_BOOK, SET_OFFERS } from '../types';
import axios from 'axios';


//Get all books
export const getBooks = () => dispatch =>{
    dispatch({ type: LOADING_DATA });
    axios.get('/books')
    .then(res => {
        dispatch({
            type: SET_BOOKS,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch({
            type: SET_BOOKS,
            payload: []
        })
    });
};

//Find books
export const findBooks = (query) => dispatch =>{
    dispatch({ type: LOADING_DATA });
    axios.get(`/search/${query}`)
    .then(res => {
        dispatch({
            type: SET_BOOKS,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch({
            type: SET_BOOKS,
            payload: []
        })
    });
};

//Post a book
export const postBook = (newBook) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post('/book', newBook)
    .then((res) => {
        
        dispatch({
            type: POST_BOOK,
            payload: res.data
        });
        dispatch({ type: CLEAR_ERRORS });
    })
    .catch((err) => {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        });
    });
};

//Get book
export const getBookData = (bookId) => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios.get(`/book/${bookId}`)
    .then((res) => {
        dispatch({
            type: SET_BOOK,
            payload: res.data
        });
    })
    .catch(() => {
        dispatch({
            type: SET_BOOK,
            payload: null
        })
    });
};

//Upload cover
export const uploadImage = (formData) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post('/book/image', formData)
    .then((res) => {
        dispatch({
            type: COVER_UPLOADED,
            payload: res.data.coverURL
        });
        return res.data.coverURL;
    })
    .catch((err)=>{
        console.log(err);
    });
};

//Check ISBN
export const checkISBN = (isbn) => (dispatch) => {
    dispatch({ type: CHECKING_ISBN });
    let expresion = /^(97(8|9))?\d{9}(\d|X)$/;
    if(isbn.isbn.trim() !== "" && isbn.isbn.trim().match(expresion)){
        const Url = 'https://www.googleapis.com/books/v1/volumes?q=isbn%3D'+isbn.isbn;
        fetch(Url)
        .then((data) => {
            return data.json();
        }).then((res)=>{
            if(res.totalItems !== 0){
                dispatch({
                    type: CHECK_ISBN,
                    payload: res
                });
            }else{
                dispatch({
                    type: ISBN_ERRORS,
                    payload: JSON.parse('{ "isbn":"No results were found"}')
                });
            }
        });

        dispatch({ type: ISBN_CHECKED });
    }else{
        dispatch({
            type: ISBN_ERRORS,
            payload: JSON.parse('{ "isbn":"Incorrect ISBN"}')
        });
    }
};

//get user data

export const getUserData = (userHandle) => dispatch => {
    dispatch({type: LOADING_DATA});
    axios.get(`/user/${userHandle}`)
    .then((res) => {
        dispatch({
            type: SET_BOOKS,
            payload: res.data.books
        });
    })
    .catch(() => {
        dispatch({
            type: SET_BOOKS,
            payload: null
        })
    });
}

//Get book
export const getBooksByUser = (userHandle) => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios.get(`/books/${userHandle}`)
    .then((res) => {
        dispatch({
            type: SET_BOOK,
            payload: res.data
        });
    })
    .catch(() => {
        dispatch({
            type: SET_BOOK,
            payload: null
        })
    });
};

export const deleteBook = (bookId) => (dispatch) => {
    console.log(bookId)
    axios.delete(`/book/${bookId}`)
    
    .then(() => {
        dispatch({ type: DELETE_BOOK, payload: bookId})
    })
    .catch(err => console.log(err));
}

//Get all books
export const getOffers = () => dispatch =>{
    dispatch({ type: LOADING_DATA });
    axios.get('/offers')
    .then(res => {
        dispatch({
            type: SET_OFFERS,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch({
            type: SET_OFFERS,
            payload: []
        })
    });
};