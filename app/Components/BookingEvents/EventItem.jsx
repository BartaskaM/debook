import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import { withRouter } from 'react-router-dom';
//import { ListItem } from 'material-ui/List';

import Styles from './Styles';

const EventItem = ({ classes, event }) => {
  return (
    <Grid item xs={24}>
      <Paper className={classes.eventPaper}>
        <Typography variant='display1'>
          <Grid container>
            <Grid item xs>{event.action} {event.device} {event.user} {event.office} {event.datetime}</Grid>
            {/* <Grid item xs>{event.action}</Grid> */}
            {/* <Grid item xs={4}>{event.device}</Grid>
            <Grid item xs={4}>{event.user}</Grid>
            <Grid item xs={4}>{event.office}</Grid>
            <Grid item xs={4}>{event.datetime}</Grid> */}
          </Grid>
        </Typography>
      </Paper>
    </Grid>
  );
};

EventItem.propTypes = {
  history: PropTypes.object.isRequired,
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