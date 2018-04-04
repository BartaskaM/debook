import { devices } from 'Constants/ActionTypes';

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
export const showBookModal = (showBookModal, selectedDevice = -1) => {

  const returnDate = new Date();
  if(returnDate.getHours() !== 23)
  {
    returnDate.setHours(returnDate.getHours() + 1);
  } 
  return { 
    type: devices.SHOW_BOOK_MODAL, 
    payload: {
      showBookModal,
      currentDate: new Date(),
      returnDate,
      selectedDevice,
    } ,
  };
};
export const setCurrentDate = (date) => {
  return { type: devices.SET_CURRENT_DATE, payload: date };
};
export const setReturnDate = (date) => {
  return { type: devices.SET_RETURN_DATE, payload: date };
};
export const setReturnDateError = (bool, message) => {
  if (bool) {
    return { type: devices.SET_RETURN_DATE_ERROR, payload: { show: true, message } };
  } else {
    return { type: devices.SET_RETURN_DATE_ERROR, payload: { show: false, message: '' } };
  }
};
export const setSelectedDevice = (id) => {
  return { type: devices.SET_SELECTED_DEVICE, payload: id };
};
export const showReserveModal = (showReserveModal, selectedDevice = -1) => {
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
      showReserveModal,
      currentDate,
      returnDate,
      selectedDevice,
    }, 
  };
};
export const setReservations = (reservations) => {
  return { type: devices.SET_RESERVATIONS, payload: reservations };
};
export const showReservationDetails = (bool, from, to) => {
  return { 
    type: devices.SHOW_RESERVATION_DETAILS, 
    payload: {
      showReservationDetails: bool,
      from,
      to,
    },
  };
};