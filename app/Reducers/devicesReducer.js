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
    case 'ADD_DEVICE': {
      return {...state, devices: [...state.devices, action.payload]};
    }
    case 'SET_MODEL_FILTER': {
      return {...state, modelFilter: action.payload};
    }
    case 'SET_DEVICES':{
      return {...state, devices: [...action.payload]};
    }
    case 'ADD_BRAND_FILTER': {
      return {...state, brandFilter: [...state.brandFilter,action.payload]};
    }
    case 'REMOVE_BRAND_FILTER': {
      const newBrands = [...state.brandFilter];
      newBrands.splice(action.payload, 1);
      console.log(newBrands);
      return {...state, brandFilter: newBrands};
    }
    case 'ADD_OFFICE_FILTER': {
      return {...state, officeFilter: [...state.officeFilter,action.payload]};
    }
    case 'REMOVE_OFFICE_FILTER': {
      const newOffices = [...state.officeFilter];
      newOffices.splice(action.payload, 1);
      console.log(newOffices);
      return {...state, officeFilter: newOffices};
    }
    case 'SET_SHOW_AVAILABLE': {
      return {...state, showAvailable: action.payload};
    }
    case 'SET_SHOW_UNAVAILABLE': {
      return {...state, showUnavailable: action.payload};
    }
    default: return state;
  }
};