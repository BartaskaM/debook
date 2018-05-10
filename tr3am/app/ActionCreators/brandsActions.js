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
    toast.error('❌ Failed to fetch brands');
  }
};

export const createBrand = (brand) => async (dispatch) => {
  dispatch({ 
    type: brands.CREATE_BRAND_START,
  });
  
  try {
    const response = await api.post('/brands', brand);
    brand['id'] = response.data;
    brand['models'] = [];
    dispatch({
      type: brands.CREATE_BRAND_SUCCESS,
      payload: brand,
    });
    toast.success('✅ Brand created successfully');
  } catch (e) {
    dispatch({ 
      type: brands.CREATE_BRAND_ERROR, 
    });
    toast.error(`❌ Failed to create brand: ${e.response.data.message}`);
  }
};

export const showCreateBrandModal = () => dispatch => {
  dispatch ({ 
    type: brands.SHOW_CREATE_BRAND_MODAL, 
    payload: { showCreateBrandModal: true }, 
  });
};

export const hideCreateBrandModal = () => {
  return { type: brands.HIDE_CREATE_BRAND_MODAL };
};