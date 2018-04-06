import { combineReducers } from 'redux';

import devices from './devicesReducer';
import auth from './authReducer';
import users from './usersReducer';
import userDetails from './userDetailsReducer';

//If needed, import other reducers here and add them to function below.

export default combineReducers({
  devices,
  auth,
  users,
  userDetails,
});