import { auth } from 'Constants/ActionTypes';

export const setUserInfo = (userInfo) => {
  return { type: auth.SET_USER_INFO, payload: userInfo };
};