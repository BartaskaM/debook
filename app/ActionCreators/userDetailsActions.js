import * as at from 'Constants/ActionTypes';
import userDetailsList from 'Constants/User';

export const getUserWithID = (userId) => {
  const user = userDetailsList.find(user => user.id == userId);
  if (user) {
    return { type: at.userDetails.SET_USER_DETAILS, payload: user };
  }
  return new Error(`Failed to find user with id: ${userId}`);
};