import PropTypes from 'prop-types';

const message = PropTypes.shape({
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  readAt: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
});

export const request = PropTypes.shape({
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  expectedDate: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  resolvedAt: PropTypes.string,
  messages: PropTypes.arrayOf(message),
});