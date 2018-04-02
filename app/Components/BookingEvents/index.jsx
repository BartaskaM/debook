import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import List from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import Styles from './Styles';
import BookingEventsList from 'Constants/BookingEventsList';
import EventItem from './EventItem';
import Typography from 'material-ui/Typography';

class BookingEvents extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container>
          <List className={classes.list}>
            <Typography variant='display1' className={classes.heading}>
              <Grid container>
                <Grid item xs>Action</Grid>
                <Grid item xs>Device</Grid>
                <Grid item xs>User</Grid>
                <Grid item xs>Office</Grid>
                <Grid item xs>Time</Grid>
              </Grid>
            </Typography>
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