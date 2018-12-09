import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import List from 'material-ui/List';
import { withRouter } from 'react-router-dom';
import MessageItem from './MessageItem';
import Styles from '../Styles';
import StylesUtils from 'Utils/StylesUtils';
import AddMessageModal from './AddMessageModal';
import * as requestDetailsActions from 'ActionCreators/requestDetailsActions';
import NavigateBefore from 'material-ui-icons/NavigateBefore';
import { LinearProgress } from 'material-ui/Progress';

class Request extends React.Component {

  constructor(props) {
    super(props);

    this.handleAddNewClick = this.handleAddNewClick.bind(this);
    this.handleResolve = this.handleResolve.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
    this.props.fetchRequestWithId(parseInt(this.props.match.params.id), this.props.history);
  }

  handleAddNewClick() {
    this.props.showAddMessageModal(true);
  }

  handleResolve() {
    this.props.changeRequestStatus(this.props.request.id, 'Resolved', this.props.history);
  }

  handleCancel() {
    this.props.changeRequestStatus(this.props.request.id, 'Cancelled', this.props.history);
  }

  parseTime(date) {
    return date.toLocaleDateString() + ' ' +
      date.toLocaleTimeString([],
        { hour: '2-digit', minute: '2-digit' });
  }

  showDates(request) {
    return (
      <Grid container>
        <Grid item xs={6}>
          {'Expected ' + request.expectedDate.toLocaleDateString()}
        </Grid>
        { request.resolvedAt ?
          <Grid item xs={6}>
            {'Resolved at ' + this.parseTime(request.resolvedAt)}
          </Grid>
          : ''
        }
      </Grid>
    );
  }
  render() {
    const { classes, request, history, userRoles, fetchRequestLoading } = this.props;

    return (
      <div className={classes.root}>
        <AddMessageModal />
        {fetchRequestLoading ?
          <Grid item xs={12}>
            <LinearProgress />
          </Grid>
          :
          <Grid container>
            <Grid item xs={2}>
              <Button variant="flat" onClick={history.goBack}>
                <NavigateBefore />
                <span className={classes.bigFont} >Back</span>
              </Button>
            </Grid>
            {
              request ? this.showDates(request) : ''
            }
            <List className={classes.officeList}>
              {request ? request.messages.map(message => (
                <MessageItem key={message.id} message={message} />
              )) : ''}
            </List>
            {request && request.status != 'Resolved' && request.status != 'Cancelled' ?
              <Grid container>
                {userRoles.includes('admin') ?
                  <Grid item xs={4}>
                    <Grid container>
                      <Grid item xs={6}>
                        <Button
                          variant="raised"
                          color="primary"
                          className={classes.resolveButton}
                          onClick={this.handleResolve}
                        >
                          Resolve
                        </Button>
                      </Grid>
                      <Grid item xs={6}>
                        <Button
                          variant="raised"
                          color="secondary"
                          className={classes.resolveButton}
                          onClick={this.handleCancel}
                        >
                          Cancel
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                  : ''}
                <Grid item xs={userRoles.includes('admin') ? 6 : 12}>
                  <Button
                    variant="raised"
                    color="primary"
                    className={classes.addNewButton}
                    onClick={this.handleAddNewClick}
                  >
                    ADD NEW
                  </Button>
                </Grid>
              </Grid>
              : ''}
          </Grid>}
      </div>
    );
  }
}

Request.propTypes = {
  request: PropTypes.object,
  classes: PropTypes.object.isRequired,
  createMessageLoading: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  createMessageErrorMessage: PropTypes.string,
  match: PropTypes.object,
  showAddMessageModal: PropTypes.func.isRequired,
  fetchRequestWithId: PropTypes.func.isRequired,
  changeRequestStatus: PropTypes.func.isRequired,
  userRoles: PropTypes.array,
  fetchRequestLoading: PropTypes.bool,
  //createRequest: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    request: state.requestDetails.request,
    createMessageLoading: state.requestDetails.createMessageLoading,
    createMessageErrorMessage: state.requestDetails.createMessageErrorMessage,
    fetchRequestLoading: state.requestDetails.fetchRequestLoading,
    showAddMessageModal: state.requestDetails.showAddMessageModal,
    userRoles: state.auth.user.roles,
  };
};

export default withRouter(
  connect(mapStateToProps, requestDetailsActions)(
    withStyles({ ...Styles, ...StylesUtils })(Request)
  )
);
