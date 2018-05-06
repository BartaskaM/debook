import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DeviceList from './DeviceList';
import { fetchDevices, fetchBrands } from 'ActionCreators/devicesActions';
import { fetchOffices } from 'ActionCreators/officesActions';
import Filters from 'Components/Filters';

class Devices extends React.Component {
  componentDidMount() {
    const {
      fetchDevices,
      fetchOffices,
      fetchBrands,
    } = this.props;
    fetchDevices();
    fetchOffices();
    fetchBrands();
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
  fetchOffices: PropTypes.func.isRequired,
  fetchBrands: PropTypes.func.isRequired,
};

export default connect(null, {
  fetchDevices,
  fetchOffices,
  fetchBrands,
})(Devices);
