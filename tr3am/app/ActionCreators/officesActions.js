import { offices } from 'Constants/ActionTypes';

export const showAddOfficeModal = (bool) => {
  return { type: offices.SHOW_ADD_OFFICE_MODAL, payload: bool };
};
export const setCountry = (country) => {
  return { type: offices.SET_COUNTRY, payload: country };
};
export const setCity = (city) => {
  return { type: offices.SET_CITY, payload: city };
};
export const setAdress = (address) => {
  return { type: offices.SET_ADDRESS, payload: address };
};
export const setLat = (lat) => {
  return { type: offices.SET_LAT, payload: lat };
};
export const setLng = (lng) => {
  return { type: offices.SET_LNG, payload: lng };
};
export const setOffices = (officeArray) => {
  return { type: offices.SET_OFFICES, payload: officeArray };
};
export const addOffice = (office) => {
  return { type: offices.ADD_OFFICE, payload: office };
};