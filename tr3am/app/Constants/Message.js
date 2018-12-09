import Offices from './Offices';

const Messages = [
  {
    id: 1,
    text: 'ths is mesgs',
    user: {
      id: 1,
      firstName: 'John',
      lastName: 'Snow',
      email: 'admin@admin.com',
      office: Offices[0],
      slack: 'LordCommander2',
      roles: ['admin'],
      password: 'admin',
    },
    readAt: null,
    createdAt: '2018-10-03 10:12:36',
  },
  {
    id: 2,
    text: 'One more',
    user: {
      id: 1,
      firstName: 'John',
      lastName: 'Snow',
      email: 'admin@admin.com',
      office: Offices[0],
      slack: 'LordCommander2',
      roles: ['admin'],
      password: 'admin',
    },
    readAt: null,
    createdAt: '2018-10-03 10:12:60',
  },
];

export default Messages;