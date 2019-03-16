import axios from 'axios';
import { returnErrors } from './errorActions';

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from './types';

// Get User Profile
export const loadUserProfile = () => (dispatch, getState) => {
  // Set user loading
  dispatch({ type: USER_LOADING });

  // Get user profile request
  axios
    .get('/api/userProfile', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.msg, err.response.status));
      dispatch({ type: AUTH_ERROR });
    });
};

// Register User

// Login User

// Build Token Config
export const tokenConfig = getState => {
  // getState() will return the entire state, including error and user state, so we must access it by name given in the reducers index
  // Currently stored in local storage
  const token = getState().user.token;

  // Create headers object
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  if (token) config.headers['user-token'] = token;

  return config;
};
