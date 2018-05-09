import { officeDetails } from 'Constants/ActionTypes';
import { toast } from 'react-toastify';
import api from 'api';

export const fetchOfficeWithId = (officeId, history) => async (dispatch) => {
  dispatch({
    type: officeDetails.FETCH_OFFICE_START,
  });

  try {
    const response = await api.get(`/offices/${officeId}`);
    dispatch({
      type: officeDetails.FETCH_OFFICE_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    const errorMessageSplit = e.toString().split(' ');
    const errorCode = parseInt(errorMessageSplit[errorMessageSplit.length - 1]);
    history.push(`/${errorCode}`);
    
    toast.error('❌ Failed to fetch office details');
  }
};

export const updateOfficeWithId = (officeData) => async (dispatch) => {
  dispatch({
    type: officeDetails.UPDATE_OFFICE_START,
  });

  try {
    api.put(`/offices/${officeData.id}`, { ...officeData });

    dispatch({
      type: officeDetails.UPDATE_OFFICE_SUCCESS,
      payload: { id: officeData.id, office: officeData },
    });
    toast.success('✏️ Office updated successfully');
  } catch (e) {
    dispatch({ 
      type: officeDetails.UPDATE_OFFICE_ERROR,
      payload: e.response.data.message,
    });
    toast.error(`❌ Failed to update user details: ${e.response.data.message}`);
  }
};