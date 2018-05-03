import { brands } from 'Constants/ActionTypes';
import { toast } from 'react-toastify';
import api from 'api';

export const fetchBrands = () => async dispatch => {
  dispatch({
    type: brands.FETCH_BRANDS_START,
  });

  try {
    const response = await api.get('/brands');

    dispatch({
      type: brands.FETCH_BRANDS_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    dispatch({
      type: brands.FETCH_BRANDS_ERROR,
      payload: e.toString(),
    });
    toast.error('❌ Failed to fetch brands');
  }
};