import { deviceDetails, devices } from 'Constants/ActionTypes';

const defaultState = {
  device: null,
  showLocationModal: false,
  fetchDeviceLoading: false,
  fetchDeviceErrorMessage: null,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case deviceDetails.SET_DEVICE_DETAILS: {
      return { ...state, device: action.payload };
    } 
    case deviceDetails.HIDE_LOCATION_MODAL: {
      return { ...state, showLocationModal: false };
    }
    case deviceDetails.SHOW_LOCATION_MODAL: {
      return {
        ...state,
        showLocationModal: true,
      };
    }
    case deviceDetails.FETCH_DEVICE_START: {
      return {...state, fetchDeviceLoading: true, fetchDeviceErrorMessage: null};
    }
    case deviceDetails.FETCH_DEVICE_SUCCESS: {
      return {...state, fetchDeviceLoading: false, device: action.payload};
    }
    case deviceDetails.FETCH_DEVICE_ERROR: {
      return {...state, fetchDeviceLoading: false, fetchDeviceErrorMessage: action.payload};
    }
    case devices.BOOK_SUCCESS: {
      const { user, userBooking } = action.payload;
      return {
        ...state,
        device: { 
          ...(state.device),
          custody: user,
          userBooking,
          available: false,
        },
      };
    }
    case devices.RESERVE_SUCCESS: {
      const { userReservation } = action.payload;
      return {
        ...state,
        device: {
          ...(state.device),
          userReservation,
        },
      };
    }
    case devices.RETURN_DEVICE_SUCCESS: {
      const { office } = action.payload;
      return {
        ...state,
        device: {
          ...(state.device),
          available: true,
          custody: null,
          userBooking: null,
          location: office,
        },
      };
    }
    case devices.CANCEL_RESERVATION_SUCCESS: {
      return {
        ...state,
        device: {
          ...(state.device),
          userReservation: null,
        },
      };
    }
    case devices.CHECK_IN_SUCCESS: {
      const { userBooking, user } = action.payload;
      return {
        ...state,
        device: {
          ...(state.device),
          userReservation: null,
          userBooking,
          available: false,
          custody: user,
        },
      };
    }
    case deviceDetails.UPDATE_DEVICE_LOCATION_START: {
      return {
        ...state,
        updateDeviceLocationLoading: true,
        updateDeviceLocationErrorMessage: null,
      };
    }
    case deviceDetails.UPDATE_DEVICE_LOCATION_SUCCESS: {
      return {
        ...state,
        device: {
          ...(state.device),
          location: action.payload.location,
        },
      };
    }
    case deviceDetails.UPDATE_DEVICE_LOCATION_ERROR: {
      return {
        ...state,
        updateDeviceLocationLoading: false,
        updateDeviceLocationErrorMessage: action.payload,
      };
    }
    default: return state;
  }
};