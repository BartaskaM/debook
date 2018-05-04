import { events } from 'Constants/ActionTypes';
import { toast } from 'react-toastify';
import api from 'api';

export const fetchEvents = (page, pageSize, callback) => async dispatch => {
  dispatch({
    type: events.FETCH_EVENTS_START,
  });

  try {
    const response = await api.get(`/events?page=${page}&pageSize=${pageSize}`);

    dispatch({
      type: events.FETCH_EVENTS_SUCCESS,
      payload: {
        events: response.data.events.map(event => ({
          ...event,
          createdOn: new Date(event.createdOn),
        })),
        count: response.data.count,
      },
    });
    callback && callback();
  } catch (e) {
    dispatch({
      type: events.FETCH_EVENTS_ERROR,
      payload: e.toString(),
    });
    toast.error('❌ Failed to fetch events');
  }
};
