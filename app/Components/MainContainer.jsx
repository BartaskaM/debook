import React from 'react';
import { Route } from 'react-router-dom';

import Header from './Header';
import LoginTabs from './LoginTabs';
import MainTabs from './MainTabs';
import Users from './Users';
import UserDetails from './Users/UserDetails';
import Devices from './Devices';
import DeviceDetails from './Devices/DeviceDetails';
import Offices from './Offices';
import OfficeDetails from './Offices/OfficeDetails';

class MainContainer extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Route path='/login' component={LoginTabs} />
        <Route path='/profile' render={() => <UserDetails />} />
        <Route exact path='/users' render={() => {
          return (
            <div>
              <MainTabs tabIndex='/users' />
              <Users />
            </div>
          );
        }} />
        <Route path='/users/:id' component={UserDetails} />
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