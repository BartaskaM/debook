import { fifteenMinutes } from 'Constants/Values';

export const getBookButtonValue = (device, removeReservation) => {
  if (device.available) {
    if (canCheckIn(device.userReservation, () => removeReservation(device.id))) {
      return 'Check-in';
    } else {
      return 'Book device';
    }
  } else {
    if (device.userBooking) {
      return 'Return device';
    } else {
      return 'Device is booked';
    }
  }
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