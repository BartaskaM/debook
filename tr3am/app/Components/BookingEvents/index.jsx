import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import List from 'material-ui/List';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { LinearProgress } from 'material-ui/Progress';
import Table, { TablePagination, TableRow, TableFooter } from 'material-ui/Table';

import PaginationActions from './PaginationActions';
import Styles from './Styles';
import StylesUtils from 'Utils/StylesUtils';
import EventItem from './EventItem';
import * as eventsActions from 'ActionCreators/eventsActions';

class BookingEvents extends React.Component {

  componentDidMount() {
    this.props.fetchEvents();
  }

  renderListHeader() {
    const { classes } = this.props;
    return (
      <Grid item xs={12}>
        <Paper className={classes.headerPaper}>
          <Typography variant='display1'>
            <Grid container className={classes.headerContainer}>
              <Grid item xs>Action</Grid>
              <Grid item xs>Device ID</Grid>
              <Grid item xs>User</Grid>
              <Grid item xs>Office</Grid>
              <Grid item xs>Date</Grid>
            </Grid>
          </Typography>
        </Paper>
      </Grid>
    );
  }

  render() {
    const { classes, events, fetchEventsLoading } = this.props;
    return (
      <div className={classes.root}>
        <Grid container>
          {this.renderListHeader()}
          {fetchEventsLoading ?
            <Grid item xs={12}>
              <LinearProgress />
            </Grid>
            : <Grid container item xs={12}>
              <List className={classes.list}>
                {events.map(event => (
                  <EventItem key={event.id} event={event} />
                ))}
              </List>
              <Grid item xs={12}>

                <Table>
                  <TableFooter>
                    <TableRow>
                      <TablePagination count={50} Actions={PaginationActions}
                        onChangePage={() => console.log('change')} page={1} rowsPerPage={20}/>
                    </TableRow>
                  </TableFooter>
                </Table>
                
              </Grid>
            </Grid>
          }
        </Grid>
      </div>
    );
  }
}

BookingEvents.propTypes = {
  classes: PropTypes.object.isRequired,
  events: PropTypes.arrayOf(PropTypes.shape({
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
  })).isRequired,
  fetchEvents: PropTypes.func.isRequired,
  fetchEventsLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => {
  return {
    events: state.events.events,
    fetchEventsLoading: state.events.fetchEventsLoading,
    fetchEventsErrorMessage: state.events.fetchEventsErrorMessage,
  };
};

export default connect(mapStateToProps, eventsActions)(
  withStyles({ ...Styles, ...StylesUtils })(BookingEvents)
);