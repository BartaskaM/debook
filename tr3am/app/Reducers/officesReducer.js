import { offices } from 'Constants/ActionTypes';

const defaultState = {
  offices: [],

  fetchOfficesLoading: false,
  fetchOfficesError: '',

  createOfficeLoading: false,
  createOfficeError: '',

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

    case offices.CREATE_OFFICE_START: {
      return {
        ...state,
        createOfficeLoading: true,
        createOfficeError: '',
      };
    }
    case offices.CREATE_OFFICE_SUCCESS: {
      return {
        ...state,
        createOfficeLoading: false,
        offices: [...state.offices, action.payload],
      };
    }
    case offices.CREATE_OFFICE_ERROR: {
      return {
        ...state,
        createOfficeLoading: false,
        createOfficeError: action.payload,
      };
    }

    case offices.SHOW_ADD_OFFICE_MODAL: {
      return { ...state, showAddOfficeModal: action.payload };
    }
    default: return state;
  }
};