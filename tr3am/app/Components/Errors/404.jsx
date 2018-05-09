import React from 'react';
import { Link } from 'react-router-dom';
import Typography from 'material-ui/Typography';

const Error = () => {
  return (
    <div style={{
      textAlign: 'center',
      position: 'fixed',
      top: '35%',
      left: '50%',
      marginLeft: -228,
      bottom: '65%',
    }}>
      <Typography variant='display4'>
        404
      </Typography>
      <Typography variant='display3'>
        Sorry, we could not find the<br/>
        page you are looking for.
      </Typography>
      <Link to='/devices' replace={true}>Go home</Link>
    </div >
  );
};

export default Error;