import { offices } from 'Constants/ActionTypes';

export const showAddOfficeModal = (bool) => {
  return { type: offices.SHOW_ADD_OFFICE_MODAL, payload: bool };
};
export const setOffices = (officeArray) => {
  return { type: offices.SET_OFFICES, payload: officeArray };
};
export const addOffice = (office) => {
  return { type: offices.ADD_OFFICE, payload: office };
};