import { devices } from 'Constants/ActionTypes';
import { roundTime } from 'Utils/dateUtils';
import { toast } from 'react-toastify';
import api from 'api';

export const setDevices = (deviceArray) => {
  return { type: devices.SET_DEVICES, payload: deviceArray };
};
export const setModelFilter = (filter) => {
  return { type: devices.SET_MODEL_FILTER, payload: filter };
};
export const addBrandFilter = (filter) => {
  return { type: devices.ADD_BRAND_FILTER, payload: filter };
};
export const removeBrandFilter = (filterIndex) => {
  return { type: devices.REMOVE_BRAND_FILTER, payload: filterIndex };
};
export const addOfficeFilter = (filter) => {
  return { type: devices.ADD_OFFICE_FILTER, payload: filter };
};
export const removeOfficeFilter = (filterIndex) => {
  return { type: devices.REMOVE_OFFICE_FILTER, payload: filterIndex };
};
export const setShowAvailable = (bool) => {
  return { type: devices.SET_SHOW_AVAILABLE, payload: bool };
};
export const setShowUnavailable = (bool) => {
  return { type: devices.SET_SHOW_UNAVAILABLE, payload: bool };
};
export const resetFilters = () => {
  return { type: devices.RESET_FILTERS };
};
export const showBookModal = (selectedDevice) => dispatch => {
  dispatch(fetchDeviceReservations(selectedDevice));
  const returnDate = roundTime(new Date());
  if(returnDate.getHours() !== 23)
  {
    returnDate.setHours(returnDate.getHours() + 1);
  } 
  dispatch ({ 
    type: devices.SHOW_BOOK_MODAL, 
    payload: {
      currentDate: new Date(),
      returnDate,
      selectedDevice,
    },
  });
};
export const hideBookModal = () => {
  return { type: devices.HIDE_BOOK_MODAL };
};
export const setCurrentDate = (date) => {
  return { type: devices.SET_CURRENT_DATE, payload: date };
};
export const setReturnDate = (date) => {
  return { type: devices.SET_RETURN_DATE, payload: date };
};
export const setReturnDateError = (message) => {
  return { type: devices.SET_RETURN_DATE_ERROR, payload: message };
};
export const setCurrentDateError = (message) => {
  return { type: devices.SET_CURRENT_DATE_ERROR, payload: message };
};
export const setSelectedDevice = (id) => {
  return { type: devices.SET_SELECTED_DEVICE, payload: id };
};
export const showReserveModal = (selectedDevice) => dispatch => {
  dispatch(fetchDeviceReservations(selectedDevice));
  const currentDate = roundTime(new Date());
  currentDate.setDate(currentDate.getDate() + 1);
  const returnDate = roundTime(new Date(currentDate));
  if(returnDate.getHours() !== 23)
  {
    returnDate.setHours(returnDate.getHours() + 1);
  } 
  dispatch ({ 
    type: devices.SHOW_RESERVE_MODAL, 
    payload: {
      showReserveModal: true,
      currentDate,
      returnDate,
      selectedDevice,
    }, 
  });
};
export const hideReserveModal = () => {
  return { type: devices.HIDE_RESERVE_MODAL };
};
export const setReservations = (reservations) => {
  return { type: devices.SET_RESERVATIONS, payload: reservations };
};
export const showReservationDetails = 
(from, to, selectedDevice) => {
  return { 
    type: devices.SHOW_RESERVATION_DETAILS, 
    payload: {
      from,
      to,
      selectedDevice,
    },
  };
};
export const hideReservationDetails = () => {
  return { type: devices.HIDE_RESERVATION_DETAILS };
};
export const hideReturnModal = () => {
  return { type: devices.HIDE_RETURN_MODAL };
};
export const showReturnModal = (selectedDevice) => {
  return { type: devices.SHOW_RETURN_MODAL, payload: selectedDevice };
};
export const bookDevice = (bookRequest, user) => async dispatch =>{
  dispatch({ type: devices.BOOK_START });
  try{
    const request = await api.post('/reservations?booking=true', { 
      ...bookRequest,
      from: bookRequest.from.toISOString(),
      to: bookRequest.to.toISOString(),
    });
    const userBooking = {
      id: request.data,
      from: bookRequest.from,
      to: bookRequest.to,
      status: bookRequest.status,
    };
    dispatch({ 
      type: devices.BOOK_SUCCESS,
      payload: {
        bookedDeviceId: bookRequest.deviceId,
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
        userBooking,
      },
    });
    toast.success('✅ Device booked successfully');
  } catch(e) {
    dispatch({ 
      type: devices.BOOK_ERROR,
      payload: e.response.data.message,
    });
    toast.error(`❌ Failed to book device: ${e.response.data.message}`);
  }
};

