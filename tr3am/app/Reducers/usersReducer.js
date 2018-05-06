import { users } from 'Constants/ActionTypes';

const defaultState = {
  users: [],

  fetchUsersLoading: false,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case users.FETCH_USERS_START: {
      return {
        ...state,
        fetchUsersLoading: true,
      };
    }
    case users.FETCH_USERS_SUCCESS: {
      return {
        ...state,
        fetchUsersLoading: false,
        users: action.payload,
      };
    }
    default: return state;
  }
};