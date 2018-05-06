import { events } from 'Constants/ActionTypes';
import { toast } from 'react-toastify';
import api from 'api';

export const fetchEvents = () => async dispatch => {
  dispatch({
    type: events.FETCH_EVENTS_START,
  });

  try {
    const response = await api.get('/events');

    dispatch({
      type: events.FETCH_EVENTS_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    toast.error('❌ Failed to fetch events');
  }
};