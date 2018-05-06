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
      user,
      fetchOffices,
      fetchBrands,
    } = this.props;
    fetchDevices(user.id);
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
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    office: PropTypes.shape({
      id: PropTypes.number.isRequired,
      country: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
      address: PropTypes.string.isRequired,
    }).isRequired,
    slack: PropTypes.string,
  }),
  fetchOffices: PropTypes.func.isRequired,
  fetchBrands: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.auth.user,
});
export default connect(mapStateToProps, {
  fetchDevices,
  fetchOffices,
  fetchBrands,
})(Devices);