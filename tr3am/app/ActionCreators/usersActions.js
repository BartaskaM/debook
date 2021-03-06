import { users } from 'Constants/ActionTypes';
import { toast } from 'react-toastify';
import api from 'api';

export const fetchUsers = () => async dispatch => {
  dispatch({
    type: users.FETCH_USERS_START,
  });

  try {
    const response = await api.get('/users');

    dispatch({
      type: users.FETCH_USERS_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    dispatch({
      type: users.FETCH_USERS_ERROR,
    });
    toast.error('❌ Failed to fetch users');
  }
};