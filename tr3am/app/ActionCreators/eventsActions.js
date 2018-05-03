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
      payload: response.data.map(event => ({...event, createdOn: new Date(event.createdOn)})),
    });
  } catch (e) {
    dispatch({
      type: events.FETCH_EVENTS_ERROR,
      payload: e.toString(),
    });
    toast.error('❌ Failed to fetch events');
  }
};