export function addDevice(device) {
  return { type: 'ADD_DEVICE', payload: device };
}
export function addBulkDevices(devices) {
  return { type: 'ADD_DEVICES', payload: devices };
}
export function setModelFilter(filter) {
  return { type: 'SET_MODEL_FILTER', payload: filter };
}
