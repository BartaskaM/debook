import { requests } from 'Constants/ActionTypes';

const defaultState = {
  requests: [],
  
  fetchRequestsLoading: false,

  createRequestLoading: false,
  createRequestsErrorMessage: null,

  showAddRequestModal: false,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case requests.FETCH_REQUESTS_START: {
      return {
        ...state,
        fetchRequestsLoading: true,
      };
    }
    case requests.FETCH_REQUESTS_SUCCESS: {
      return {
        ...state,
        fetchRequestsLoading: false,
        requests: action.payload,
      };
    }
    case requests.FETCH_REQUESTS_ERROR: {
      return {
        ...state,
        fetchRequestsLoading: false,
      };
    }
    case requests.CREATE_REQUEST_START: {
      return {
        ...state,
        createRequestLoading: true,
        createRequestErrorMessage: null,
      };
    }
    case requests.CREATE_REQUEST_SUCCESS: {
      return {
        ...state,
        createRequestLoading: false,
        requests: [...state.requests, action.payload],
      };
    }
    case requests.CREATE_REQUEST_ERROR: {
      return {
        ...state,
        createRequestLoading: false,
        createRequestErrorMessage: action.payload,
      };
    }

    case requests.SHOW_ADD_REQUEST_MODAL: {
      return { ...state, showAddRequestModal: action.payload };
    }
    default: return state;
  }
};