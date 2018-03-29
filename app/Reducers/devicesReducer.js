const defaultState = {
  devices: [],
  modelFilter: '',
  brandFilter: [],
  officeFilter: [],
  showAvailable: false,
  showUnavailable: false,
  showBookModal: false,
  currentDate: new Date(Date.now()),
  returnDate: new Date(Date.now()),
  showReturnDateError: false,
  returnDateError: '',
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
      return {...state, brandFilter: newBrands};
    }
    case 'ADD_OFFICE_FILTER': {
      return {...state, officeFilter: [...state.officeFilter,action.payload]};
    }
    case 'REMOVE_OFFICE_FILTER': {
      const newOffices = [...state.officeFilter];
      newOffices.splice(action.payload, 1);
      return {...state, officeFilter: newOffices};
    }
    case 'SET_SHOW_AVAILABLE': {
      return {...state, showAvailable: action.payload};
    }
    case 'SET_SHOW_UNAVAILABLE': {
      return {...state, showUnavailable: action.payload};
    }
    case 'RESET_FILTERS': {
      return {...state, 
        officeFilter: [], 
        brandFilter: [], 
        showAvailable: false, 
        showUnavailable: false};
    }
    case 'SHOW_BOOK_MODAL': {
      return {...state, showBookModal: action.payload}; 
    }
    case 'SET_CURRENT_DATE': {
      return {...state, currentDate: new Date(Date.now())};
    }
    case 'SET_RETURN_DATE': {
      return {...state, returnDate: action.payload};
    }
    case 'SET_RETURN_DATE_ERROR': {
      return {
        ...state, 
        showReturnDateError: action.payload.show, 
        returnDateError: action.payload.message,
      };
    }
    default: return state;
  }
};