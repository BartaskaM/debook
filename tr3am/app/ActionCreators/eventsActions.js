import { events } from 'Constants/ActionTypes';
import { toast } from 'react-toastify';
import { animateScroll } from 'react-scroll';
import api from 'api';

export const fetchEvents = (page, pageSize) => async dispatch => {
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
          action: event.action
            .split(/(?=[A-Z])/)
            .map((word, i) => i != 0 ? word.toLowerCase() : word)
            .join(' '),
          createdOn: new Date(event.createdOn),
        })),
        count: response.data.count,
        page,
        pageSize,
      },
    });
    animateScroll.scrollToTop({smooth: 'easeInOutQuint'});
  } catch (e) {
    dispatch({
      type: events.FETCH_EVENTS_ERROR,
      payload: e.toString(),
    });
    toast.error('❌ Failed to fetch events');
  }
};

export const resetPaginationInfo = () => {
  return {type: events.RESET_PAGINATION_INFO};
};
