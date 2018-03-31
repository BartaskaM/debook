import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import List from 'material-ui/List';
import { withStyles } from 'material-ui/styles';

import Styles from './Styles';
import BookingEventsList from 'Constants/BookingEventsList';
import EventItem from './EventItem';

class BookingEvents extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={16}>
          <List className={classes.bookingEvents}>
            {BookingEventsList.map(event => (
              <EventItem key={event.id} event={event} />
            ))}
          </List>
        </Grid>
      </div>
    );
  }
}

BookingEvents.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(Styles)(BookingEvents);