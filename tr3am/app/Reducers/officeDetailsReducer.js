import { officeDetails } from 'Constants/ActionTypes';

const defaultState = {
  office: null,

  fetchOfficeLoading: false,
  fetchOfficeError: '',

  updateOfficeLoading: false,
  updateOfficeError: '',
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case officeDetails.FETCH_OFFICE_START: {
      return {
        ...state,
        fetchOfficeLoading: true,
        fetchOfficeError: '',
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
        fetchOfficeError: action.payload,
      };
    }

    case officeDetails.UPDATE_OFFICE_START: {
      return {
        ...state,
        updateOfficeLoading: true,
        updateOfficeError: '',
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
        updateOfficeError: action.payload,
      };
    }

    default: return state;
  }
};