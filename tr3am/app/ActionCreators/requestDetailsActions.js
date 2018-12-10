import { requestDetails } from 'Constants/ActionTypes';
import { toast } from 'react-toastify';
import api from 'api';

export const fetchRequestWithId = (requestId, history) => async (dispatch) => {
  dispatch({
    type: requestDetails.FETCH_REQUEST_START,
  });

  try {
    const response = await api.get(`/requests/${requestId}`);
    dispatch({
      type: requestDetails.FETCH_REQUEST_SUCCESS,
      payload: {
        ...response.data,
        createdAt: new Date(response.data.createdAt),
        expectedDate: new Date(response.data.expectedDate),
        resolvedAt: response.data.resolvedAt ? new Date(response.data.resolvedAt) : null,
        messages: response.data.messages.map(message => {
          return {
            ...message,
            createdAt: new Date(message.createdAt),
          };
        }),
      },
    });
  } catch (e) {
    dispatch({
      type: requestDetails.FETCH_REQUEST_ERROR,
    });
    const errorMessageSplit = e.toString().split(' ');
    const errorCode = parseInt(errorMessageSplit[errorMessageSplit.length - 1]);
    history.push(`/${errorCode}`);
    
    toast.error('❌ Failed to fetch request details');
  }
};

export const fetchMessages = (requestId) => async dispatch => {
  dispatch({
    type: requestDetails.FETCH_MESSAGES_START,
  });

  try {
    const response = await api.get(`/requests/${requestId}`);

    dispatch({
      type: requestDetails.FETCH_MESSAGES_SUCCESS,
      payload: {
        ...response.data,
        createdAt: new Date(response.data.createdAt),
      },
    });
  } catch (e) {
    dispatch({
      type: requestDetails.FETCH_MESSAGES_ERROR,
    });
    toast.error('❌ Failed to fetch messages');
  }
};

export const createMessage = (message) => async (dispatch) => {
  dispatch({
    type: requestDetails.CREATE_MESSAGE_START,
  });

  try {
    const response = await api.post('/messages', message);

    dispatch({
      type: requestDetails.CREATE_MESSAGE_SUCCESS,
      payload: {
        ...response.data,
        createdAt: new Date(response.data.createdAt),
      },
    });
    toast.success('✅ Message created successfully');
  } catch (e) {
    dispatch({
      type: requestDetails.CREATE_MESSAGE_ERROR,
      payload: e.response.data.message,
    });
    toast.error(`❌ Failed to create a message: ${e.response.data.message}`);
  }
};

export const changeRequestStatus = (requestId, status, history) => async (dispatch) => {
  dispatch({
    type: requestDetails.RESOLVE_REQUEST_START,
  });

  try {
    await api.post(`/requests/${requestId}/status`, {status: status});

    dispatch({
      type: requestDetails.RESOLVE_REQUEST_SUCCESS,
    });

    history.push('/requests');

  } catch (e) {
    dispatch({
      type: requestDetails.RESOLVE_REQUEST_ERROR,
      payload: e.response.data.message,
    });
    toast.error(`❌ Failed to create a message: ${e.response.data.message}`);
  }
};

export const showAddMessageModal = (bool) => {
  return { type: requestDetails.SHOW_ADD_MESSAGE_MODAL, payload: bool };
};