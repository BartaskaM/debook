import { auth } from 'Constants/ActionTypes';
import axios from 'axios';

export const logIn = (logInInfo) => {
  return dispatch => {
    dispatch({type: auth.LOG_IN_START});
    axios.post('api/login', logInInfo)
      .then( response => dispatch({
        type: auth.LOG_IN,
        payload: response.data,
      }))
      .catch( () => dispatch({
        type: auth.LOG_IN_ERROR,
      }));
      
  };
};

export const logOutUser = () => {
  return { type: auth.LOG_OUT_USER };
};