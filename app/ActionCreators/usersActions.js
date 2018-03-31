import { users } from 'Constants/ActionTypes';

export const setUsers = (usersArray) => {
  return { type: users.SET_USERS, payload: usersArray };
};