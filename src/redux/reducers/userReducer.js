import {SET_USER, SET_AUTHENTICATED, SET_UNAUTHENTICATED, LOADING_USER, SET_PROFILE, LOADING_PROFILE, REQUEST_BOOK } from '../types';

const initialState = {
    authenticated: false,
    loading: false,
    loadingProfile: true,
    credentials: {},
    requests: [],
    notifications: []
};

export default function(state= initialState, action){
    switch(action.type){
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            };
            case SET_UNAUTHENTICATED:
                return initialState;
            case SET_USER:
                return {
                    ...state,
                    authenticated: true,
                    loading: false,
                    ...action.payload
                };
            case LOADING_USER:
                return {
                    ...state,
                    loading: true
                };
            case LOADING_PROFILE:
                return {
                    ...state,
                    loadingProfile: true
                };
            case REQUEST_BOOK:
                return {
                    ...state,
                    requests: [
                        ...state.requests,
                        {
                            userHandle: state.credentials.handle,
                            bookId: action.payload.bookId,
                            bookOwner: action.payload.owner,
                            status: 'pending',
                            cover: action.payload.cover,
                            title: action.payload.title
                        }
                    ]
                }
            case SET_PROFILE:
                return {
                    ...state,
                    loadingProfile: false,
                    userData: action.payload
                };
            default:
                return state;
    }
}