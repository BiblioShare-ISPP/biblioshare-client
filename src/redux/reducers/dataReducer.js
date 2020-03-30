import { POST_BOOK,  SET_BOOKS, SET_BOOK, LOADING_DATA, CHECK_ISBN, DELETE_BOOK, SET_OFFERS, POST_COMMENT} from '../types';

const initialState = {
    books: [],
    book: [],
    comments: [],
    isbn: [],
    loading: false,
    loadingISBN: false,
    offers: []
};

export default function (state= initialState, action){
    switch (action.type){
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            };
        case SET_BOOKS:
            return{
                ...state,
                loading: false,  
                books: action.payload
            };
        case SET_BOOK:
            return{
                ...state,
                loading: false,
                book: action.payload,
                comments: action.payload.comments
            };
        case POST_BOOK:
            return {
                ...state,
                books: [
                    action.payload,
                    ...state.books
                ]
            };
        case POST_COMMENT:
            state.book.comments.unshift(action.payload);
            return {
                ...state,
            }
        case CHECK_ISBN:
            return{
                ...state,
                isbn: [
                    action.payload
                ]
            };
        case DELETE_BOOK:
            
            let index = state.books.findIndex(book => book.bookId === action.payload);
            state.books.splice(index,1);
            
            return {
                ...state
            }
        case SET_OFFERS:
            return{
                ...state,
                loading: false,  
                offers: action.payload
            };
        default:
            return state;
    }
}