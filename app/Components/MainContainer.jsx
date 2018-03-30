import React from 'react';
import { Route } from 'react-router-dom';

import Header from './Header';
import LoginTabs from './LoginTabs';
import MainTabs from './MainTabs';
import Profile from './Profile';
import Devices from './Devices';
import DeviceDetails from './Devices/DeviceDetails';
import Offices from './Offices';
import OfficeDetails from './Offices/OfficeDetails';
import User from '../Constants/User';

class MainContainer extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Route path='/login' component={LoginTabs} />
        <Route path='/profile' render={() => <Profile user={User[0]} />} />
        <Route exact path='/devices' render={() => {
          return (
            <div>
              <MainTabs tabIndex='/devices' />
              <Devices />
            </div>
          );
        }} />
        <Route path='/devices/:id' component={DeviceDetails} />
        <Route exact path='/offices' render={() => {
          return (
            <div>
              <MainTabs tabIndex='/offices' />
              <Offices />
            </div>
          );
        }} />
        <Route path='/offices/:id' component={OfficeDetails} />
      </div>
    );
  }
}

export default MainContainer;