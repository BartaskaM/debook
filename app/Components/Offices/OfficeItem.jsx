import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import { withRouter } from 'react-router-dom';

import Styles from './Styles';

const render = (props) => {
  return (
    <Grid item xs={12}>
      <Paper onClick={() => props.history.push('/offices/' + props.office.id)}>
        <Typography variant='header'>{props.office.country}</Typography>
        <Typography variant='header'>{props.office.city}</Typography>
        <Typography variant='header'>{props.office.address}</Typography>
        <Typography variant='header'>{props.office.lat}</Typography>
        <Typography variant='header'>{props.office.lng}</Typography>
      </Paper>
    </Grid>
  );
};

render.propTypes = {
  history: PropTypes.object.isRequired,
  office: PropTypes.shape({
    id: PropTypes.number.isRequired,
    country: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }).isRequired,
};


export default withStyles(Styles)(withRouter(render));