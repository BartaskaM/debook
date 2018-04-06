import { offices } from 'Constants/ActionTypes';

//-------------------------------------------
export const showAddOfficeModal = (bool) => {
  return { type: offices.SHOW_ADD_OFFICE_MODAL, payload: bool };
};
//-------------------------------------------
