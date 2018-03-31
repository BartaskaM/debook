import * as at from 'Constants/ActionTypes';

export const setDevices = (deviceArray) => {
  return { type: at.devices.SET_DEVICES, payload: deviceArray };
};
export const setModelFilter = (filter) => {
  return { type: at.devices.SET_MODEL_FILTER, payload: filter };
};
export const addBrandFilter = (filter) => {
  return { type: at.devices.ADD_BRAND_FILTER, payload: filter };
};
export const removeBrandFilter = (filterIndex) => {
  return { type: at.devices.REMOVE_BRAND_FILTER, payload: filterIndex };
};
export const addOfficeFilter = (filter) => {
  return { type: at.devices.ADD_OFFICE_FILTER, payload: filter };
};
export const removeOfficeFilter = (filterIndex) => {
  return { type: at.devices.REMOVE_OFFICE_FILTER, payload: filterIndex };
};
export const setShowAvailable = (bool) => {
  return { type: at.devices.SET_SHOW_AVAILABLE, payload: bool };
};
export const setShowUnavailable = (bool) => {
  return { type: at.devices.SET_SHOW_UNAVAILABLE, payload: bool };
};
export const resetFilters = () => {
  return { type: at.devices.RESET_FILTERS };
};
export const showBookModal = (bool) => {
  return { type: at.devices.SHOW_BOOK_MODAL, payload: bool };
};
export const setCurrentDate = () => {
  return { type: at.devices.SET_CURRENT_DATE };
};
export const setReturnDate = (date) => {
  return { type: at.devices.SET_RETURN_DATE, payload: date };
};
export const setReturnDateError = (bool, message) => {
  if (bool) {
    return { type: at.devices.SET_RETURN_DATE_ERROR, payload: { show: true, message } };
  } else {
    return { type: at.devices.SET_RETURN_DATE_ERROR, payload: { show: false, message: '' } };
  }
};
export const setSelectedDevice = (id) => {
  return { type: at.devices.SET_SELECTED_DEVICE, payload: id };
};