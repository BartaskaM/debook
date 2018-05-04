import { auth }from 'Constants/ActionTypes';

const defaultState = {
  user: null,
  fetchingLogIn: false,
  logInError: false,
  currentTab: 0,
  fetchingSignUp: false,
  signUpError: null,
};

export default (state = defaultState, action) => {
  switch (action.type){
    case auth.LOG_IN_SUCCESS: {
      return { ...state, fetchingLogIn: false, user: action.payload };
    }
    case auth.LOG_IN_START: {
      return { ...state, fetchingLogIn: true, logInError: false };
    }
    case auth.LOG_IN_ERROR: {
      return { ...state, fetchingLogIn: false, logInError: true };
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
    case auth.UPDATE_LOGGED_IN_USER: {
      return{ ...state, user: action.payload };
    }
    default: return state;
  }
};