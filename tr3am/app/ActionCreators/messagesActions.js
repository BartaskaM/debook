import { messages } from 'Constants/ActionTypes';
import { toast } from 'react-toastify';
import api from 'api';

export const fetchMessages = (requestId) => async dispatch => {
  dispatch({
    type: messages.FETCH_MESSAGES_START,
  });

  try {
    const response = await api.get(`/requests/${requestId}`);
    
    dispatch({
      type: messages.FETCH_MESSAGES_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    dispatch({
      type: messages.FETCH_MESSAGES_ERROR,
    });
    toast.error('❌ Failed to fetch messages');
  }
};

export const createMessage = (message, history) => async (dispatch) => {
  dispatch({ 
    type: messages.CREATE_MESSAGE_START,
  });
  
  try {
    await api.post('/messages', message);
    
    history.push('/requests');

    dispatch({
      type: messages.CREATE_MESSAGE_SUCCESS,
      payload: message,
    });
    toast.success('✅ Message created successfully');
  } catch (e) {
    dispatch({ 
      type: messages.CREATE_MESSAGE_ERROR, 
      payload: e.response.data.message, 
    });
    toast.error(`❌ Failed to create a message: ${e.response.data.message}`);
  }
};
export const showAddMessageModal = (bool) => {
  return { type: messages.SHOW_ADD_MESSAGE_MODAL, payload: bool };
};