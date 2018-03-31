import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withStyles } from 'material-ui';
import Tabs, { Tab } from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';

import * as devicesActions from 'ActionCreators/devicesActions';
import Styles from './Styles';

class MainTabs extends React.Component {
  constructor() {
    super();
    this.handleTabChange = this.handleTabChange.bind(this);
  }

  handleTabChange(e, val) {
    this.props.history.push(val);
  }

  render() {
    const { classes } = this.props;
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
            <Tab value='/devices' label='DEVICE LIST' classes={{ label: classes.fontSize }} />
            <Tab value='/events' label='EVENT LIST' classes={{ label: classes.fontSize }} />
            {this.props.user.admin &&
              <Tab value='/users' label='USER LIST' classes={{ label: classes.fontSize }} />
            }
            {this.props.user.admin &&
              <Tab value='/offices' label='OFFICE LIST' classes={{ label: classes.fontSize }} />
            }
          </Tabs>
        </Paper>
      </div>
    );
  }
}

MainTabs.propTypes = {
  tabIndex: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
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

export default withRouter(connect(mapStateToProps, devicesActions)(withStyles(Styles)(MainTabs)));