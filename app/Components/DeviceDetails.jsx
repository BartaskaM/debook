import React from 'react';
import PropTypes from 'prop-types';

export default class DeviceDeatils extends React.Component {
  render() {
    return <h1>Device details of id: {this.props.match.params.id}</h1>;
  }
}

DeviceDeatils.propTypes = {
  match: PropTypes.object.isRequired,
};