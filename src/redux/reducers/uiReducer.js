import { SET_ERRORS, CLEAR_ERRORS, LOADING_UI, ISBN_CHECKED, CHECKING_ISBN, ISBN_ERRORS, COVER_UPLOADED, AD_IMAGE_UPLOADED, SET_AD,
        SET_ERRORS_HALL, CLEAR_ERRORS_HALL, CHANGE_AVAILABLE } from '../types';

const initialState = {
    loading: false,
    loadingISBN: false,
    errors: null,
    coverUploaded: null,
    adImageUploaded: null
};

export default function(state= initialState, action){
    switch(action.type){
        case SET_ERRORS_HALL:
            return {
                ...state,
                loading:false,
                errors: action.payload
            };
        case CLEAR_ERRORS_HALL:
            return {
                ...state,
                loading: false,
                coverUploaded: null,
                adImageUploaded: null,
                errors: null
            }
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
                adImageUploaded: null,
                errors: null
            }
        case SET_AD:
            return{
                ...state,
                loading: false,
                adImageUploaded: null,
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
        case CHANGE_AVAILABLE:
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }
}