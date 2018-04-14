import { officeDetails } from 'Constants/ActionTypes';

const defaultState = {
  office: null,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case officeDetails.SET_OFFICE_DETAILS: {
      return { ...state, office: action.payload };
    }
    default: return state;
  }
};