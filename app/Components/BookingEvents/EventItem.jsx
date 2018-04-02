import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import { withRouter } from 'react-router-dom';
import Styles from './Styles';

const EventItem = ({ event }) => {
  return (
    <Grid item xs>
      <Typography variant='display1'>
        <Grid container>
          <Grid item xs>{event.action}</Grid>
          <Grid item xs>{event.device}</Grid>
          <Grid item xs> {event.user} </Grid>
          <Grid item xs>{event.office}</Grid>
          <Grid item xs>{event.datetime}</Grid>
        </Grid>
      </Typography>
    </Grid>

  );
};

EventItem.propTypes = {
  classes: PropTypes.object.isRequired,
  event: PropTypes.shape({
    id: PropTypes.number.isRequired,
    action: PropTypes.string.isRequired,
    device: PropTypes.string.isRequired,
    office: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    datetime: PropTypes.string.isRequired,
  }).isRequired,
};

export default withStyles(Styles)(withRouter(EventItem));