export const reserveDevice = (reserveRequest) => async dispatch =>{
  dispatch({ type: devices.RESERVE_START });
  try{
    const request = await api.post('/reservations', { 
      ...reserveRequest,
      from: reserveRequest.from.toISOString(),
      to: reserveRequest.to.toISOString(),
    });
    const userReservation = {
      id: request.data,
      from: reserveRequest.from,
      to: reserveRequest.to,
      status: reserveRequest.status,
    };
    dispatch({ 
      type: devices.RESERVE_SUCCESS,
      payload: {
        reservedDeviceId: reserveRequest.deviceId,
        userReservation,
      },
    });
    toast.success('✅ Device reserved successfully');
  } catch(e) {
    dispatch({ 
      type: devices.RESERVE_ERROR,
      payload: e.response.data.message,
    });
    toast.error(`❌ Failed to reserve device: ${e.response.data.message}`);
  }
};

export const fetchDeviceReservations = (deviceId) => async dispatch =>{
  dispatch({ type: devices.FETCH_DEVICE_RESERVATIONS_START });
  try{
    const response = await api.get(`/devices/${deviceId}/reservations`);
    const fetchedReservations = response.data.map(res => ({
      ...res,
      from: new Date(res.from),
      to: new Date(res.to),
    }));
    dispatch({ 
      type: devices.FETCH_DEVICE_RESERVATIONS_SUCCESS,
      payload: fetchedReservations,
    });
  } catch(e) {
    toast.error('❌ Failed to fetch device reservations');
  }
};

export const createDevice = (device, history) => async (dispatch) => {
  dispatch({ 
    type: devices.CREATE_DEVICE_START,
  });
  try {
    const response = await api.post('/devices', device);
    dispatch({
      type: devices.CREATE_DEVICE_SUCCESS,
    });

    dispatch(fetchDevices());

    toast.success('✅ Device created successfully');
    history.push(`/devices/${response.data}`);
  } catch (e) {
    dispatch({ 
      type: devices.CREATE_DEVICE_ERROR, 
    });
    toast.error(`❌ Failed to create device: ${e.response.data.message}`);
  }
};

export const updateDevice = (device, history) => async dispatch => {
  dispatch({ 
    type: devices.UPDATE_DEVICE_START,
  });
  try {
    await api.put(`/devices/${device.id}`, device);

    dispatch({
      type: devices.UPDATE_DEVICE_SUCCESS,
    });

    dispatch(fetchDevices());
    
    toast.success('✅ Device updated successfully');
    history.push(`/devices/${device.id}`);
  } catch (e) {
    dispatch({ 
      type: devices.UPDATE_DEVICE_ERROR, 
    });
    toast.error(`❌ Failed to update device: ${e.response.data.message}`);
  }
};

export const deleteDevice = (id, history) => async dispatch => {
  dispatch({ 
    type: devices.DELETE_DEVICE_START,
  });
  try {
    await api.delete(`/devices/${id}`);

    dispatch({
      type: devices.DELETE_DEVICE_SUCCESS,
    });

    dispatch(fetchDevices());
    
    toast.success('✅ Device deleted successfully');
    history.push('/devices');
  } catch (e) {
    dispatch({ 
      type: devices.DELETE_DEVICE_ERROR, 
    });
    toast.error(`❌ Failed to delete device: ${e.response.data.message}`);
  }
};

