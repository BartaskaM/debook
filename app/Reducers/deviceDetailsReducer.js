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
    default: return state;
  
    case deviceDetails.HIDE_LOCATION_MODAL: {
      return { ...state, showLocationModal: false };
    }
    case deviceDetails.SHOW_LOCATION_MODAL: {
      const {
        selectedDevice,
      } = action.payload;
      return {
        ...state,
        showLocationModal: true,
        selectedDevice,
      };
    }
  }
};