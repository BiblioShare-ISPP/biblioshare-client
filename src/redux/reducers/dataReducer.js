import { POST_BOOK, SET_BOOKS, SET_BOOK, LOADING_DATA, CHECK_ISBN} from '../types';

const initialState = {
    books: [],
    book: [],
    isbn: [],
    loading: false,
    loadingISBN: false
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
                book: action.payload
            };
        case POST_BOOK:
            return {
                ...state,
                books: [
                    action.payload,
                    ...state.books
                ]
            };
        case CHECK_ISBN:
            return{
                ...state,
                isbn: [
                    action.payload
                ]
            };
        default:
            return state;
    }
}