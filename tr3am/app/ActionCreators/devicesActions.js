import { devices } from 'Constants/ActionTypes';
import { roundTime } from 'Utils/dateUtils';
import api from 'api';

export const setDevices = (deviceArray) => {
  return { type: devices.SET_DEVICES, payload: deviceArray };
};
export const setModelFilter = (filter) => {
  return { type: devices.SET_MODEL_FILTER, payload: filter };
};
export const addBrandFilter = (filter) => {
  return { type: devices.ADD_BRAND_FILTER, payload: filter };
};
export const removeBrandFilter = (filterIndex) => {
  return { type: devices.REMOVE_BRAND_FILTER, payload: filterIndex };
};
export const addOfficeFilter = (filter) => {
  return { type: devices.ADD_OFFICE_FILTER, payload: filter };
};
export const removeOfficeFilter = (filterIndex) => {
  return { type: devices.REMOVE_OFFICE_FILTER, payload: filterIndex };
};
export const setShowAvailable = (bool) => {
  return { type: devices.SET_SHOW_AVAILABLE, payload: bool };
};
export const setShowUnavailable = (bool) => {
  return { type: devices.SET_SHOW_UNAVAILABLE, payload: bool };
};
export const resetFilters = () => {
  return { type: devices.RESET_FILTERS };
};
export const showBookModal = (selectedDevice) => dispatch => {
  dispatch(fetchDeviceReservations(selectedDevice));
  const returnDate = roundTime(new Date());
  if(returnDate.getHours() !== 23)
  {
    returnDate.setHours(returnDate.getHours() + 1);
  } 
  dispatch ({ 
    type: devices.SHOW_BOOK_MODAL, 
    payload: {
      currentDate: new Date(),
      returnDate,
      selectedDevice,
    },
  });
};
export const hideBookModal = () => {
  return { type: devices.HIDE_BOOK_MODAL };
};
export const setCurrentDate = (date) => {
  return { type: devices.SET_CURRENT_DATE, payload: date };
};
export const setReturnDate = (date) => {
  return { type: devices.SET_RETURN_DATE, payload: date };
};
export const setReturnDateError = (message) => {
  return { type: devices.SET_RETURN_DATE_ERROR, payload: message };
};
export const setCurrentDateError = (message) => {
  return { type: devices.SET_CURRENT_DATE_ERROR, payload: message };
};
export const setSelectedDevice = (id) => {
  return { type: devices.SET_SELECTED_DEVICE, payload: id };
};
export const showReserveModal = (selectedDevice) => dispatch => {
  dispatch(fetchDeviceReservations(selectedDevice));
  const currentDate = roundTime(new Date());
  currentDate.setDate(currentDate.getDate() + 1);
  const returnDate = roundTime(new Date(currentDate));
  if(returnDate.getHours() !== 23)
  {
    returnDate.setHours(returnDate.getHours() + 1);
  } 
  dispatch ({ 
    type: devices.SHOW_RESERVE_MODAL, 
    payload: {
      showReserveModal: true,
      currentDate,
      returnDate,
      selectedDevice,
    }, 
  });
};
export const hideReserveModal = () => {
  return { type: devices.HIDE_RESERVE_MODAL };
};
export const setReservations = (reservations) => {
  return { type: devices.SET_RESERVATIONS, payload: reservations };
};
export const showReservationDetails = 
(from, to, selectedDevice) => {
  return { 
    type: devices.SHOW_RESERVATION_DETAILS, 
    payload: {
      from,
      to,
      selectedDevice,
    },
  };
};
export const hideReservationDetails = () => {
  return { type: devices.HIDE_RESERVATION_DETAILS };
};
export const hideReturnModal = () => {
  return { type: devices.HIDE_RETURN_MODAL };
};
export const showReturnModal = (selectedDevice) => {
  return { type: devices.SHOW_RETURN_MODAL, payload: selectedDevice };
};
export const bookDevice = (bookRequest, user) => async dispatch =>{
  dispatch({ type: devices.BOOK_START });
  try{
    const request = await api.post('/reservations?booking=true', { 
      ...bookRequest,
      from: bookRequest.from.toISOString(),
      to: bookRequest.to.toISOString(),
    });
    const userBooking = {
      id: request.data,
      from: bookRequest.from,
      to: bookRequest.to,
      status: bookRequest.status,
    };
    dispatch({ 
      type: devices.BOOK_SUCCESS,
      payload: {
        bookedDeviceId: bookRequest.deviceId,
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
        userBooking,
      },
    });
  } catch(e) {
    dispatch({ 
      type: devices.BOOK_ERROR,
      payload: e.response.data.message,
    });
  }
};

