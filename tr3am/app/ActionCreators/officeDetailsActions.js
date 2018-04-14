import { officeDetails } from 'Constants/ActionTypes';
import officeList from 'Constants/Offices';

export const getOfficeWithId = (officeId) => {
  const office = officeList.find(office => office.id == officeId);
  if (office) {
    return { type: officeDetails.SET_OFFICE_DETAILS, payload: office };
  }
  return new Error(`Failed to find office with id: ${officeId}`);
};