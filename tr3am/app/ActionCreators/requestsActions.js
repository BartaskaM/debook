import { requests } from 'Constants/ActionTypes';
import { toast } from 'react-toastify';
import api from 'api';

export const fetchRequests = () => async dispatch => {
  dispatch({
    type: requests.FETCH_REQUESTS_START,
  });

  try {
    const response = await api.get('/requests');

    dispatch({
      type: requests.FETCH_REQUESTS_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    dispatch({
      type: requests.FETCH_REQUESTS_ERROR,
    });
    toast.error('❌ Failed to fetch requests');
  }
};

export const createRequest = (request, history) => async (dispatch) => {
  dispatch({ 
    type: requests.CREATE_REQUEST_START,
  });

  try {
    const response = await api.post('/requests', request);

    history.push(`/requests/${response.data}`);

    dispatch({
      type: requests.CREATE_REQUEST_SUCCESS,
      payload: {
        ...response.data,
        expectedDate: new Date(response.data.expectedDate),
      },
    });
    toast.success('✅ Request created successfully');
  } catch (e) {
    dispatch({ 
      type: requests.CREATE_REQUEST_ERROR, 
      payload: e.response.data.message, 
    });
    toast.error(`❌ Failed to create request: ${e.response.data.message}`);
  }
};

export const showAddRequestModal = (bool) => {
  return { type: requests.SHOW_ADD_REQUEST_MODAL, payload: bool };
};