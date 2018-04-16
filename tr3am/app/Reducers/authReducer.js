import { auth }from 'Constants/ActionTypes';

const defaultState = {
  user: null,
  fetching: false,
  showError: false,
};

export default (state = defaultState, action) => {
  switch (action.type){
    case auth.LOG_IN: {
      return { ...state, fetching: false, user: action.payload };
    }
    case auth.LOG_IN_START: {
      return { ...state, fetching: true, showError: false };
    }
    case auth.LOG_IN_ERROR: {
      return { ...state, fetching: false, showError: true };
    }
    case auth.LOG_OUT_USER: {
      return { ...state, user: null };
    }
    default: return state;
  }
};