import { users } from 'Constants/ActionTypes';

const defaultState = {
  users: [],
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case users.SET_USERS: {
      return { ...state, users: [...action.payload] };
    }
    default: return state;
  }
};