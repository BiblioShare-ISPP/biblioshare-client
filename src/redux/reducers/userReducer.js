import {SET_USER, SET_AUTHENTICATED, SET_UNAUTHENTICATED, LOADING_USER, SET_PROFILE, LOADING_PROFILE } from '../types';

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
            case SET_PROFILE:
                return {
                    ...state,
                    loadingProfile: false,
                    userData: action.payload
                };
            default:
                return state;
    }
};