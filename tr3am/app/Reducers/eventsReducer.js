import { events } from 'Constants/ActionTypes';

const defaultState = {
  events: [],

  fetchEventsLoading: false,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case events.FETCH_EVENTS_START: {
      return {
        ...state,
        fetchEventsLoading: true,
      };
    }
    case events.FETCH_EVENTS_SUCCESS: {
      return {
        ...state,
        fetchEventsLoading: false,
        events: action.payload,
      };
    }
    default: return state;
  }
};