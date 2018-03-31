import { auth } from 'Constants/ActionTypes';

export const setUserInfo = (userInfo) => {
  return { type: auth.SET_USER_INFO, payload: userInfo };
};

export const logOutUser = () => {
  return { type: auth.LOG_OUT_USER };
};