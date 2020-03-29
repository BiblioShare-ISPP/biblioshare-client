import {
    SET_USER, SET_AUTHENTICATED, SET_UNAUTHENTICATED, LOADING_USER, SET_PROFILE, LOADING_PROFILE,
    REQUEST_BOOK, ACCEPTED_REQUEST, DELETE_BOOK, POST_BOOK, DELETE_REQUEST, UPDATE_TICKETS,  EDIT_PROFILE
} from '../types';


const initialState = {
    authenticated: false,
    loading: false,
    loadingProfile: true,
    credentials: {},
    requests: [],
    notifications: [],
    userData: {},
    isHallMember: false,
    hallImage: '',
    image: null,
    description: null    
};

export default function (state = initialState, action) {
    switch (action.type) {
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
                userData: action.payload,
            };
        case ACCEPTED_REQUEST:
            return {
                ...state,
                credentials: {
                    ...state.credentials,
                    tickets: state.credentials.tickets + 1
                }
            };
        case DELETE_BOOK:
            if (state.userData.books !== undefined) {
                let index = state.userData.books.findIndex(book => book.bookId === action.payload);
                state.userData.books.splice(index, 1);
            }
            return {
                ...state
            };
        case POST_BOOK:
            if (state.userData.books !== undefined) {
                state.userData.books.unshift(action.payload);
            }
            return {
                ...state,
            }
        case DELETE_REQUEST:

            let index3 = state.requests.findIndex(request => request.bookId === action.payload);
            state.requests.splice(index3, 1);

            return {
                ...state
            }
        
        case UPDATE_TICKETS:
            return {
                ...state,
                credentials: {
                    ...state.credentials,
                    tickets: state.credentials.tickets + action.payload,
                    }
                };
        case EDIT_PROFILE:
            return {
                ...state,
                credentials: {
                    ...state.credentials,
                    bio: action.payload.bio,
                    location: action.payload.location
                    }
                    
                };
        default:
            return state;
    }
}