import { deviceDetails } from 'Constants/ActionTypes';
import deviceDetailsList from 'Constants/DeviceDetails';
//import { toast } from 'react-toastify'; TODO
import store from 'Store';

export const getDeviceWithId = (deviceId) => {
  const device = deviceDetailsList.find(device => device.id === deviceId);
  if (device) {
    return { type: deviceDetails.SET_DEVICE_DETAILS, payload: device };
  }
  return new Error(`Failed to find device with id: ${deviceId}`);
};
export const hideLocationModal = () => {
  return { type: deviceDetails.HIDE_LOCATION_MODAL };
};
export const showLocationModal = () => {
  return { 
    type: deviceDetails.SHOW_LOCATION_MODAL, 
  };
};
export const changeDeviceLocation = (location) => {
  const device = store.getState().deviceDetails.device;
  device.location = location;
  return { type: deviceDetails.SET_DEVICE_DETAILS, payload: device };
};
export const changeDevice = (device) => {
  return { type: deviceDetails.SET_DEVICE_DETAILS, payload: device };
};
