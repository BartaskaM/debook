import { events } from 'Constants/ActionTypes';

const defaultState = {
  events: [],

  fetchEventsLoading: false,
  fetchEventsErrorMessage: '',
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case events.FETCH_EVENTS_START: {
      return {
        ...state,
        fetchEventsLoading: true,
        fetchEventsErrorMessage: '',
      };
    }
    case events.FETCH_EVENTS_SUCCESS: {
      return {
        ...state,
        fetchEventsLoading: false,
        events: action.payload,
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