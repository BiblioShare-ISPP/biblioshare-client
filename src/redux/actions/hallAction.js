import { SET_HALL, SET_UNAUTHENTICATED_HALL, LOADING_HALL, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, LOADING_RESIDENTS, SET_RESIDENTS } from '../types';
import axios from 'axios';

export const loginHall = (hallData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post('/hall/login', hallData)
    .then((res) => {
        setAuthorizationHeader(res.data.token);
        dispatch(getHallData());
        dispatch({ type: CLEAR_ERRORS});
        history.push('/hall/');
    })
    .catch((err) => {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        });
    });
};

export const getHallData = () => (dispatch) => {
    dispatch({ type: LOADING_HALL});
    axios.get('/hall')
    .then((res) => {
        dispatch({
            type: SET_HALL,
            payload: res.data
        })
    })
    .catch((err) => {
        console.log(err);
    });
};

export const logoutHall = () => (dispatch) => {
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({ type: SET_UNAUTHENTICATED_HALL });
    window.location.href = '/hall/login';
};


const setAuthorizationHeader = (token) => {
    const FBIdToken = `Hall ${token}`;
    localStorage.setItem('FBIdToken', FBIdToken);
    axios.defaults.headers.common['Authorization'] = FBIdToken;
};

export const getResidents = (location) => (dispatch) => {
    dispatch({ type: LOADING_RESIDENTS});
    axios.get(`/users/${location}`)
    .then((res) => {
        dispatch({
            type: SET_RESIDENTS,
            payload: res.data
        })
    })
    .catch((err) => {
        console.log(err);
    });
};