const time1 = new Date();
time1.setHours(17);
time1.setMinutes(15);
const time2 = new Date();
time2.setHours(18);
time2.setMinutes(15);
const time3 = new Date();
time3.setHours(15);
time3.setMinutes(30);
const time4 = new Date();
time4.setHours(16);
time4.setMinutes(0);
const reservations = [
  {
    user: 1,
    device: 1,
    from: time1,
    to: time2,
  },
  {
    user: 2,
    device: 1,
    from: time3,
    to: time4,
  },
  {
    user: 1,
    device: 3,
    from: time1,
    to: time2,
  },
  {
    user: 2,
    device: 3,
    from: time3,
    to: time4,
  },
];

export default reservations;