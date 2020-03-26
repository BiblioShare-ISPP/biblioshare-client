import { SET_ERRORS, CLEAR_ERRORS, LOADING_UI, ISBN_CHECKED, CHECKING_ISBN, ISBN_ERRORS, COVER_UPLOADED, AD_IMAGE_UPLOADED } from '../types';

const initialState = {
    loading: false,
    loadingISBN: false,
    errors: null,
    coverUploaded: null,
    adImageUploaded: null
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
                coverUploaded: null,
                errors: null
            }
        case LOADING_UI:
            return {
                ...state,
                loading: true
            };
        case COVER_UPLOADED:
            return{
                ...state,
                loading: false,
                coverUploaded: action.payload
            }
        case AD_IMAGE_UPLOADED:
            return{
                ...state,
                loading: false,
                adImageUploaded: action.payload
            }
        case CHECKING_ISBN:
            return {
                ...state,
                loadingISBN: true,
                errors: null
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
}