import { devices } from 'Constants/ActionTypes';

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
  showReserveModal: false,
  reservations: [],
  showReservationDetails: false,
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
    case devices.SHOW_BOOK_MODAL: {
      const { 
        showBookModal, 
        selectedDevice, 
        currentDate, 
        returnDate, 
      } = action.payload;
      return {
        ...state, 
        showBookModal,
        selectedDevice,
        currentDate,
        returnDate,
      }; 
    }
    case devices.SET_CURRENT_DATE: {
      return {...state, currentDate: action.payload};
    }
    case devices.SET_RETURN_DATE: {
      return {...state, returnDate: action.payload};
    }
    case devices.SET_RETURN_DATE_ERROR: {
      return {
        ...state, 
        showReturnDateError: action.payload.show, 
        returnDateError: action.payload.message,
      };
    }
    case devices.SET_SELECTED_DEVICE: {
      return {...state, selectedDevice: action.payload};
    }
    case devices.SHOW_RESERVE_MODAL: {
      const { 
        showReserveModal, 
        selectedDevice, 
        currentDate, 
        returnDate, 
      } = action.payload;
      return {
        ...state, 
        showReserveModal,
        selectedDevice,
        currentDate,
        returnDate,
      }; 
    }
    case devices.SET_RESERVATIONS: {
      return {...state, reservations: action.payload};
    }
    case devices.SHOW_RESERVATION_DETAILS: {
      const { 
        showReservationDetails, 
        from, 
        to,
        selectedDevice, 
      } = action.payload;
      return {
        ...state,
        showReserveModal: showReservationDetails,
        showReservationDetails,
        currentDate: from,
        returnDate: to,
        selectedDevice,
      };
    }
    default: return state;
  }
};