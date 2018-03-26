import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import DeviceList from './DeviceList';
import Devices from '../Constants/Devices';
import User from '../Constants/User';
import * as devicesActions from '../ActionCreators/devicesActions';


class MainTabs extends React.Component {
  componentWillMount(){
    //TODO: Fetch devices
    this.props.setDevices(Devices);
  }
  render() {
    return <DeviceList user={User}/>;
  }
}
MainTabs.propTypes = {
  setDevices: PropTypes.func.isRequired,
};
export default connect(null,devicesActions)(MainTabs);