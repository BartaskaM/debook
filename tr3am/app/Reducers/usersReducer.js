import { users } from 'Constants/ActionTypes';

const defaultState = {
  users: [],

  fetchUsersLoading: false,
  fetchUsersErrorMessage: null,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case users.FETCH_USERS_START: {
      return {
        ...state,
        fetchUsersLoading: true,
        fetchUsersErrorMessage: null,
      };
    }
    case users.FETCH_USERS_SUCCESS: {
      return {
        ...state,
        fetchUsersLoading: false,
        users: action.payload,
      };
    }
    case users.FETCH_USERS_ERROR: {
      return {
        ...state,
        fetchUsersLoading: false,
        fetchUsersErrorMessage: action.payload,
      };
    }
    default: return state;
  }
};