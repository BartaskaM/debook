import { devices } from 'Constants/ActionTypes';

const defaultState = {
  devices: [],
  modelFilter: '',
  brandFilter: [],
  officeFilter: [],
  showAvailable: false,
  showUnavailable: false,
};

export default (state = defaultState, action) => {
  switch (action.type){
    case devices.ADD_DEVICE: {
      return {...state, devices: [...state.devices, action.payload]};
    }
    case devices.SET_MODEL_FILTER: {
      return {...state, modelFilter: action.payload};
    }
    case devices.SET_DEVICES:{
      return {...state, devices: [...action.payload]};
    }
    case devices.ADD_BRAND_FILTER: {
      return {...state, brandFilter: [...state.brandFilter,action.payload]};
    }
    case devices.REMOVE_BRAND_FILTER: {
      const newBrands = [...state.brandFilter];
      newBrands.splice(action.payload, 1);
      return {...state, brandFilter: newBrands};
    }
    case devices.ADD_OFFICE_FILTER: {
      return {...state, officeFilter: [...state.officeFilter,action.payload]};
    }
    case devices.REMOVE_OFFICE_FILTER: {
      const newOffices = [...state.officeFilter];
      newOffices.splice(action.payload, 1);
      return {...state, officeFilter: newOffices};
    }
    case devices.SET_SHOW_AVAILABLE: {
      return {...state, showAvailable: action.payload};
    }
    case devices.SET_SHOW_UNAVAILABLE: {
      return {...state, showUnavailable: action.payload};
    }
    case devices.RESET_FILTERS: {
      return {...state, 
        officeFilter: [], 
        brandFilter: [], 
        showAvailable: false, 
        showUnavailable: false};
    }
    default: return state;
  }
};