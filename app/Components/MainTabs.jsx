import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import DeviceList from './DeviceList';
import Devices from 'Constants/Devices';
import User from 'Constants/User';
import * as devicesActions from 'ActionCreators/devicesActions';


class MainTabs extends React.Component {
  componentDidMount(){
    //TODO: Fetch devices
    this.props.setDevices(Devices);
  }
  render() {
    return( 
      <div>
        <DeviceList user={User[0]}/>
      </div>);
  }
}
MainTabs.propTypes = {
  setDevices: PropTypes.func.isRequired,
};
export default connect(null,devicesActions)(MainTabs);