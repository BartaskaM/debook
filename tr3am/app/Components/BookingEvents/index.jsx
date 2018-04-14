import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import List from 'material-ui/List';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

import Styles from './Styles';
import StylesUtils from 'Utils/StylesUtils';
import BookingEventsList from 'Constants/BookingEventsList';
import EventItem from './EventItem';

class BookingEvents extends React.Component {

  constructor() {
    super();

    this.renderListHeader = this.renderListHeader.bind(this);
  }

  renderListHeader() {
    const { classes } = this.props;
    return (
      <Grid item xs={12}>
        <Paper className={classes.headerPaper}>
          <Typography variant='display1'>
            <Grid container>
              <Grid item xs>Action</Grid>
              <Grid item xs>Device</Grid>
              <Grid item xs>User email</Grid>
              <Grid item xs>Office</Grid>
              <Grid item xs>Date</Grid>
            </Grid>
          </Typography>
        </Paper>
      </Grid>
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container>
          {this.renderListHeader()}
          <List className={classes.list}>
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

export default withStyles({ ...Styles, ...StylesUtils })(BookingEvents);