import React from 'react';

import DeviceList from './DeviceList';
import Devices from '../Constants/Devices';

class MainTabs extends React.Component {
  render() {
    return <DeviceList devices={Devices}/>;
  }
}

export default MainTabs;