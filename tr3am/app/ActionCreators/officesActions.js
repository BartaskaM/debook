import { offices } from 'Constants/ActionTypes';
import { toast } from 'react-toastify';
import api from 'api';

export const fetchOffices = () => async dispatch => {
  dispatch({
    type: offices.FETCH_OFFICES_START,
  });

  try {
    const response = await api.get('/offices');

    dispatch({
      type: offices.FETCH_OFFICES_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    dispatch({
      type: offices.FETCH_OFFICES_ERROR,
      payload: e.toString(),
    });
    toast.error('❌ Failed to fetch offices');
  }
};

export const createOffice = (office, history) => async (dispatch) => {
  dispatch({ 
    type: offices.CREATE_OFFICE_START,
  });
  
  try {
    const response = await api.post('/offices', office);
    office['id'] = response.data;
    
    history.push(`/offices/${response.data}`);

    dispatch({
      type: offices.CREATE_OFFICE_SUCCESS,
      payload: office,
    });
    toast.success('✅ Office created successfully');
  } catch (e) {
    dispatch({ 
      type: offices.CREATE_OFFICE_ERROR, 
      payload: e.response.data.message, 
    });
    toast.error(`❌ Failed to create office: ${e.response.data.message}`);
  }
};
export const showAddOfficeModal = (bool) => {
  return { type: offices.SHOW_ADD_OFFICE_MODAL, payload: bool };
};