import { offices } from 'Constants/ActionTypes';
import api from 'api';

export const fetchOffices = () => async dispatch => {
  dispatch({
    type: offices.FETCH_OFFICES_START,
  });

  try {
    const response = await api.get('offices');

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

export const addOffice = (office) => async (dispatch) => {
  dispatch({ 
    type: offices.ADD_OFFICE_START,
  });
  
  try {
    await api.post('offices', office);
    dispatch({
      type: offices.ADD_OFFICE_SUCCESS,
      payload: office,
    });
  } catch (e) {
    dispatch({ 
      type: offices.ADD_OFFICE_ERROR, 
      payload: e.toString(), 
    });
  }
};
export const showAddOfficeModal = (bool) => {
  return { type: offices.SHOW_ADD_OFFICE_MODAL, payload: bool };
};