import { fifteenMinutes } from 'Constants/Values';

export const formBookButtonValuesArray = (devices) => {
  const bookButtonValues = [];
  devices.forEach(device => {
    if(device){
      if (device.available) {
        if (canCheckIn(device.userReservation)) {
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
    }
  });
  return bookButtonValues;
};

export const canCheckIn = (reservation) => {
  if (reservation) {
    const now = new Date();
    if (reservation.from - now < fifteenMinutes) {
      return true;
    } else {
      return false;
    }
  }
};