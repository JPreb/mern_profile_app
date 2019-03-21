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

// Register User
export const registerUser = ({
  firstName,
  lastName,
  email,
  password
}) => dispatch => {
  // Header
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // Request body
  const body = JSON.stringify({ firstName, lastName, email, password });

  axios
    .post('/api/userReg', body, config)
    .then(res => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')
      );
      dispatch({
        type: REGISTER_FAIL
      });
    });
};

// Login User
export const loginUser = ({ email, password }) => dispatch => {
  // Create headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // Create request body
  const body = JSON.stringify({ email, password });

  axios
    .post('/api/userLogin', body, config)
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL')
      );
      dispatch({ type: LOGIN_FAIL });
    });
};

// Logout User
export const logoutUser = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

// Get User
export const loadUser = () => (dispatch, getState) => {
  // Set user loading
  dispatch({ type: USER_LOADING });

  // Get user request
  axios
    .get('/api/user', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: AUTH_ERROR });
    });
};

// Build Token Config
export const tokenConfig = getState => {
  // getState() will return the entire state, including error and user state, so we must access it by name given in the reducers index
  // Currently stored in local storage
  const token = getState().user.token;

  // Create headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  if (token) config.headers['user-token'] = token;

  return config;
};
