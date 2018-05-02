import { deviceDetails } from 'Constants/ActionTypes';

const defaultState = {
  device: null,
  showLocationModal: false,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case deviceDetails.SET_DEVICE_DETAILS: {
      return { ...state, device: action.payload };
    } 
    case deviceDetails.HIDE_LOCATION_MODAL: {
      return { ...state, showLocationModal: false };
    }
    case deviceDetails.SHOW_LOCATION_MODAL: {
      return {
        ...state,
        showLocationModal: true,
      };
    }
    case deviceDetails.FETCH_DEVICE_START: {
      return {...state, fetchDeviceLoading: true, fetchDeviceErrorMessage: null};
    }
    case deviceDetails.FETCH_DEVICE_SUCCESS: {
      return {...state, fetchDeviceLoading: false, device: action.payload};
    }
    case deviceDetails.FETCH_DEVICE_ERROR: {
      return {...state, fetchDeviceLoading: false, fetchDeviceErrorMessage: action.payload};
    }
    default: return state;
  }
};