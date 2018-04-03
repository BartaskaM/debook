export const dateToValue = (date) => {
  return date.toLocaleTimeString().split(':').slice(0,2).join(':');
};
export const toUnixTimeStamp = (date) => {
  return parseInt((date.getTime() / 1000).toFixed(0));
};