import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import { withRouter, Link } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import { ListItem } from 'material-ui/List';

import Styles from './Styles';

const EventItem = ({ event, classes }) => {
  const createdOn = new Date(event.createdOn);
  return (
    <Grid item xs>
      <ListItem button>
        <Paper className={classes.paper}>
          <Typography variant='display1'>
            <Grid container>
              <Grid item xs>{event.action}</Grid>
              <Grid item xs>
                <Link to={`/devices/${event.device.identificationNum}`}>
                  {event.device.identificationNum}
                </Link>
              </Grid>
              <Grid item xs>
                <Link to={`/users/${event.user.id}`}>
                  {`${event.user.firstName} ${event.user.lastName}`}
                </Link>
              </Grid>
              <Grid item xs>
                <Link to={`/offices/${event.office.id}`}>
                  {event.office.city}
                </Link>
              </Grid>
              <Grid item xs>
                {
                  `${createdOn.toLocaleDateString()}, 
                  ${createdOn.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}`
                }
              </Grid>
            </Grid>
          </Typography>
        </Paper>
      </ListItem>
    </Grid>
  );
};

EventItem.propTypes = {
  classes: PropTypes.object.isRequired,
  event: PropTypes.shape({
    id: PropTypes.number.isRequired,
    action: PropTypes.string.isRequired,
    device: PropTypes.shape({
      id: PropTypes.number.isRequired,
      identificationNum: PropTypes.number.isRequired,
    }).isRequired,
    office: PropTypes.shape({
      id: PropTypes.number.isRequired,
      city: PropTypes.string.isRequired,
    }).isRequired,
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }).isRequired,
    createdOn: PropTypes.instanceOf(Date).isRequired,
  }).isRequired,
  createdOn: PropTypes.string,
};

export default withRouter(withStyles(Styles)(EventItem));