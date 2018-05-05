import { deviceDetails } from 'Constants/ActionTypes';
import { reservationStatus } from 'Constants/Enums';
import api from 'api';
import { toast } from 'react-toastify';

export const hideLocationModal = () => {
  return { type: deviceDetails.HIDE_LOCATION_MODAL };
};

export const showLocationModal = () => {
  return { 
    type: deviceDetails.SHOW_LOCATION_MODAL, 
  };
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
    toast.error('❌ Failed to fetch device');
  }
};

export const updateDeviceLocation = (device) => async dispatch => {
  const { id, ...request } = device;
  dispatch({ type: deviceDetails.UPDATE_DEVICE_LOCATION_START });
  try{
    await api.put(`/devices/${id}`, {
      ...request,
      officeId: request.location.id,
    });
    dispatch({ 
      type: deviceDetails.UPDATE_DEVICE_LOCATION_SUCCESS,
      payload: {
        deviceId: id,
        location: request.location,
      },
    });
    toast.success('✅ Updated device location successfully');
  } catch(e) {
    toast.error(`❌ Failed to change device location: ${e.response.data.message}`);
  }
};