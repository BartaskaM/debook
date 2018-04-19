import { officeDetails } from 'Constants/ActionTypes';

const defaultState = {
  office: null,

  fetchOfficeLoading: false,
  fetchOfficeError: false,

  updateOfficeLoading: false,
  updateOfficeError: false,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case officeDetails.FETCH_OFFICE_START: {
      return {
        ...state,
        fetchOfficeLoading: true,
        fetchOfficeError: false,
      };
    }
    case officeDetails.FETCH_OFFICE_SUCCESS: {
      return {
        ...state,
        fetchOfficeLoading: false,
        office: action.payload,
      };
    }
    case officeDetails.FETCH_OFFICE_ERROR: {
      return {
        ...state,
        fetchOfficeLoading: false,
        fetchOfficeError: true,
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
        fetchOfficeLoading: false,
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