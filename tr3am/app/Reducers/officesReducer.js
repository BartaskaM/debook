import { offices } from 'Constants/ActionTypes';

const defaultState = {
  offices: [],
  showAddOfficeModal: false,
  fetchingOffices: false,
  fetchOfficesError: '',
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case offices.ADD_OFFICE: {
      return { ...state, offices: [...state.offices, action.payload] };
    }
    case offices.SET_OFFICES: {
      return { ...state, offices: [...action.payload] };
    }
    case offices.SHOW_ADD_OFFICE_MODAL: {
      return { ...state, showAddOfficeModal: action.payload }; 
    }
    case offices.FETCH_OFFICES_START: {
      return { ...state, fetchingOffices: true, fetchOfficesError: '' };
    }
    case offices.FETCH_OFFICES_SUCCESS: {
      return { ...state, fetchingOffices: false, offices: action.payload };
    }
    case offices.FETCH_OFFICES_ERROR: {
      return { ...state, fetchOfficesError: action.payload, fetchingOffices: false };
    }
    default: return state;
  }
};