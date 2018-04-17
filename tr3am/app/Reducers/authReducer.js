import { auth }from 'Constants/ActionTypes';

const defaultState = {
  user: null,
  fetching: false,
  showError: false,
  currentTab: 0,
  fetchingSignUp: false,
  signUpError: ' ',
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
    case auth.SET_CURRENT_TAB: {
      return { ...state, currentTab: action.payload };
    }
    case auth.SIGN_UP_START: {
      return { ...state, fetchingSignUp: true, signUpError: ' ' };
    }
    case auth.SIGN_UP_SUCCESS: {
      return { ...state, fetchingSignUp: false, currentTab: 0 };
    }
    case auth.SIGN_UP_ERROR: {
      return { ...state, fetchingSignUp: false, signUpError: action.payload };
    }
    default: return state;
  }
};