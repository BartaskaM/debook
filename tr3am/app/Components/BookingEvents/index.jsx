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

import PaginationActions from 'Components/PaginationActions';
import Styles from './Styles';
import StylesUtils from 'Utils/StylesUtils';
import EventItem from './EventItem';
import * as eventsActions from 'ActionCreators/eventsActions';

class BookingEvents extends React.Component {
  constructor(props) {
    super(props);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleRowsPerPageChange = this.handleRowsPerPageChange.bind(this);
  }

  componentDidMount() {
    const { page, rowsPerPage } = this.props;
    this.props.fetchEvents(page, rowsPerPage);
  }

  componentWillUnmount() {
    this.props.resetPaginationInfo();
  }

  handlePageChange(e, page) {
    this.props.fetchEvents(page, this.props.rowsPerPage);
  }

  handleRowsPerPageChange(e) {
    this.props.fetchEvents(this.props.page, e.target.value);
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

  renderPagination() {
    const { page, rowsPerPage, count } = this.props;
    const rowsPerPageOptions = [10, 20, 30, 40, 50];
    return (
      <Grid item xs={12}>
        <Table>
          <TableFooter>
            <TableRow>
              <TablePagination count={count}
                onChangePage={this.handlePageChange}
                page={page}
                rowsPerPageOptions={rowsPerPageOptions}
                rowsPerPage={rowsPerPage}
                onChangeRowsPerPage={this.handleRowsPerPageChange}
                Actions={PaginationActions} />
            </TableRow>
          </TableFooter>
        </Table>
      </Grid>
    );
  }

  render() {
    const { classes, events, fetchEventsLoading, count } = this.props;
    return (
      <div className={classes.root}>
        <Grid container>
          {events.length > 0 && count &&
            this.renderPagination()
          }
          {fetchEventsLoading &&
            <Grid item xs={12}>
              <LinearProgress />
            </Grid>}
          {this.renderListHeader()}
          <Grid container item xs={12}>
            <List className={classes.list}>
              {events.length === 0 && !fetchEventsLoading ?
                <div className={classes.noItems}>
                  <Typography align="center" variant="display3">No events found</Typography>
                </div> :
                events.map(event => (
                  <EventItem key={event.id} event={event} />
                ))
              }
            </List>
            {fetchEventsLoading && events.length > 5 &&
              <Grid item xs={12}>
                <LinearProgress />
              </Grid>}
            {events.length > 5 &&
              this.renderPagination()
            }
          </Grid>
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
  count: PropTypes.number,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  resetPaginationInfo: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    events: state.events.events,
    fetchEventsLoading: state.events.fetchEventsLoading,
    fetchEventsErrorMessage: state.events.fetchEventsErrorMessage,
    count: state.events.count,
    page: state.events.page,
    rowsPerPage: state.events.rowsPerPage,
  };
};

export default connect(mapStateToProps, eventsActions)(
  withStyles({ ...Styles, ...StylesUtils })(BookingEvents)
);