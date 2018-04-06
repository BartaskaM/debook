import { fifteenMinutes } from 'Constants/Values';

export const dateToFullYear = (date) => {
  return date.toLocaleDateString().split('/').reverse().join('-');
};
export const dateToHours = (date) => {
  return date.toLocaleTimeString().split(':').slice(0, 2).join(':');
};
export const toUnixTimeStamp = (date) => {
  return parseInt((date.getTime() / 1000).toFixed(0));
};
export const checkIfLate = (date) => {
  return date.getHours() === 23 && date.getMinutes() >= 45;
};
export const roundTime = (date) => {
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const m = (parseInt((minutes + 7.5) / 15) * 15) % 60;
  const h = minutes > 52 ? (hours === 23 ? 0 : hours + 1) : hours;
  date.setMinutes(m);
  date.setHours(h);
  return date;
};
export const checkForReservation = (from, to, reservations, selectedDevice) => {
  return reservations.filter(res => res.device === selectedDevice && (
    checkIfDateIsWithinReservation(to, res) ||
    checkIfDateIsWithinReservation(from, res) ||
    checkIfReservationIsWithinDates(from, to, res)
  )
  )
    .length !== 0;
};
const checkIfDateIsWithinReservation = (date, reservation) => {
  return reservation.to > date && (reservation.from - fifteenMinutes) < date;
};
const checkIfReservationIsWithinDates = (from, to, reservation) => {
  return reservation.to < to && reservation.from > from;
};