import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class DeviceDetails extends React.Component {
  render() {
    return <h1>Device details of id: {this.props.match.params.id}</h1>;
  }
}

DeviceDetails.propTypes = {
  match: PropTypes.object.isRequired,
};

export default withRouter(DeviceDetails);