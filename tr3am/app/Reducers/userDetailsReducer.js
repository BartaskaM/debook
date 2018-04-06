import { userDetails } from 'Constants/ActionTypes';

const defaultState = {
  user: null,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case userDetails.SET_USER_DETAILS: {
      return { ...state, user: action.payload };
    }
    default: return state;
  }
};