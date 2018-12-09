import Messages from './Message';

const Requests = [
  {
    id: 1,
    status: 'new',
    expectedDate: '2018-02-03',
    createdAt: '2018-03-01',
    resolvedAt: null,
    messages: [
      Messages[0],
      Messages[1],
    ],
  },
];

export default Requests;