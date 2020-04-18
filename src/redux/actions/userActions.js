import {SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED, LOADING_USER, SET_PROFILE, LOADING_PROFILE, UPDATE_TICKETS, EDIT_PROFILE, AD_IMAGE_UPLOADED_PROFILE} from '../types';
import axios from 'axios';

export const loginUser = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post('/login', userData)
    .then((res) => {
        setAuthorizationHeader(res.data.token);
        dispatch(getUserData());
        dispatch({ type: CLEAR_ERRORS});
        history.push('/');
    })
    .catch((err) => {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        });
    });
};

export const signupUser = (newUserData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post('/signup', newUserData)
    .then((res) => {
        setAuthorizationHeader(res.data.token);
        dispatch(getUserData());
        dispatch({ type: CLEAR_ERRORS});
        history.push('/');
    })
    .catch((err) => {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        });
    });
};

export const getProfileData = (userHandle) => (dispatch) => {
    dispatch({ type: LOADING_PROFILE });
    axios.get(`/user/${userHandle}`)
    .then((res) => {
        dispatch({
            type: SET_PROFILE,
            payload: res.data
        });
    })
    .catch((err) => {
        console.log(err);
    });
};

export const updateUser = (newUserData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post('/update', newUserData)
    .then((res) => {
        setAuthorizationHeader(res.data.token);
        dispatch(getUserData());
        dispatch({ type: CLEAR_ERRORS});
        history.push('/');
    })
    .catch((err) => {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        });
    });
};

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({ type: SET_UNAUTHENTICATED });
};

export const getUserData = () => (dispatch) => {
    dispatch({ type: LOADING_USER});
    axios.get('/user')
    .then((res) => {
        dispatch({
            type: SET_USER,
            payload: res.data
        })
    })
    .catch((err) => {
        console.log(err);
    });
};

const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`;
    localStorage.setItem('FBIdToken', FBIdToken);
    axios.defaults.headers.common['Authorization'] = FBIdToken;
};

export const editUserDetails = (userDetails) => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios.post('/user', userDetails)
      .then(res => {
        dispatch({ type: EDIT_PROFILE, payload: res.data});
        dispatch(getUserData());
      })
      .catch((err) => console.log(err));
  };
  
  export const uploadImage = (formData) => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios
      .post('/user/image', formData)
      .then((res) => {
        dispatch({
            type: AD_IMAGE_UPLOADED_PROFILE,
            payload: res.data.imageUrl
        });
        return res.data.coverURL;
      })
      .catch((err) => console.log(err));
  };


  export const updateTickets = (handle,tickets) => (dispatch) => {
    axios.post(`/user/${handle}/${tickets}`)
    .then((res) => {
        dispatch({ type: UPDATE_TICKETS, payload: tickets})
    })
    .catch(err => console.log(err));
}