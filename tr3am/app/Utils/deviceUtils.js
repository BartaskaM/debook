import { fifteenMinutes } from 'Constants/Values';

export const formBookButtonValuesArray = (devices, removeReservation) => {
  const bookButtonValues = [];
  devices.forEach(device => {
    if(device){
      if (device.available) {
        if (canCheckIn(device.userReservation, () => removeReservation(device.id))) {
          bookButtonValues[device.id] = 'Check-in';
        } else {
          bookButtonValues[device.id] = 'Book device';
        }
      } else {
        if (device.userBooking) {
          bookButtonValues[device.id] = 'Return device';
        } else {
          bookButtonValues[device.id] = 'Device is booked';
        }
      }
    }});
  return bookButtonValues;
};

export const canCheckIn = (reservation, removeReservation) => {
  if (reservation) {
    const now = new Date();
    if (reservation.from - now < fifteenMinutes && now - reservation.from < fifteenMinutes) {
      return true;
    } else {
      if(reservation && now - reservation.from >= fifteenMinutes){
        removeReservation();
      }
      return false;
    }
  }
};