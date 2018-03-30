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
            <Tab value='/users' label='USER LIST' />
            <Tab value='/offices' label='OFFICE LIST' />
            <Tab value='/events' label='EVENT LIST' />
          </Tabs>
        </Paper>
      </div>
    );
  }
}

MainTabs.propTypes = {
  tabIndex: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
};

export default connect(null, devicesActions)(withRouter(MainTabs));