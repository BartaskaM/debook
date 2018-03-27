import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import DeviceList from './DeviceList';
import Devices from 'Constants/Devices';
import User from 'Constants/User';
import * as devicesActions from 'ActionCreators/devicesActions';
import Filters from 'components/Filters';


class MainTabs extends React.Component {
  componentWillMount(){
    //TODO: Fetch devices
    this.props.setDevices(Devices);
  }
  render() {
    return (
      <div>
        <Filters />
        <DeviceList user={User}/>
      </div>
    );
  }
}
MainTabs.propTypes = {
  setDevices: PropTypes.func.isRequired,
};
export default connect(null,devicesActions)(MainTabs);