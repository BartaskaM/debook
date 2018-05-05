import api from 'api';
import { toast } from 'react-toastify';
import { userDetails, auth } from 'Constants/ActionTypes';

export const fetchUser = (userId) => async dispatch => {
  dispatch({ type: userDetails.FETCH_USER_START });
  try{
    const response = await api.get(`/users/${userId}`);
    dispatch({
      type: userDetails.FETCH_USER_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    toast.error('❌ Failed to fetch user details');
  }
};

export const setUserDetails = (user) => ({
  type: userDetails.SET_USER_DETAILS,
  payload: user,
});

export const updateUser = (userInfo, finish, self) => async dispatch => {
  dispatch({ type: userDetails.UPDATE_USER_START });
  try{
    await api.put(`/users/${userInfo.id}`, { ...userInfo, officeId: userInfo.office.id });
    dispatch({
      type: userDetails.UPDATE_USER_SUCCESS,
    });
    if(self){
      dispatch({
        type: auth.UPDATE_LOGGED_IN_USER,
        payload: userInfo,
      });
      toast.success('✏️ Profile updated successfully');
    }
    else {
      toast.success('✏️ User updated successfully');
    }
    dispatch(setUserDetails(userInfo));
    finish();
  } catch (e) {
    dispatch({
      type: userDetails.UPDATE_USER_ERROR,
      payload: e.response.data.message,
    });
    toast.error(`❌ Failed to update user details: ${e.response.data.message}`);
  }
};