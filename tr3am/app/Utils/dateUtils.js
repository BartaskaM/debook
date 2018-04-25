import { fifteenMinutes } from 'Constants/Values';

export const dateToFullYear = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
};
export const dateToHours = (date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
};
export const toUnixTimeStamp = (date) => {
  return parseInt((date.getTime() / 1000).toFixed(0));
};
export const checkIfLate = (date) => {
  return date.getHours() === 23 && date.getMinutes() >= 45;
};
export const roundTime = (date) => {
  return new Date(Math.ceil(date.getTime() / fifteenMinutes) * fifteenMinutes);
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