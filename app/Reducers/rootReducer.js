import { combineReducers } from 'redux';

import auth from './authReducer';
import users from './usersReducer';
import userDetails from './userDetailsReducer';
import devices from './devicesReducer';
import devicesDetails from './deviceDetailsReducer';

//If needed, import other reducers here and add them to function below.
export default combineReducers({
  auth,
  users,
  userDetails,
  devices,
  devicesDetails,
});