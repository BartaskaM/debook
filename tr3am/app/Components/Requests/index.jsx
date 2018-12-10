import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import List from 'material-ui/List';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { LinearProgress } from 'material-ui/Progress';
import { request } from './Types';

import Styles from './Styles';
import StylesUtils from 'Utils/StylesUtils';
import AddRequestModal from './AddRequestModal';
import RequestItem from './RequestItem';
import * as requestsActions from 'ActionCreators/requestsActions';

class Requests extends React.Component {

  constructor(props) {
    super(props);

    this.handleAddNewClick = this.handleAddNewClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchRequests();
  }

  handleAddNewClick() {
    this.props.showAddRequestModal(true);
  }

  isUpdated(request) {
    return request.messages.some(
      message => (message.readAt === null || typeof message.readAt === 'undefined')
    );
  }

  renderListHeader() {
    const { classes } = this.props;
    return (
      <Grid item xs={12}>
        <Paper className={classes.headerPaper}>
          <Typography variant='display1'>
            <Grid container className={classes.headerContainer}>
              <Grid item xs={10}>Request</Grid>
              <Grid item xs={2}>Status</Grid>
            </Grid>
          </Typography>
        </Paper>
      </Grid>
    );
  }

  render() {
    const { classes, requests, fetchRequestsLoading } = this.props;
    return (
      <div className={ classes.root }>
        <AddRequestModal />
        <Grid container spacing={16}>
          { this.renderListHeader() }
          { fetchRequestsLoading ?
            <Grid item xs={12}>
              <LinearProgress />
            </Grid>
            : <Grid container>
              <List className={ classes.officeList }>
                {requests.map(request => (
                  <RequestItem key={request.id}
                    request={request}
                    isUpdated={this.isUpdated(request)} />
                ))}
              </List>
              <Grid item xs={12}>
                <Button
                  variant="raised"
                  color="primary"
                  className={ classes.addNewButton }
                  onClick={ this.handleAddNewClick }
                >
                  ADD NEW
                </Button>
              </Grid>
            </Grid>}
        </Grid>
      </div>
    );
  }
}

Requests.propTypes = {
  requests: PropTypes.arrayOf(request).isRequired,
  fetchRequestsLoading: PropTypes.bool.isRequired,
  fetchRequestsErrorMessage: PropTypes.string,
  classes: PropTypes.object.isRequired,
  createRequestLoading: PropTypes.bool.isRequired,
  createRequestErrorMessage: PropTypes.string,
  
  showAddRequestModal: PropTypes.func.isRequired,
  fetchRequests: PropTypes.func.isRequired,
  createRequest: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    requests: state.requests.requests,
    fetchRequestsLoading: state.requests.fetchRequestsLoading,
    fetchRequestsErrorMessage: state.requests.fetcRequestsErrorMessage,

    createRequestLoading: state.requests.createRequestLoading,
    createRequestErrorMessage: state.requests.createRequestErrorMessage,
  };
};

export default connect(mapStateToProps, requestsActions)(
  withStyles({ ...Styles, ...StylesUtils })(Requests)
);