import * as at from 'Constants/ActionTypes';

export const setUserInfo = (userInfo) => {
  return { type: at.auth.SET_USER_INFO, payload: userInfo };
};

export const logOutUser = () => {
  return { type: at.auth.LOG_OUT_USER };
};