export const reserveDevice = (reserveRequest) => async dispatch =>{
  dispatch({ type: devices.RESERVE_START });
  try{
    const request = await api.post('/reservations', { 
      ...reserveRequest,
      from: reserveRequest.from.toISOString(),
      to: reserveRequest.to.toISOString(),
    });
    const userReservation = {
      id: request.data,
      from: reserveRequest.from,
      to: reserveRequest.to,
      status: reserveRequest.status,
    };
    dispatch({ 
      type: devices.RESERVE_SUCCESS,
      payload: {
        reservedDeviceId: reserveRequest.deviceId,
        userReservation,
      },
    });
  } catch(e) {
    dispatch({ 
      type: devices.RESERVE_ERROR,
      payload: e.response.data.message,
    });
  }
};

export const fetchDeviceReservations = (deviceId) => async dispatch =>{
  dispatch({ type: devices.FETCH_DEVICE_RESERVATIONS_START });
  try{
    const response = await api.get(`/devices/${deviceId}/reservations`);
    const fetchedReservations = response.data.map(res => ({
      ...res,
      from: new Date(res.from),
      to: new Date(res.to),
    }));
    dispatch({ 
      type: devices.FETCH_DEVICE_RESERVATIONS_SUCCESS,
      payload: fetchedReservations,
    });
  } catch(e) {
    dispatch({ 
      type: devices.FETCH_DEVICE_RESERVATIONS_ERROR,
      payload: e.response.data.message,
    });
  }
};

export const fetchDevices = (userId) => async dispatch =>{
  dispatch({ type: devices.FETCH_DEVICES_START });
  try{
    //Use identity later on
    const response = await api.get(`/devices?userId=${userId}`);
    const fetchedDevices = response.data.map(dev => ({
      ...dev,
      userBooking: dev.userBooking ? 
        {
          ...(dev.userBooking),
          from: new Date(dev.userBooking.from),
          to: new Date(dev.userBooking.to),
        } : null,
      userReservation: dev.userReservation ? 
        {
          ...(dev.userReservation),
          from: new Date(dev.userReservation.from),
          to: new Date(dev.userReservation.to),
        } : null,
    })
    );
    dispatch({ 
      type: devices.FETCH_DEVICES_SUCCESS,
      payload: fetchedDevices,
    });
  } catch(e) {
    dispatch({ 
      type: devices.FETCH_DEVICES_ERROR,
      payload: e.response.data.message,
    });
  }
};

export const returnDevice = (booking) => async dispatch =>{
  dispatch({ type: devices.RETURN_DEVICE_START });
  try{
    await api.put(`/reservations/${booking.id}`, booking);
    dispatch({ 
      type: devices.RETURN_DEVICE_SUCCESS,
      payload: {
        deviceId: booking.deviceId,
        officeId: booking.officeId,
      },
    });
  } catch(e) {
    dispatch({ 
      type: devices.RETURN_DEVICE_ERROR,
      payload: e.response.data.message,
    });
  }
};

export const cancelReservation = (reservation) => async dispatch => {
  dispatch({ type: devices.CANCEL_RESERVATION_START });
  try{
    await api.put(`/reservations/${reservation.id}`, reservation);
    dispatch({ 
      type: devices.CANCEL_RESERVATION_SUCCESS,
      payload: {
        deviceId: reservation.deviceId,
      },
    });
  } catch(e) {
    dispatch({ 
      type: devices.CANCEL_RESERVATION_ERROR,
      payload: e.response.data.message,
    });
  }
};

export const checkIn = (reservation, user) => async dispatch => {
  dispatch({ type: devices.CHECK_IN_START });
  try{
    await api.put(`/reservations/${reservation.id}`, reservation);
    dispatch({ 
      type: devices.CHECK_IN_SUCCESS,
      payload: {
        deviceId: reservation.deviceId,
        userBooking: reservation,
        user,
      },
    });
  } catch(e) {
    dispatch({ 
      type: devices.CHECK_IN_ERROR,
      payload: e.response.data.message,
    });
  }
};