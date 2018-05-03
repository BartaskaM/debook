import { deviceDetails } from 'Constants/ActionTypes';
import deviceDetailsList from 'Constants/DeviceDetails';
import { reservationStatus } from 'Constants/Enums';
import api from 'api';
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

export const fetchDevice = (deviceId, userId) => async dispatch => {
  dispatch({type: deviceDetails.FETCH_DEVICE_START});
  try{
    const response = await api.get(`/devices/${deviceId}`);
    const device = response.data;
    const userBooking = device.reservations.find(reservation => 
      reservation.user.id === userId && 
      (reservation.status === reservationStatus.checkedIn || 
        reservation.status === reservationStatus.overDue));
    const userReservation = device.reservations.find(reservation => 
      reservation.user.id === userId && 
          reservation.status === reservationStatus.pending);
    dispatch({
      type: deviceDetails.FETCH_DEVICE_SUCCESS,
      payload: {
        ...device,
        purchased: new Date(device.purchased),
        userBooking: userBooking ? {
          ...userBooking,
          from: new Date(userBooking.from),
          to: new Date(userBooking.to),
        } : null,
        userReservation: userReservation ? {
          ...userReservation,
          from: new Date(userReservation.from),
          to: new Date(userReservation.to),
        } : null,
        reservations: device.reservations.map(res => ({
          ...res,
          from: new Date(res.from),
          to: new Date(res.to),
        })),
      },
    });
  } catch(e) {
    dispatch({
      type: deviceDetails.FETCH_DEVICE_ERROR,
      payload: e.response.data.message,
    });
  }
};