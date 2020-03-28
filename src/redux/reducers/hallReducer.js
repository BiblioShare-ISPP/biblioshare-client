import {
    SET_HALL, SET_AUTHENTICATED_HALL, SET_UNAUTHENTICATED_HALL, LOADING_HALL, LOADING_RESIDENTS, SET_RESIDENTS, ADDING_USER, USER_ADDED, SET_AD,
    SET_STATS
} from '../types';

const initialState = {
    authenticated: false,
    loading: false,
    loadingResidents: true,
    loadingStats: true,
    credentials: {},
    residents : [],
    stats: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_AUTHENTICATED_HALL:
            return {
                ...state,
                authenticated: true
            };
        case SET_UNAUTHENTICATED_HALL:
            return initialState;
        case SET_HALL:
            return {
                ...state,
                authenticated: true,
                loading: false,
                ...action.payload
            };
        case LOADING_HALL:
            return {
                ...state,
                loading: true
            };
        case LOADING_RESIDENTS:
            return {
                ...state,
                loadingResidents: true
            }
        case SET_RESIDENTS:
            return {
                ...state,
                loadingResidents: false,
                residents: action.payload
            }
        case ADDING_USER:
            return {
                ...state,
                loadingResidents: true
        }
        case USER_ADDED:
            return {
                ...state,
                loadingResidents: false,
                credentials: {
                    ...state.credentials,
                    accounts: action.payload.accounts,
                    members: action.payload.members
                }
            }
        case SET_AD:
            return {
                ...state,
                credentials:{
                    ...state.credentials,
                    description: action.payload.description,
                    image: action.payload.image
                }
            }
        case SET_STATS:
            return {
                ...state,
                loadingStats: false,
                stats: action.payload
            }
        default:
            return state;
    }
}