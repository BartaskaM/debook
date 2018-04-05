import { combineReducers } from 'redux';

import devices from './devicesReducer';
import auth from './authReducer';
import devicesDetails from './deviceDetailsReducer';
//If needed, import other reducers here and add them to function below.

export default combineReducers({
  devices,
  auth,
  devicesDetails,
});