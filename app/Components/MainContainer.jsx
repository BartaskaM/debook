import React from 'react';
import { Route } from 'react-router-dom';

import Header from './Header';
import LoginTabs from './LoginTabs';
import MainTabs from './MainTabs';
import Profile from './Profile';
import DeviceDetails from './Device';
import Offices from './Offices';
import OfficeDetails from './Offices/OfficeDetails';
import User from '../Constants/User';
import DetailedDevices from '../Constants/DetailedDevices';

class MainContainer extends React.Component { 
  render() {
    return (
      <div>
        <Header />
        <Route path='/login' component={LoginTabs} />
        <Route path='/main' component={MainTabs} />
        <Route path='/profile' render={() => <Profile user={User[0]} />} />
        <Route path='/devices/:id' render={() => <DeviceDetails device={DetailedDevices[0]} />} />
        <Route exact path='/offices' component={Offices} />
        <Route path='/offices/:id' component={OfficeDetails} />
      </div>
    );
  }
}

export default MainContainer;