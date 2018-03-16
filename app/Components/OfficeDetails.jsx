import React from 'react';
import PropTypes from 'prop-types';

class OfficeDetails extends React.Component {
  render() {
    return <h1>Offise details of id: {this.props.match.params.id}</h1>;
  }
}

OfficeDetails.propTypes = {
  match: PropTypes.object.isRequired,
};

export default OfficeDetails;