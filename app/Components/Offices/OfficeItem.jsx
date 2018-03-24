import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import { withRouter } from 'react-router-dom';

import Styles from './Styles';

const OfficeItem = (props) => {
  const { classes, office } = props;
  return (
    <Grid item xs={12}>
      <Paper className={classes.officePaper}
        onClick={() => props.history.push(`/offices/${office.id}`)}>
        <Typography variant='display1'>
          <Grid container>
            <Grid item xs>{office.country}</Grid>
            <Grid item xs={2}>{office.city}</Grid>
            <Grid item xs={3}>{office.address}</Grid>
            <Grid item xs={2}>LAT: {office.lat}</Grid>
            <Grid item xs={2}>LNG: {office.lng}</Grid>
          </Grid>
        </Typography>
      </Paper>
    </Grid>
  );
};

OfficeItem.propTypes = {
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  office: PropTypes.shape({
    id: PropTypes.number.isRequired,
    country: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }).isRequired,
};


export default withStyles(Styles)(withRouter(OfficeItem));