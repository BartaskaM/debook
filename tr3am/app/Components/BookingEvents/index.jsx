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
  constructor(props){
    super(props);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleRowsPerPageChange = this.handleRowsPerPageChange.bind(this);
    this.state = {
      page: 0,
      rowsPerPage: 20,
    };
  }

  componentDidMount() {
    const { page, rowsPerPage } = this.state;
    this.props.fetchEvents(page, rowsPerPage);
  }

  handlePageChange(e, page){
    this.props.fetchEvents(page, this.state.rowsPerPage, () => this.setState({page}));
  }

  handleRowsPerPageChange(e){
    const rowsPerPage = e.target.value;
    this.props.fetchEvents(
      this.state.page,
      rowsPerPage,
      () => this.setState({rowsPerPage: e.target.value}));
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

  renderPagination(){
    const { page, rowsPerPage } = this.state;
    const rowsPerPageOptions = [10, 20, 30, 40, 50];
    return (
      <Grid item xs={12}>
        <Table>
          <TableFooter>
            <TableRow>
              <TablePagination count={this.props.count}
                onChangePage={this.handlePageChange}
                page={page}
                rowsPerPageOptions={rowsPerPageOptions}
                rowsPerPage={rowsPerPage}
                onChangeRowsPerPage={this.handleRowsPerPageChange}
                Actions={PaginationActions}/>
            </TableRow>
          </TableFooter>
        </Table>
      </Grid>
    );
  }

  render() {
    const { classes, events, fetchEventsLoading } = this.props;
    return (
      <div className={classes.root}>
        <Grid container>
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
            {fetchEventsLoading &&
            <Grid item xs={12}>
              <LinearProgress />
            </Grid>}
            {events.length > 0 && 
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
  count: PropTypes.number.isRequired,
};

const mapStateToProps = state => {
  return {
    events: state.events.events,
    fetchEventsLoading: state.events.fetchEventsLoading,
    fetchEventsErrorMessage: state.events.fetchEventsErrorMessage,
    count: state.events.count,
  };
};

export default connect(mapStateToProps, eventsActions)(
  withStyles({ ...Styles, ...StylesUtils })(BookingEvents)
);