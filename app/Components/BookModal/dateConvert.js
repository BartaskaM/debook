export default (date) => {
  return date.toLocaleTimeString().split(':').slice(0,2).join(':');
};