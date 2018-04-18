import { officeDetails } from 'Constants/ActionTypes';
import officeList from 'Constants/Offices';

export const getOfficeWithId = (officeId) => async (dispatch) => {
  dispatch({ type: officeDetails.GET_OFFICE_BEGIN });

  try {
    const responseData = officeList.find(office => office.id === officeId);

    if (responseData) {
      dispatch({
        type: officeDetails.GET_OFFICE_SUCCESS,
        payload: responseData,
      });
    } else {
      throw new Error(`Failed to find office with id: ${officeId}`);
    }
  } catch (e) {
    dispatch({ type: officeDetails.GET_OFFICE_ERROR });
  }
};

export const updateOfficeWithId = (officeData) => async (dispatch) => {
  dispatch({ type: officeDetails.UPDATE_OFFICE_BEGIN });

  try {
    dispatch({
      type: officeDetails.UPDATE_OFFICE_SUCCESS,
      payload: { id: officeData.id, office: officeData },
    });
  } catch (e) {
    dispatch({ type: officeDetails.UPDATE_OFFICE_ERROR });
  }
};