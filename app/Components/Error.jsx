import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <p><h1>An error has occured.</h1></p>
      <p><Link to='/devices'>Go home</Link></p>
    </div >
  );
};

export default Error;