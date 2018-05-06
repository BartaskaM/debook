import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DeviceList from './DeviceList';
import * as devicesActions from 'ActionCreators/devicesActions';
import Filters from 'Components/Filters';

class Devices extends React.Component {
  componentDidMount() {
    this.props.fetchDevices();
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
  fetchDevices: PropTypes.func.isRequired,
};

export default connect(null, devicesActions)(Devices);