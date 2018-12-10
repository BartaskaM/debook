import Offices from './Offices';

const User = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Snow',
    email: 'admin@admin.com',
    office: Offices[0],
    slack: 'LordCommander2',
    roles: 'admin',
    password: 'admin',
  },
  {
    id: 2,
    firstName: 'Petras',
    lastName: 'Petraitis',
    email: 'user@user.com',
    office: Offices[1],
    slack: 'pStandsForPeasant',
    roles: 'user',
    password: 'user',
  },
  {
    id: 3,
    firstName: 'Augustas Nojus',
    lastName: 'Grebliauskas',
    email: 'noah.grebliauskas@gmail.com',
    office: Offices[0],
    slack: 'Humpero',
    roles: 'admin',
    password: 'password',
  },
];

export default User;