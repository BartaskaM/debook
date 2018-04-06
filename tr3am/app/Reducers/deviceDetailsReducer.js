import { deviceDetails } from 'Constants/ActionTypes';

const defaultState = {
  device: null,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case deviceDetails.SET_DEVICE_DETAILS: {
      return { ...state, device: action.payload };
    }
    default: return state;
  }
};