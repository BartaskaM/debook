import { auth } from 'Constants/ActionTypes';

const defaultState = {
  user: null,
  /*  user: {
    firstName: 'vardas',
    lastName: 'pav',
    email: 'em@mail.com',
    office: {
      id: 1,
      city: 'kaunas',
    },
    roles: ['user'],
  }, */
  logInLoading: false,
  logInError: false,
  currentTab: 0,
  fetchingSignUp: false,
  signUpError: null,
  fetchUserDetailsLoading: false,
  fetchUserDetailsError: false,
  logOutUserLoading: false,
  logOutUserError: false,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case auth.LOG_IN_SUCCESS: {
      return { ...state, logInLoading: false, logInError: false };
    }
    case auth.LOG_IN_START: {
      return { ...state, logInLoading: true, logInError: false };
    }
    case auth.LOG_IN_ERROR: {
      return { ...state, logInLoading: false, logInError: true };
    }
    case auth.FETCH_USER_DETAILS_START: {
      return { ...state, fetchUserDetailsLoading: true, fetchUserDetailsError: false };
    }
    case auth.FETCH_USER_DETAILS_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        fetchUserDetailsLoading: false,
        fetchUserDetailsError: false,
      };
    }
    case auth.FETCH_USER_DETAILS_ERROR: {
      return { ...state, fetchUserDetailsLoading: false, fetchUserDetailsError: true };
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
      return { ...state, user: action.payload };
    }
    case auth.LOG_OUT_USER_START: {
      return { ...state, logOutUserLoading: true, logOutUserError: false };
    }
    case auth.LOG_OUT_USER_SUCCESS: {
      return { ...state, logOutUserLoading: false, logOutUserError: false };
    }
    case auth.LOG_OUT_USER_ERROR: {
      return { ...state, logOutUserLoading: false, logOutUserError: true };
    }
    default: return state;
  }
};