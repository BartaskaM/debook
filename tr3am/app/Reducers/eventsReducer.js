import { events } from 'Constants/ActionTypes';

const defaultState = {
  events: [],
  count: 0,
  page: 0,
  rowsPerPage: 20,

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
      const { events, count, page, pageSize } = action.payload;
      return {
        ...state,
        fetchEventsLoading: false,
        events,
        count,
        page,
        rowsPerPage: pageSize,
      };
    }
    case events.FETCH_EVENTS_ERROR: {
      return {
        ...state,
        fetchEventsLoading: false,
        fetchEventsErrorMessage: action.payload,
      };
    }
    case events.RESET_PAGINATION_INFO: {
      return {
        ...state,
        page: 0,
        rowsPerPage: 20,
        count: null,
        events: [],
      };
    }
    default: return state;
  }
};