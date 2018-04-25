import { devices } from 'Constants/ActionTypes';
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
export const showBookModal = (selectedDevice) => {

  const returnDate = new Date();
  if(returnDate.getHours() !== 23)
  {
    returnDate.setHours(returnDate.getHours() + 1);
  } 
  return { 
    type: devices.SHOW_BOOK_MODAL, 
    payload: {
      currentDate: new Date(),
      returnDate,
      selectedDevice,
    },
  };
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
export const showReserveModal = (selectedDevice) => {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 1);
  const returnDate = new Date(currentDate);
  if(returnDate.getHours() !== 23)
  {
    returnDate.setHours(returnDate.getHours() + 1);
  } 
  return { 
    type: devices.SHOW_RESERVE_MODAL, 
    payload: {
      showReserveModal: true,
      currentDate,
      returnDate,
      selectedDevice,
    }, 
  };
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
export const checkInDevice = (deviceId, userId) => {
  return { type: devices.CHECK_IN_DEVICE, payload: {deviceId, userId}};
};
export const bookDevice = (bookRequest) => async dispatch =>{
  dispatch({ type: devices.BOOK_START });
  try{
    console.log(bookRequest);
    await api.post('/reservations?booking=true', bookRequest);
    dispatch({ 
      type: devices.BOOK_SUCCESS,
      payload: {
        bookedDeviceId: bookRequest.device,
        userId: bookRequest.user,
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
    console.log(reserveRequest);
    await api.post('/reservations', reserveRequest);
    dispatch({ 
      type: devices.RESERVE_SUCCESS,
      payload: {
        bookedDeviceId: reserveRequest.device,
      },
    });
  } catch(e) {
    dispatch({ 
      type: devices.RESERVE_ERROR,
      payload: e.response.data.message,
    });
  }
};