import { offices } from 'Constants/ActionTypes';
import OfficeList from 'Constants/Offices';

export const getOffices = () => async (dispatch) => {
  dispatch({ type: offices.GET_OFFICES_BEGIN });

  try {
    const responseData = OfficeList;

    dispatch({
      type: offices.GET_OFFICES_SUCCESS,
      payload: responseData,
    });
  } catch (e) {
    dispatch({ type: offices.GET_OFFICES_ERROR });
  }
};
export const addOffice = (office) => async (dispatch) => {
  dispatch({ type: offices.ADD_OFFICE_BEGIN });

  try {
    //Temp solution for setting id
    office['id'] = Math.floor(Math.random() * 10000) + 1;
    //---------------------------
    dispatch({
      type: offices.ADD_OFFICE_SUCCESS,
      payload: office,
    });
  } catch (e) {
    dispatch({ type: offices.ADD_OFFICE_ERROR });
  }
};
export const showAddOfficeModal = (bool) => {
  return { type: offices.SHOW_ADD_OFFICE_MODAL, payload: bool };
};