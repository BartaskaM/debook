import { offices } from 'Constants/ActionTypes';

const defaultState = {
  offices: [],

  fetchOfficesLoading: false,
  fetchOfficesError: '',

  addOfficeLoading: false,
  addOfficeError: '',

  showAddOfficeModal: false,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case offices.FETCH_OFFICES_START: {
      return {
        ...state,
        fetchOfficesLoading: true,
        fetchOfficesError: '',
      };
    }
    case offices.FETCH_OFFICES_SUCCESS: {
      return {
        ...state,
        fetchOfficesLoading: false,
        offices: action.payload,
      };
    }
    case offices.FETCH_OFFICES_ERROR: {
      return {
        ...state,
        fetchOfficesLoading: false,
        fetchOfficesError: action.payload,
      };
    }

    case offices.ADD_OFFICE_START: {
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