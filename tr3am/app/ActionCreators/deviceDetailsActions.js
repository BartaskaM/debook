import { deviceDetails } from 'Constants/ActionTypes';
import deviceDetailsList from 'Constants/DeviceDetails';

export const getDeviceWithId = (deviceId) => {
  const device = deviceDetailsList.find(device => device.id == deviceId);
  if (device) {
    return { type: deviceDetails.SET_DEVICE_DETAILS, payload: device };
  }
  return new Error(`Failed to find device with id: ${deviceId}`);
};