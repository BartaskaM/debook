import { devices, deviceDetails } from 'Constants/ActionTypes';

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
  bookingErrorMessage: null,
  reserving: false,
  reservingErrorMessage: null,
  fetchingDeviceReservations: false,
  selectedDeviceReservations: [],
  fetchingDevices: false,
  returningDevice: false,
  returningDeviceErrorMessage: null,
  cancelReservationLoading: false,
  cancelReservationErrorMessage: null,
  checkInLoading: null,
  checkInErrorMessage: null,
  createDeviceLoading: false,
  createDeviceError: false,
  updateDeviceLoading: false,
  updateDeviceError: false,
  deleteDeviceLoading: false,
  deleteDeviceError: false,
  brands: [],
  fetchBrandsLoading: false,
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
        returnDateError: ' ',
        bookingErrorMessage: null,
      };
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
        reservingErrorMessage: null,
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
    case devices.SHOW_RETURN_MODAL: {
      return { ...state, showReturnModal: true, selectedDevice: action.payload };
    }
    case devices.HIDE_RETURN_MODAL: {
      return { ...state, showReturnModal: false };
    }
    case devices.BOOK_START: {
      return {...state, booking: true, bookingErrorMessage: null};
    }
    case devices.BOOK_SUCCESS: {
      const { bookedDeviceId, user, userBooking } = action.payload;
      const updatedDevices = state.devices.map(device => {
        if (device.id === bookedDeviceId) {
          return { 
            ...device,
            custody: user,
            userBooking,
            available: false,
          };
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
      return { ...state, booking: false, bookingErrorMessage: action.payload };
    }
    case devices.RESERVE_START: {
      return {...state, reserving: true, reservingErrorMessage: null};
    }
    case devices.RESERVE_SUCCESS: {
      const { reservedDeviceId, userReservation } = action.payload;
      const updatedDevices = state.devices.map(device => {
        if (device.id === reservedDeviceId) {
          return {
            ...device,
            userReservation,
          };
        }
        return device;
      });
      return {
        ...state,
        devices: updatedDevices,
        reserving: false,
        showReserveModal: false, 
        currentDateError: ' ', 
        returnDateError: ' ',
      };
    }
    case devices.RESERVE_ERROR: {
      return { ...state, reserving: false, reservingErrorMessage: action.payload };
    }
    case devices.FETCH_DEVICE_RESERVATIONS_START: {
      return {
        ...state,
        selectedDeviceReservations: [],
        fetchingDeviceReservations: true,
      };
    }
    case devices.FETCH_DEVICE_RESERVATIONS_SUCCESS: {
      return {
        ...state,
        selectedDeviceReservations: action.payload,
        fetchingDeviceReservations: false,
      };
    }
    case devices.FETCH_DEVICE_RESERVATIONS_ERROR: {
      return {
        ...state,
        fetchingDeviceReservations: false,
      };
    }
    case devices.FETCH_DEVICES_START: {
      return {
        ...state,
        fetchingDevices: true,
      };
    }
    case devices.FETCH_DEVICES_SUCCESS: {
      return {
        ...state,
        devices: action.payload,
        fetchingDevices: false,
      };
    }
    case devices.FETCH_DEVICES_ERROR: {
      return {
        ...state,
        fetchingDevices: false,
      };
    }
    case devices.RETURN_DEVICE_START: {
      return {
        ...state,
        returningDevice: true,
        returningDeviceErrorMessage: null,
      };
    }
    case devices.RETURN_DEVICE_SUCCESS: {
      const { office, deviceId, bookingId } = action.payload;
      const index = state.selectedDeviceReservations
        .findIndex(reservation => reservation.id === bookingId);
      return {
        ...state,
        devices: state.devices.map(dev => {
          if(dev.id === deviceId){
            return {
              ...dev,
              available: true,
              custody: null,
              userBooking: null,
              location: office,
            };
          }
          return dev;
        }),
        selectedDeviceReservations: [
          ...state.selectedDeviceReservations.slice(0, index),
          ...state.selectedDeviceReservations.slice(index + 1),
        ],
        returningDevice: false,
        showReturnModal: false,
      };
    }
    case devices.RETURN_DEVICE_ERROR: {
      return { 
        ...state,
        returningDevice: false,
        returningDeviceErrorMessage: action.payload,
      };
    }
    case devices.CANCEL_RESERVATION_START: {
      return {
        ...state,
        cancelReservationLoading: true,
        cancelReservationErrorMessage: null,
      };
    }
    case devices.CANCEL_RESERVATION_SUCCESS: {
      const { deviceId, reservationId } = action.payload;
      const index = state.selectedDeviceReservations
        .findIndex(reservation => reservation.id === reservationId);
      return {
        ...state,
        devices: state.devices.map(device => {
          if(device.id === deviceId){
            return {
              ...device,
              userReservation: null,
            };
          }
          return device;
        }),
        selectedDeviceReservations: [
          ...state.selectedDeviceReservations.slice(0, index),
          ...state.selectedDeviceReservations.slice(index + 1),
        ],
        cancelReservationLoading: false,
        showReserveModal: false,
      };
    }
    case devices.CANCEL_RESERVATION_ERROR: {
      return { 
        ...state,
        cancelReservationLoading: false,
        cancelReservationErrorMessage: action.payload,
      };
    }
    case devices.CHECK_IN_START: {
      return {
        ...state,
        checkInLoading: action.payload,
        checkInErrorMessage: null,
      };
    }
    case devices.CHECK_IN_SUCCESS: {
      const { deviceId, userBooking, user } = action.payload;
      return {
        ...state,
        devices: state.devices.map(device => {
          if(device.id === deviceId){
            return {
              ...device,
              userReservation: null,
              userBooking,
              available: false,
              custody: user,
            };
          }
          return device;
        }),
        checkInLoading: null,
      };
    }
    case devices.CHECK_IN_ERROR: {
      return { 
        ...state,
        checkInLoading: null,
        checkInErrorMessage: action.payload,
      };
    }
    case devices.REMOVE_DEVICE_RESERVATION: {
      return {
        ...state,
        devices: state.devices.map(device => {
          if(device.id === action.payload){
            return {...device, userReservation: null};
          }
          return device;
        }),
      };
    }

    case devices.CREATE_DEVICE_START: {
      return {
        ...state,
        createDeviceLoading: true,
        createDeviceError: false,
      };
    }
    case devices.CREATE_DEVICE_SUCCESS: {
      return {
        ...state,
        createDeviceLoading: false,
      };
    }
    case devices.CREATE_DEVICE_ERROR: {
      return {
        ...state,
        createDeviceLoading: false,
        createDeviceError: true,
      };
    }

    case devices.UPDATE_DEVICE_START: {
      return {
        ...state,
        updateDeviceLoading: true,
        updateDeviceError: false,
      };
    }
    case devices.UPDATE_DEVICE_SUCCESS: {
      return {
        ...state,
        updateDeviceLoading: false,
      };
    }
    case devices.UPDATE_DEVICE_ERROR: {
      return {
        ...state,
        updateDeviceLoading: false,
        updateDeviceError: true,
      };
    }

    case devices.DELETE_DEVICE_START: {
      return {
        ...state,
        deleteDeviceLoading: true,
        deleteDeviceError: false,
      };
    }
    case devices.DELETE_DEVICE_SUCCESS: {
      const index = state.devices.findIndex(device => device.id === action.payload);
      return {
        ...state,
        devices: [
          ...state.devices.slice(0, index),
          ...state.devices.slice(index + 1),
        ],
        deleteDeviceLoading: false,
      };
    }
    case devices.DELETE_DEVICE_ERROR: {
      return {
        ...state,
        deleteDeviceLoading: false,
        deleteDeviceError: true,
      };
    }

    case deviceDetails.FETCH_DEVICE_SUCCESS: {
      const fetchedDevice = action.payload;
      return {...state,
        selectedDeviceReservations: fetchedDevice.reservations,
        devices: state.devices.find(x => x.id === fetchedDevice.id) ?
          state.devices.map(device => {
            if(device.id === fetchedDevice.id){
              return {...action.payload};
            }
            return device;
          }) : [...state.devices, action.payload],
      };
    }
    case devices.FETCH_SHORT_BRANDS_START: {
      return {
        ...state,
        fetchBrandsLoading: true,
      };
    }
    case devices.FETCH_SHORT_BRANDS_SUCCESS: {
      return {
        ...state,
        fetchBrandsLoading: false,
        brands: action.payload,
      };
    }
    case devices.FETCH_SHORT_BRANDS_ERROR: {
      return {
        ...state,
        fetchBrandsLoading: false,
      };
    }
    case deviceDetails.UPDATE_DEVICE_LOCATION_SUCCESS: {
      const { deviceId, location } = action.payload;
      return {
        ...state,
        devices: state.devices.map(device => {
          if(device.id === deviceId){
            return {...device, location};
          }
          return device;
        }),
      };
    }
    default: return state;
  }
};