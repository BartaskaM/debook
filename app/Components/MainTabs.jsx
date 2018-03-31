import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Tabs, { Tab } from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';
import * as devicesActions from 'ActionCreators/devicesActions';

class MainTabs extends React.Component {
  constructor() {
    super();
    this.handleTabChange = this.handleTabChange.bind(this);
  }

  handleTabChange(e, val) {
    this.props.history.push(val);
  }

  render() {
    return (
      <div>
        <Paper>
          <Tabs
            value={this.props.tabIndex}
            onChange={this.handleTabChange}
            indicatorColor='primary'
            textColor='primary'
            centered
          >
            <Tab value='/devices' label='DEVICE LIST' />
            <Tab value='/events' label='EVENT LIST' />
            {this.props.user.admin ? <Tab value='/users' label='USER LIST' /> : null}
            {this.props.user.admin ? <Tab value='/offices' label='OFFICE LIST' /> : null}         
          </Tabs>
        </Paper>
      </div>
    );
  }
}

MainTabs.propTypes = {
  tabIndex: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    office: PropTypes.string.isRequired,
    slack: PropTypes.string.isRequired,
    admin: PropTypes.bool.isRequired,
  }).isRequired,
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, devicesActions)(withRouter(MainTabs));