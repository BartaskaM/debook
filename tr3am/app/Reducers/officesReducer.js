import { offices } from 'Constants/ActionTypes';

const defaultState = {
  offices: [],

  getOfficesLoading: false,
  getOfficesError: false,

  addOfficeLoading: false,
  addOfficeError: false,

  showAddOfficeModal: false,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case offices.GET_OFFICES_BEGIN: {
      return {
        ...state,
        getOfficesLoading: true,
        getOfficesError: false,
      };
    }
    case offices.GET_OFFICES_SUCCESS: {
      return {
        ...state,
        getOfficesLoading: false,
        offices: [...action.payload],
      };
    }
    case offices.GET_OFFICES_ERROR: {
      return {
        ...state,
        getOfficesLoading: false,
        getOfficesError: true,
      };
    }

    case offices.ADD_OFFICE_BEGIN: {
      return {
        ...state,
        addOfficeLoading: true,
        addOfficeError: false,
      };
    }
    case offices.ADD_OFFICE_SUCCESS: {
      return {
        ...state,
        addOfficeLoading: false,
        offices: [...state.offices, action.payload],
      };
    }
    case offices.ADD_OFFICE_ERROR: {
      return {
        ...state,
        addOfficeLoading: false,
        addOfficeError: true,
      };
    }

    case offices.UPDATE_OFFICE_SUCCESS: {
      const newOfficesArray = state.offices;
      newOfficesArray.splice(
        newOfficesArray.find(office => office.id === action.payload.id),
        1,
        action.payload.office
      );
      return { 
        ...state, 
        offices: newOfficesArray,
      };
    }

    case offices.SHOW_ADD_OFFICE_MODAL: {
      return { ...state, showAddOfficeModal: action.payload };
    }
    default: return state;
  }
};