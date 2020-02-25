import {LOADING_UI, POST_BOOK, SET_ERRORS, CLEAR_ERRORS, LOADING_DATA, SET_BOOKS } from '../types';
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

//Upload cover
export const uploadImage = (formData) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post('/book/cover', formData)
    .then(res => {
        dispatch(get)
    });

};