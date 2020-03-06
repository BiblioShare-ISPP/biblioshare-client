import { SET_REQUESTS, LOADING_DATA, ACCEPTED_REQUEST, REJECTED_REQUEST } from '../types';

const initialState = {
    requests: [],
    loading: false,
    request: {}
};

export default function (state= initialState, action){
    switch (action.type){
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            }
        case SET_REQUESTS:
            return{
                ...state,
                requests: action.payload
            }
        case ACCEPTED_REQUEST:
        case REJECTED_REQUEST:
            let index = state.requests.findIndex(
                (request) => request.requestId === action.payload.requestId
            );
            state.requests[index] = action.payload;
            return {
                ...state
            };
        default:
            return state;
    }
};