import React from 'react';

import DeviceList from './DeviceList';
import Devices from '../Constants/Devices';
import User from '../Constants/User';

class MainTabs extends React.Component {
  render() {
    return <DeviceList devices={Devices} user={User}/>;
  }
}

export default MainTabs;