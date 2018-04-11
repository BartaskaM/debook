import { offices } from 'Constants/ActionTypes';

export const showAddOfficeModal = (bool) => {
  return { type: offices.SHOW_ADD_OFFICE_MODAL, payload: bool };
};
export const setOffices = (officeArray) => {
  return { type: offices.SET_OFFICES, payload: officeArray };
};
export const addOffice = (office) => {
  //Temp solution for setting id
  const newOfficeID = Math.floor(Math.random() * 10000) + 1;
  office['id'] = newOfficeID;
  //---------------------------
  return { type: offices.ADD_OFFICE, payload: office, newOfficeID};
};