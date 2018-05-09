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
      marginLeft: -226,
      bottom: '65%',
    }}>
      <Typography variant='display4'>
        403
      </Typography>
      <Typography variant='display3'>
        You do not have permision<br/>
        to view this page.
      </Typography>
      <Link to='/devices' replace={true}>Go home</Link>
    </div >
  );
};

export default Error;