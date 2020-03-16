import {createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducers/userReducer';
import dataReducer from './reducers/dataReducer';
import uiReducer from './reducers/uiReducer';
import requestReducer from './reducers/requestReducer'

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
    user: userReducer,
    data: dataReducer,
    UI: uiReducer,
    request: requestReducer
});

/*
const store = createStore(reducers, initialState, compose(
    applyMiddleware(...middleware))
);
*/

const store = createStore(reducers, initialState, compose(
    applyMiddleware(...middleware), 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);


export default store;