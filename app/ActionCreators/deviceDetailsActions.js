import { deviceDetails } from 'Constants/ActionTypes';
import deviceDetailsList from 'Constants/DeviceDetails';

export const getDeviceWithId = (deviceId) => {
  const device = deviceDetailsList.find(device => device.id == deviceId);
  if (device) {
    return { type: deviceDetails.SET_DEVICE_DETAILS, payload: device };
  }
  return new Error(`Failed to find device with id: ${deviceId}`);
};
export const hideLocationModal = () => {
  return { type: deviceDetails.HIDE_LOCATION_MODAL };
};
export const showLocationModal = (selectedDevice) => {
  return { 
    type: deviceDetails.SHOW_LOCATION_MODAL, 
    payload: {
      selectedDevice,
    },
  };
};
export const changeDeviceLocation = (deviceId, location) => {
  const device = deviceDetailsList.find(device => device.id == deviceId);
  if (device) {
    device.location = location;
    return { type: deviceDetails.SET_DEVICE_DETAILS, payload: device };
  }
  return new Error(`Failed to find device with id: ${deviceId}`);
};