import { offices } from 'Constants/ActionTypes';
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
  }
};

export const createOffice = (office) => async (dispatch) => {
  dispatch({ 
    type: offices.CREATE_OFFICE_START,
  });
  
  try {
    const response = await api.post('/offices', office);
    office['id'] = response.data;
    
    dispatch({
      type: offices.CREATE_OFFICE_SUCCESS,
      payload: office,
    });
  } catch (e) {
    dispatch({ 
      type: offices.CREATE_OFFICE_ERROR, 
      payload: e.toString(), 
    });
  }
};
export const showAddOfficeModal = (bool) => {
  return { type: offices.SHOW_ADD_OFFICE_MODAL, payload: bool };
};