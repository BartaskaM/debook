import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DeviceList from './DeviceList';
import DevicesList from 'Constants/Devices';
import * as devicesActions from 'ActionCreators/devicesActions';
import Filters from 'Components/Filters';

class Devices extends React.Component {
  componentDidMount() {
    //TODO: Fetch devices
    this.props.setDevices(DevicesList);
  }

  render() {
    return (
      <div>
        <Filters />
        <DeviceList />
      </div>
    );
  }
}
Devices.propTypes = {
  setDevices: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};
export default connect(null, devicesActions)(Devices);