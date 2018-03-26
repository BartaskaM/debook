import {combineReducers} from 'redux';

import devices from './devicesReducer';

//If needed, import other reducers here and add them to function below.

export default combineReducers({
  devices,
});