import { officeDetails } from 'Constants/ActionTypes';

const defaultState = {
  office: null,

  fetchOfficeLoading: false,

  updateOfficeLoading: false,
  updateOfficeErrorMessage: null,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case officeDetails.FETCH_OFFICE_START: {
      return {
        ...state,
        fetchOfficeLoading: true,
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
      };
    }
    case officeDetails.UPDATE_OFFICE_START: {
      return {
        ...state,
        updateOfficeLoading: true,
        updateOfficeErrorMessage: null,
      };
    }
    case officeDetails.UPDATE_OFFICE_SUCCESS: {
      return {
        ...state,
        updateOfficeLoading: false,
        office: action.payload.office,
      };
    }
    case officeDetails.UPDATE_OFFICE_ERROR: {
      return {
        ...state,
        updateOfficeLoading: false,
        updateOfficeErrorMessage: action.payload,
      };
    }

    default: return state;
  }
};