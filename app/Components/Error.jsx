import React from 'react';
import PropTypes from 'prop-types';

const Error = Props => {
  return (
    <div>
      <h1>{Props.title ? Props.title : 'unknown error'}</h1>
    </div>
  );
};

Error.propTypes = {
  title: PropTypes.string,
};

export default Error;