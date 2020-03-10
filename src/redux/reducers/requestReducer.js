import { SET_REQUESTS, LOADING_DATA, ACCEPTED_REQUEST, REJECTED_REQUEST, REQUEST_BOOK} from '../types';

const initialState = {
    requests: [],
    loading: false,
    request:{}
};

export default function (state= initialState, action){
    switch (action.type){
        case REQUEST_BOOK:
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            }
        case SET_REQUESTS:
            return{
                loading: true,
                requests: action.payload,
                
            }
        case ACCEPTED_REQUEST:
            let index = state.requests.findIndex(
                (request) => request.requestId === action.payload.requestId
              );
              
                state.requests[index].status = 'accepted' ;
              
              return {
                ...state,
                loading: true,
                
              };
        case REJECTED_REQUEST:
            let index1 = state.requests.findIndex(
                (request) => request.requestId === action.payload.requestId
              );
              
            state.requests[index1].status = 'rejected' ;
              
              return {
                ...state,
                loading: true,
                
              };
        default:
            return state;
    }
};