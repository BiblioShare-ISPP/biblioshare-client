import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import jwtDecode from 'jwt-decode';

//REDUX
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { SET_AUTHENTICATED_HALL } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';
//Components
import Navbar from './components/Navbar';
import AuthRoute from './util/AuthRoute';
import themeFile from './util/theme';

//Pages
import home from './pages/home';
import book from './pages/book';
import login from './pages/login';
import signup from './pages/signup';
import request from './pages/request';
import find from './pages/find';
import axios from 'axios';
import myrequest from './pages/myrequest';
import user from './pages/user';
import hall from './pages/hall';
import hallLogin from './pages/hallLogin';
import hallSignup from './pages/hallSignup';
import { logoutHall, getHallData } from './redux/actions/hallAction';

const theme = createMuiTheme(themeFile);

axios.defaults.baseURL = 'https://europe-west1-ispp-99815.cloudfunctions.net/api';

const token = localStorage.FBIdToken;
if(token){
  const decodedToken = jwtDecode(token);
  if(decodedToken.exp * 1000 < Date.now()){
    if(token.startsWith('Bearer')){
      store.dispatch(logoutUser());
      window.location.href = '/login';
    }else{
      store.dispatch(logoutHall());
      window.location.href = '/hall/login';
    }
  }else{
    if(token.startsWith('Bearer')){
      store.dispatch({ type: SET_AUTHENTICATED });
      axios.defaults.headers.common['Authorization'] = token;
      store.dispatch(getUserData());
    }else{
      store.dispatch({ type: SET_AUTHENTICATED_HALL });
      axios.defaults.headers.common['Authorization'] = token;
      store.dispatch(getHallData());
    }
  }
}

function App() {
  return (
    <MuiThemeProvider theme ={theme}>
      <Provider store={store}>
        <Router>
        <Navbar/>
        <div className="container">
            <Switch>
              <Route exact path="/" component={home}/>
              <AuthRoute exact path="/login" component={login}/>
              <AuthRoute exact path="/signup" component={signup}/>
              <AuthRoute exact path="/hall/login" component={hallLogin}/>
              <AuthRoute exact path="/hall/signup" component={hallSignup}/>

              <Route exact path="/hall" component={hall}/>
              <Route exact path='/requests/:handle' component={request}/>
              <Route exact path="/myRequests" component={myrequest}/>
              <Route exact path="/books/:bookId" component={book} />
              <Route exact path="/find/:keyword" component={find} />
              <Route exact path="/users/:handle" component={user} />
            </Switch>
        </div>
        </Router>
    </Provider>
    </MuiThemeProvider>
  );
}

export default App;
