import { offices } from 'Constants/ActionTypes';
import api from 'api';

export const showAddOfficeModal = (bool) => {
  return { type: offices.SHOW_ADD_OFFICE_MODAL, payload: bool };
};
export const setOffices = (officeArray) => {
  return { type: offices.SET_OFFICES, payload: officeArray };
};
export const addOffice = (office) => {
  //Temp solution for setting id
  const newOfficeID = Math.floor(Math.random() * 10000) + 1;
  office['id'] = newOfficeID;
  //---------------------------
  return { type: offices.ADD_OFFICE, payload: office, newOfficeID};
};
export const fetchOffices = () => async dispatch => {
  try{
    dispatch({
      type: offices.FETCH_OFFICES_START,
    });
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