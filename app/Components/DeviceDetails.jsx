import React from 'react';
import PropTypes from 'prop-types';

// const DeviceData = [{ 
//   image:'https://images-eu.ssl-images-amazon.com/images/I/612rXM6eMSL._SX385_.jpg',
//   name: 'Apple iPad Pro 10.5", 256GB',
//   identification_num: '0000000497',
//   os: 'macOS High Sierra(version 10.13)',
//   location: 'Kaunas',
// },{
//   image:'https://static.acer.com/up/Resource/Acer/Notebooks/AGW2%20Aspire%20V5/Photo%20Gallery/20130912/Aspire-V5-photogallery-01.png',
//   name: 'Acer Aspire V5-573G 15.6 inches',
//   identification_num: '0000000498',
//   os: 'Windows',
//   location: 'Kaunas',
// }, {
//   image:'https://images-eu.ssl-images-amazon.com/images/I/612rXM6eMSL._SX385_.jpg',
//   name: 'Apple iPad Pro 10.5", 256GB',
//   identification_num: '0000000497',
//   os: 'macOS High Sierra(version 10.13)',
//   location: 'Kaunas',
// },{
//   image:'https://static.acer.com/up/Resource/Acer/Notebooks/AGW2%20Aspire%20V5/Photo%20Gallery/20130912/Aspire-V5-photogallery-01.png',
//   name: 'Acer Aspire V5-573G 15.6 inches',
//   identification_num: '0000000498',
//   os: 'Windows',
//   location: 'Kaunas',
// },
// ];

class DeviceDetails extends React.Component {
  render() {
    return <h1>Device details of id: {this.props.match.params.id}</h1>;
  }
}

DeviceDetails.propTypes = {
  match: PropTypes.object.isRequired,
};

export default DeviceDetails;