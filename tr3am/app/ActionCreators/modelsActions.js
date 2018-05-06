import { models } from 'Constants/ActionTypes';
import { toast } from 'react-toastify';
import api from 'api';

export const fetchModels = () => async dispatch => {
  dispatch({
    type: models.FETCH_MODELS_START,
  });
  
  try {
    const response = await api.get('/models');
  
    dispatch({
      type: models.FETCH_MODELS_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    dispatch({
      type: models.FETCH_MODELS_ERROR,
      payload: e.toString(),
    });
    toast.error('❌ Failed to fetch models');
  }
};
  
export const createModel = (model) => async (dispatch) => {
  dispatch({ 
    type: models.CREATE_MODEL_START,
  });
    
  try {
    const response = await api.post('/models', model);
    model['id'] = response.data;

    dispatch({
      type: models.CREATE_MODEL_SUCCESS,
      payload: model,
    });
    toast.success('✅ Model created successfully');
  } catch (e) {
    dispatch({ 
      type: models.CREATE_MODEL_ERROR, 
      payload: e.response.data.message, 
    });
    
    toast.error(`❌ Failed to create model: ${e.response.data.message}`);
  }
};