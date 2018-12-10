import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withStyles } from 'material-ui';
import Tabs, { Tab } from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';

import { IsAllowedRole } from 'Utils/routingUtils';
import * as devicesActions from 'ActionCreators/devicesActions';
import * as RouteRoles from 'Constants/RouteRoles';
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
            {IsAllowedRole(RouteRoles.Users, this.props.user.roles) &&
              <Tab value='/users' label='USER LIST' classes={{ label: classes.fontSize }} />
            }
            <Tab value='/requests' label='REQUESTS' classes={{ label: classes.fontSize }} />
            {IsAllowedRole(RouteRoles.Offices, this.props.user.roles) &&
              <Tab value='/offices' label='OFFICE LIST' classes={{ label: classes.fontSize }} />
            }
            {IsAllowedRole(RouteRoles.Brands, this.props.user.roles) &&
            <Tab value='/brands' label='BRAND LIST'classes={{ label: classes.fontSize }} />
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
    office: PropTypes.shape({
      id: PropTypes.number.isRequired,
      city: PropTypes.string.isRequired,
    }).isRequired,
    slack: PropTypes.string,
    roles: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  };
};

export default withRouter(connect(mapStateToProps, devicesActions)(withStyles(Styles)(MainTabs)));