export const fetchDevices = () => async dispatch =>{
  dispatch({ type: devices.FETCH_DEVICES_START });
  try{
    //Use identity later on
    const response = await api.get('/devices');
    const fetchedDevices = response.data.map(dev => ({
      ...dev,
      userBooking: dev.userBooking ? 
        {
          ...(dev.userBooking),
          from: new Date(dev.userBooking.from),
          to: new Date(dev.userBooking.to),
        } : null,
      userReservation: dev.userReservation ? 
        {
          ...(dev.userReservation),
          from: new Date(dev.userReservation.from),
          to: new Date(dev.userReservation.to),
        } : null,
    })
    );
    dispatch({ 
      type: devices.FETCH_DEVICES_SUCCESS,
      payload: fetchedDevices,
    });
  } catch(e) {
    dispatch({ 
      type: devices.FETCH_DEVICES_ERROR,
      payload: e.response.data.message,
    });
    toast.error('❌ Failed to fetch devices');
  }
};

export const returnDevice = (booking, office) => async dispatch =>{
  dispatch({ type: devices.RETURN_DEVICE_START });
  try{
    await api.put(`/reservations/${booking.id}`, booking);
    dispatch({ 
      type: devices.RETURN_DEVICE_SUCCESS,
      payload: {
        deviceId: booking.deviceId,
        office: {
          id: office.id,
          city: office.city,
        },
      },
    });
    toast.success('✅ Device returned successfully');
  } catch(e) {
    dispatch({ 
      type: devices.RETURN_DEVICE_ERROR,
      payload: e.response.data.message,
    });
    toast.error(`❌ Failed to return device: ${e.response.data.message}`);
  }
};

export const cancelReservation = (reservation) => async dispatch => {
  dispatch({ type: devices.CANCEL_RESERVATION_START });
  try{
    await api.put(`/reservations/${reservation.id}`, reservation);
    dispatch({ 
      type: devices.CANCEL_RESERVATION_SUCCESS,
      payload: {
        deviceId: reservation.deviceId,
      },
    });
    toast.success('✅ Device reservation canceled successfully');
  } catch(e) {
    dispatch({ 
      type: devices.CANCEL_RESERVATION_ERROR,
      payload: e.response.data.message,
    });
    toast.error(`❌ Failed to cancel device reservation: ${e.response.data.message}`);
  }
};

export const checkIn = (reservation, user) => async dispatch => {
  dispatch({ type: devices.CHECK_IN_START, payload: reservation.deviceId });
  try{
    await api.put(`/reservations/${reservation.id}`, {
      ...reservation,
      from: reservation.from.toISOString(),
      to: reservation.from.toISOString(),
    });
    dispatch({ 
      type: devices.CHECK_IN_SUCCESS,
      payload: {
        deviceId: reservation.deviceId,
        userBooking: reservation,
        user,
      },
    });
    toast.success('✅ Checked in successfully');
  } catch(e) {
    dispatch({ 
      type: devices.CHECK_IN_ERROR,
      payload: e.response.data.message,
    });
    toast.error(`❌ Failed to check in: ${e.response.data.message}`);
  }
};

export const removeReservationFromDevice = (deviceId) => {
  return {
    type: devices.REMOVE_DEVICE_RESERVATION,
    payload: deviceId,
  };
};

export const fetchBrands = () => async dispatch => {
  dispatch({
    type: devices.FETCH_SHORT_BRANDS_START,
  });

  try {
    const response = await api.get('/brands/short');

    dispatch({
      type: devices.FETCH_SHORT_BRANDS_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    toast.error('❌ Failed to fetch brands');
  }
};