import api from 'api';
import { userDetails } from 'Constants/ActionTypes';

export const fetchUser = (userId) => async dispatch => {
  dispatch({ type: userDetails.FETCH_USER_START });
  try{
    const response = await api.get(`users/${userId}`);
    console.log(response);
    dispatch({
      type: userDetails.FETCH_USER_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    dispatch({
      type: userDetails.FETCH_USER_SUCCESS,
      payload: e.response.data.message,
    });
  }
};

export const setUserDetails = (user) => ({
  type: userDetails.SET_USER_DETAILS,
  payload: user,
});