import { requestDetails } from 'Constants/ActionTypes';

const defaultState = {
  request: null,

  createMessageLoading: false,
  createMessageErrorMessage: null,
  showAddMessageModal: false,

  fetchRequestLoading: false,
  resolveRequestLoading: false,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case requestDetails.FETCH_REQUEST_START: {
      return {
        ...state,
        fetchRequestLoading: true,
      };
    }
    case requestDetails.FETCH_REQUEST_SUCCESS: {
      return {
        ...state,
        fetchRequestLoading: false,
        request: action.payload,
      };
    }
    case requestDetails.FETCH_REQUEST_ERROR: {
      return {
        ...state,
        fetchRequestLoading: false,
      };
    }
    case requestDetails.CREATE_MESSAGE_START: {
      return {
        ...state,
        createMessageLoading: true,
        createMessageErrorMessage: null,
      };
    }
    case requestDetails.CREATE_MESSAGE_SUCCESS: {
      const updatedRequest = state.request;
      updatedRequest.messages = [...state.request.messages, action.payload];

      return {
        ...state,
        createMessageLoading: false,
        showAddMessageModal: false,
        request: updatedRequest,
      };
    }
    case requestDetails.CREATE_MESSAGE_ERROR: {
      return {
        ...state,
        createMessageLoading: false,
        createMessageErrorMessage: action.payload,
      };
    }
    case requestDetails.SHOW_ADD_MESSAGE_MODAL: {
      return { ...state, showAddMessageModal: action.payload };
    }
    case requestDetails.RESOLVE_REQUEST_START: {
      return {
        ...state,
        resolveRequestLoading: true,
      };
    }
    case requestDetails.RESOLVE_REQUEST_SUCCESS: {
      return {
        ...state,
        resolveRequestLoading: false,
      };
    }
    case requestDetails.RESOLVE_REQUEST_ERROR: {
      return {
        ...state,
        resolveRequestLoading: false,
      };
    }
    default: return state;
  }
};