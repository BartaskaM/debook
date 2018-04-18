import { auth } from 'Constants/ActionTypes';
import axios from 'axios';

export const logIn = (logInInfo, history) => async dispatch => {
  dispatch({type: auth.LOG_IN_START});
  try{
    const response = await axios.post('api/login', logInInfo);
    dispatch({
      type: auth.LOG_IN,
      payload: response.data,
    });
    history.push('/devices');
  } catch(e) { 
    dispatch({
      type: auth.LOG_IN_ERROR,
    });
  }
};

export const logOutUser = () => {
  return { type: auth.LOG_OUT_USER };
};

export const setCurrentTab = (tabNumber) => {
  return { type: auth.SET_CURRENT_TAB, payload: tabNumber };
};

export const signUp = (signUpData) => async(dispatch) => {
  dispatch({
    type: auth.SIGN_UP_START,
  });
  try{
    await axios.post('api/users', signUpData);
    dispatch({
      type: auth.SIGN_UP_SUCCESS,
    });
  }
  catch(e){
    dispatch({
      type: auth.SIGN_UP_ERROR,
      payload: e.response.data.message,
    });
  }
};