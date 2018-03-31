import * as at from 'Constants/ActionTypes';

export const setUsers = (usersArray) => {
  return { type: at.users.SET_USERS, payload: usersArray };
};