import { auth } from 'Constants/ActionTypes';
import { toast } from 'react-toastify';
import api from 'api';

export const logIn = (logInInfo, history) => async dispatch => {
  dispatch({type: auth.LOG_IN_START});
  try{
    const response = await api.post('/account/login', logInInfo);

    dispatch({
      type: auth.LOG_IN_SUCCESS,
    });

    dispatch(fetchUserInfo());

    toast.info(`👋 Welcome ${response.data}`);
    history.push('/devices');
  } catch(e) { 
    dispatch({
      type: auth.LOG_IN_ERROR,
    });
  }
};

export const fetchUserInfo = () => async dispatch => {
  dispatch({type: auth.FETCH_USER_DETAILS_START});

  try{
    const response = await api.get('/account/me');

    // Empty roles array means default user
    if(response.data.roles.length === 0)
    {
      response.data.roles = ['user'];
    }

    dispatch({
      type: auth.FETCH_USER_DETAILS_SUCCESS,
      payload: response.data,
    });
  } catch(e) { 
    dispatch({
      type: auth.FETCH_USER_DETAILS_ERROR,
    });
  }
};

export const logOutUser = () => async dispatch => {
  dispatch({type: auth.LOG_OUT_USER_START});

  try{
    await api.post('/account/logout');

    dispatch({
      type: auth.LOG_OUT_USER_SUCCESS,
    });
  } catch(e) { 
    dispatch({
      type: auth.LOG_OUT_USER_ERROR,
    });
  }
};

export const setCurrentTab = (tabNumber) => {
  return { type: auth.SET_CURRENT_TAB, payload: tabNumber };
};

export const signUp = (signUpData) => async(dispatch) => {
  dispatch({
    type: auth.SIGN_UP_START,
  });
  try{
    await api.post('/account/register', signUpData);
    dispatch({
      type: auth.SIGN_UP_SUCCESS,
    });
    toast.success('✅ Signed up successfully');
  }
  catch(e){
    dispatch({
      type: auth.SIGN_UP_ERROR,
      payload: e.response.data.message,
    });
    toast.error(`❌ Failed to sign up: ${e.response.data.message}`);
  }
};