import { events } from 'Constants/ActionTypes';
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
    dispatch({
      type: events.FETCH_EVENTS_ERROR,
      payload: e.toString(),
    });
  }
};