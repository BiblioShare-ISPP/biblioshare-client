import { POST_BOOK, SET_BOOKS, LOADING_DATA } from '../types';

const initialState = {
    books: [],
    book: [],
    loading: false
};

export default function (state= initialState, action){
    switch (action.type){
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            }
        case SET_BOOKS:
            return{
                ...state,
                books: action.payload
            }
        case POST_BOOK:
            return {
                ...state,
                books: [
                    action.payload,
                    ...state.books
                ]
            }
        default:
            return state;
    }
};