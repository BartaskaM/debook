import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import List from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import Styles from './Styles';
import BookingEventsList from 'Constants/BookingEventsList';
import EventItem from './EventItem';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';

class BookingEvents extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container>
          <List className={classes.list}>
            <Paper className={classes.paper}>
              <Typography variant='display1'>
                <Grid container>
                  <Grid item xs>Action</Grid>
                  <Grid item xs>Device</Grid>
                  <Grid item xs>User</Grid>
                  <Grid item xs>Office</Grid>
                  <Grid item xs>Time</Grid>
                </Grid>
              </Typography>
            </Paper>
            <Paper  className={classes.paper}>
              {BookingEventsList.map(event => (
                <EventItem key={event.id} event={event} />
              ))}
            </Paper>
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