import { combineReducers } from 'redux';

import auth from './authReducer';
import users from './usersReducer';
import userDetails from './userDetailsReducer';
import offices from './officesReducer';
import officeDetails from './officeDetailsReducer';
import devices from './devicesReducer';
import deviceDetails from './deviceDetailsReducer';
import brands from './brandsReducer';
import events from './eventsReducer';
import { auth as authConst } from 'Constants/ActionTypes';

//If needed, import other reducers here and add them to function below.
const appReducers = combineReducers({
  auth,
  users,
  userDetails,
  offices,
  officeDetails,
  devices,
  deviceDetails,
  brands,
  events,
});

export default (state, action) => {
  if (action.type === authConst.LOG_OUT_USER_SUCCESS) {
    state = undefined;
  }

  return appReducers(state, action);
};