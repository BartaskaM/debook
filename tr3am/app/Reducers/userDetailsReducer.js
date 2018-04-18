import { userDetails } from 'Constants/ActionTypes';

const defaultState = {
  userDetails: null,
  fetchingUser: false,
  fetchUserError: '',
  updatingUser: false,
  updateUserError: '',
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case userDetails.SET_USER_DETAILS: {
      return { ...state, userDetails: action.payload };
    }
    case userDetails.FETCH_USER_START: {
      return { ...state, fetchingUser: true, fetchUserError: '' };
    }
    case userDetails.FETCH_USER_SUCCESS: {
      return { ...state, fetchingUser: false, userDetails: action.payload };
    }
    case userDetails.FETCH_USER_ERROR: {
      return { ...state, fetchingUser: false, fetchUserError: action.payload };
    }
    case userDetails.UPDATE_USER_START: {
      return { ...state, updatingUser: true, updateError: '' };
    }
    case userDetails.UPDATE_USER_SUCCESS: {
      return { ...state, updatingUser: false };
    }
    case userDetails.UPDATE_USER_ERROR: {
      return { ...state, updatingUser: false, updateUserError: action.payload };
    }
    default: return state;
  }
};