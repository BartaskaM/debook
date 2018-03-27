export function addDevice(device) {
  return { type: 'ADD_DEVICE', payload: device };
}
export function setDevices(devices) {
  return { type: 'SET_DEVICES', payload: devices };
}
export function setModelFilter(filter) {
  return { type: 'SET_MODEL_FILTER', payload: filter };
}
export const addBrandFilter = (filter) => {
  return { type: 'ADD_BRAND_FILTER', payload: filter };
};
export const removeBrandFilter = (filterIndex) => {
  return { type: 'REMOVE_BRAND_FILTER', payload: filterIndex };
};
