import { combineReducers } from 'redux';

import auth from './authReducer';
import users from './usersReducer';
import userDetails from './userDetailsReducer';
import offices from './officesReducer';
import officeDetails from './officeDetailsReducer';
import devices from './devicesReducer';
import deviceDetails from './deviceDetailsReducer';

//If needed, import other reducers here and add them to function below.
export default combineReducers({
  auth,
  users,
  userDetails,
  offices,
  officeDetails,
  devices,
  deviceDetails,
});