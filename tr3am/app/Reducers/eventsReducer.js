import { events } from 'Constants/ActionTypes';

const defaultState = {
  events: [],
  count: 0,

  fetchEventsLoading: false,
  fetchEventsErrorMessage: null,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case events.FETCH_EVENTS_START: {
      return {
        ...state,
        fetchEventsLoading: true,
        fetchEventsErrorMessage: null,
      };
    }
    case events.FETCH_EVENTS_SUCCESS: {
      const { events, count } = action.payload;
      return {
        ...state,
        fetchEventsLoading: false,
        events,
        count,
      };
    }
    case events.FETCH_EVENTS_ERROR: {
      return {
        ...state,
        fetchEventsLoading: false,
        fetchEventsErrorMessage: action.payload,
      };
    }
    default: return state;
  }
};