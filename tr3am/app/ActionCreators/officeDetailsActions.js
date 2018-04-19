import { officeDetails } from 'Constants/ActionTypes';
import api from 'api';

export const fetchOfficeWithId = (officeId) => async (dispatch) => {
  dispatch({
    type: officeDetails.FETCH_OFFICE_START,
  });

  try {
    const response = await api.get(`offices/${officeId}`);
    dispatch({
      type: officeDetails.FETCH_OFFICE_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    dispatch({
      type: officeDetails.FETCH_OFFICE_ERROR,
      payload: e.toString(),
    });
  }
};

export const updateOfficeWithId = (officeData) => async (dispatch) => {
  dispatch({
    type: officeDetails.UPDATE_OFFICE_START,
  });

  try {
    api.put(`offices/${officeData.id}`, { ...officeData });

    dispatch({
      type: officeDetails.UPDATE_OFFICE_SUCCESS,
      payload: { id: officeData.id, office: officeData },
    });
  } catch (e) {
    dispatch({ type: officeDetails.UPDATE_OFFICE_ERROR });
  }
};