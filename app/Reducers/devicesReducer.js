import * as at from 'Constants/ActionTypes';

const defaultState = {
  devices: [],
  modelFilter: '',
  brandFilter: [],
  officeFilter: [],
  showAvailable: false,
  showUnavailable: false,
  showBookModal: false,
  currentDate: new Date(),
  returnDate: new Date(),
  showReturnDateError: false,
  returnDateError: '',
  selectedDevice: -1,
};

export default (state = defaultState, action) => {
  switch (action.type){
    case at.devices.ADD_DEVICE: {
      return {...state, devices: [...state.devices, action.payload]};
    }
    case at.devices.SET_MODEL_FILTER: {
      return {...state, modelFilter: action.payload};
    }
    case at.devices.SET_DEVICES:{
      return {...state, devices: [...action.payload]};
    }
    case at.devices.ADD_BRAND_FILTER: {
      return {...state, brandFilter: [...state.brandFilter,action.payload]};
    }
    case at.devices.REMOVE_BRAND_FILTER: {
      const newBrands = [...state.brandFilter];
      newBrands.splice(action.payload, 1);
      return {...state, brandFilter: newBrands};
    }
    case at.devices.ADD_OFFICE_FILTER: {
      return {...state, officeFilter: [...state.officeFilter,action.payload]};
    }
    case at.devices.REMOVE_OFFICE_FILTER: {
      const newOffices = [...state.officeFilter];
      newOffices.splice(action.payload, 1);
      return {...state, officeFilter: newOffices};
    }
    case at.devices.SET_SHOW_AVAILABLE: {
      return {...state, showAvailable: action.payload};
    }
    case at.devices.SET_SHOW_UNAVAILABLE: {
      return {...state, showUnavailable: action.payload};
    }
    case at.devices.RESET_FILTERS: {
      return {...state, 
        officeFilter: [], 
        brandFilter: [], 
        showAvailable: false, 
        showUnavailable: false};
    }
    case at.devices.SHOW_BOOK_MODAL: {
      return {...state, showBookModal: action.payload}; 
    }
    case at.devices.SET_CURRENT_DATE: {
      return {...state, currentDate: new Date()};
    }
    case at.devices.SET_RETURN_DATE: {
      return {...state, returnDate: action.payload};
    }
    case at.devices.SET_RETURN_DATE_ERROR: {
      return {
        ...state, 
        showReturnDateError: action.payload.show, 
        returnDateError: action.payload.message,
      };
    }
    case at.devices.SET_SELECTED_DEVICE: {
      return {...state, selectedDevice: action.payload};
    }
    default: return state;
  }
};