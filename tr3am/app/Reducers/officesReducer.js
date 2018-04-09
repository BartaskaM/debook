import { offices } from 'Constants/ActionTypes';

const defaultState = {
  offices: [],
  showAddOfficeModal: false,
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
      return {...state, showAddOfficeModal: action.payload}; 
    }
    // case offices.SET_COUNTRY: {
    //   return { ...state, country: action.payload };
    // }
    // case offices.SET_CITY: {
    //   return { ...state, city: action.payload };
    // }
    // case offices.SET_ADRESS: {
    //   return { ...state, address: action.payload };
    // }
    // case offices.SET_LAT: {
    //   return { ...state, lat: action.payload };
    // }
    // case offices.SET_LNG: {
    //   return { ...state, lng: action.payload };
    // }
    default: return state;
  }
};