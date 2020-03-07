import {LOADING_DATA, SET_REQUESTS, ACCEPTED_REQUEST, REJECTED_REQUEST } from '../types';
import axios from 'axios';


//Get all requests by user
export const getRequestsByUser = (data2) => dispatch =>{
    dispatch({ type: LOADING_DATA });
    
    axios.get(`/requestsByUser/${data2}`)
    .then(res => {
        dispatch({
            type: SET_REQUESTS,
            payload: res.data
        })
    })
    .catch((err) => {
        console.log(err);
    });
};

//Accepted a request
export const acceptedRequest = (requestId) => dispatch => {
   
    axios.get(`/request/${requestId}/accept`)
    .then( (res) => {
        dispatch({
            type:ACCEPTED_REQUEST,
            payload: res.request
        });
    })
    .catch( err => console.log(err));
};
       
//Rejected a request
export const rejectedRequest = (requestId) => (dispatch) => {
    axios.get(`/request/${requestId}/decline`)
    .then( res => {
        dispatch({
            type:REJECTED_REQUEST,
            payload: res.data
        })
    })
    .catch( err => console.log(err));
}