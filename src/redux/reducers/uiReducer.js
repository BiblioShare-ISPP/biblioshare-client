import { SET_ERRORS, CLEAR_ERRORS, LOADING_UI, ISBN_CHECKED, CHECKING_ISBN, ISBN_ERRORS } from '../types';

const initialState = {
    loading: false,
    loadingISBN: false,
    errors: null
};

export default function(state= initialState, action){
    switch(action.type){
        case SET_ERRORS:
            return {
                ...state,
                loading:false,
                errors: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                loading: false,
                errors: null
            }
        case LOADING_UI:
            return {
                ...state,
                loading: true
            };
        case CHECKING_ISBN:
            return {
                ...state,
                loadingISBN: true
            };
        case ISBN_ERRORS:
            return {
                ...state,
                loadingISBN: false,
                errors: action.payload
            };
        case ISBN_CHECKED:
            return {
                ...state,
                loadingISBN: false,
                errors: null
            };
        default:
            return state;
    }
};