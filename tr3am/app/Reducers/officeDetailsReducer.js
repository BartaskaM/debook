import { officeDetails } from 'Constants/ActionTypes';

const defaultState = {
  office: null,

  getOfficeLoading: false,
  getOfficeError: false,

  updateOfficeLoading: false,
  updateOfficeError: false,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case officeDetails.FETCH_OFFICE_START: {
      return {
        ...state,
        getOfficeLoading: true,
        getOfficeError: false,
      };
    }
    case officeDetails.FETCH_OFFICE_SUCCESS: {
      return {
        ...state,
        getOfficeLoading: false,
        office: action.payload,
      };
    }
    case officeDetails.FETCH_OFFICE_ERROR: {
      return {
        ...state,
        getOfficeLoading: false,
        getOfficeError: true,
      };
    }

    case officeDetails.UPDATE_OFFICE_START: {
      return {
        ...state,
        updateOfficeLoading: true,
        updateOfficeError: false,
      };
    }
    case officeDetails.UPDATE_OFFICE_SUCCESS: {
      return {
        ...state,
        getOfficeLoading: false,
        office: action.payload.office,
      };
    }
    case officeDetails.UPDATE_OFFICE_ERROR: {
      return {
        ...state,
        updateOfficeLoading: false,
        updateOfficeError: true,
      };
    }

    default: return state;
  }
};