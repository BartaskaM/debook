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
  returnDateError: ' ',
  currentDateError: ' ',
  selectedDevice: null,
  showReserveModal: false,
  reservations: [],
  showReservationDetails: false,
  showReturnModal: false,
  booking: false,
  bookingError: '',
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case devices.ADD_DEVICE: {
      return { ...state, devices: [...state.devices, action.payload] };
    }
    case devices.SET_MODEL_FILTER: {
      return { ...state, modelFilter: action.payload };
    }
    case devices.SET_DEVICES: {
      return { ...state, devices: [...action.payload] };
    }
    case devices.ADD_BRAND_FILTER: {
      return { ...state, brandFilter: [...state.brandFilter, action.payload] };
    }
    case devices.REMOVE_BRAND_FILTER: {
      const newBrands = [...state.brandFilter];
      newBrands.splice(action.payload, 1);
      return { ...state, brandFilter: newBrands };
    }
    case devices.ADD_OFFICE_FILTER: {
      return { ...state, officeFilter: [...state.officeFilter, action.payload] };
    }
    case devices.REMOVE_OFFICE_FILTER: {
      const newOffices = [...state.officeFilter];
      newOffices.splice(action.payload, 1);
      return { ...state, officeFilter: newOffices };
    }
    case devices.SET_SHOW_AVAILABLE: {
      return { ...state, showAvailable: action.payload };
    }
    case devices.SET_SHOW_UNAVAILABLE: {
      return { ...state, showUnavailable: action.payload };
    }
    case devices.RESET_FILTERS: {
      return {
        ...state,
        officeFilter: [],
        brandFilter: [],
        showAvailable: false,
        showUnavailable: false,
      };
    }
    case devices.SHOW_BOOK_MODAL: {
      const {
        selectedDevice,
        currentDate,
        returnDate,
      } = action.payload;
      return {
        ...state,
        showBookModal: true,
        selectedDevice,
        currentDate,
        returnDate,
      };
    }
    case devices.HIDE_BOOK_MODAL: {
      return { 
        ...state, 
        showBookModal: false, 
        currentDateError: ' ', 
        returnDateError: ' ' };
    }
    case devices.SET_CURRENT_DATE: {
      return { ...state, currentDate: action.payload };
    }
    case devices.SET_RETURN_DATE: {
      return { ...state, returnDate: action.payload };
    }
    case devices.SET_RETURN_DATE_ERROR: {
      return {
        ...state,
        returnDateError: action.payload,
      };
    }
    case devices.SET_CURRENT_DATE_ERROR: {
      return {
        ...state,
        currentDateError: action.payload,
      };
    }
    case devices.SET_SELECTED_DEVICE: {
      return { ...state, selectedDevice: action.payload };
    }
    case devices.SHOW_RESERVE_MODAL: {
      const {
        selectedDevice,
        currentDate,
        returnDate,
      } = action.payload;
      return {
        ...state,
        showReserveModal: true,
        showReservationDetails: false,
        selectedDevice,
        currentDate,
        returnDate,
      };
    }
    case devices.HIDE_RESERVE_MODAL: {
      return { 
        ...state, 
        showReserveModal: false,
        currentDateError: ' ',
        returnDateError: ' ', 
      };
    }
    case devices.SET_RESERVATIONS: {
      return { ...state, reservations: action.payload };
    }
    case devices.SHOW_RESERVATION_DETAILS: {
      const {
        from,
        to,
        selectedDevice,
      } = action.payload;
      return {
        ...state,
        showReserveModal: true,
        showReservationDetails: true,
        currentDate: from,
        returnDate: to,
        selectedDevice,
      };
    }
    case devices.HIDE_RESERVATION_DETAILS: {
      return { ...state, showReserveModal: false };
    }
    case devices.CHECK_IN_DEVICE: {
      const { deviceId, userId } = action.payload;
      const updatedDevices = state.devices.map(device => {
        if (device.id === deviceId) {
          return { ...device, custody: userId, available: false };
        }
        return device;
      });
      return { ...state, devices: updatedDevices };
    }
    case devices.SHOW_RETURN_MODAL: {
      return { ...state, showReturnModal: true, selectedDevice: action.payload };
    }
    case devices.HIDE_RETURN_MODAL: {
      return { ...state, showReturnModal: false };
    }
    case devices.BOOK_START: {
      return {...state, booking: true, bookingError: ''};
    }
    case devices.BOOK_SUCCESS: {
      const { bookedDeviceId, userId } = action.payload;
      const updatedDevices = state.devices.map(device => {
        if (device.id === bookedDeviceId) {
          //Make additional changes in future implementation
          return { ...device, custody: userId, available: false };
        }
        return device;
      });
      return {
        ...state,
        devices: updatedDevices,
        booking: false,
        showBookModal: false, 
        currentDateError: ' ', 
        returnDateError: ' ',
      };
    }
    case devices.BOOK_ERROR: {
      return { ...state, booking: false, bookingError: action.payload };
    }
    default: return state;
  }
};