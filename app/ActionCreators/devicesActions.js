export const setDevices = (devices) => {
  return { type: 'SET_DEVICES', payload: devices };
};
export const setModelFilter = (filter) => {
  return { type: 'SET_MODEL_FILTER', payload: filter };
};
export const addBrandFilter = (filter) => {
  return { type: 'ADD_BRAND_FILTER', payload: filter };
};
export const removeBrandFilter = (filterIndex) => {
  return { type: 'REMOVE_BRAND_FILTER', payload: filterIndex };
};
export const addOfficeFilter = (filter) => {
  return { type: 'ADD_OFFICE_FILTER', payload: filter };
};
export const removeOfficeFilter = (filterIndex) => {
  return { type: 'REMOVE_OFFICE_FILTER', payload: filterIndex };
};
export const setShowAvailable = (bool) => {
  return { type: 'SET_SHOW_AVAILABLE', payload: bool };
};
export const setShowUnavailable = (bool) => {
  return { type: 'SET_SHOW_UNAVAILABLE', payload: bool };
};
export const resetFilters = () => {
  return { type: 'RESET_FILTERS'};
};
export const showBookModal = (bool) => {
  return { type: 'SHOW_BOOK_MODAL', payload: bool};
};
export const setCurrentDate = () => {
  return { type: 'SET_CURRENT_DATE'};
};
export const setReturnDate = (date) => {
  return { type: 'SET_RETURN_DATE', payload: date};
};
export const setReturnDateError = (bool, message) => {
  if(bool){
    return { type: 'SET_RETURN_DATE_ERROR', payload: {show: true, message}};
  } else {
    return { type: 'SET_RETURN_DATE_ERROR', payload: {show: false, message: ''}};
  }
};
export const setSelectedDevice = (id) => {
  return { type: 'SET_SELECTED_DEVICE', payload: id};
};