import React from 'react';
import { Route } from 'react-router-dom';

import AdminRoute from './Routes/AdminRoute';
import LoggedInRoute from './Routes/LoggedInRoute';
import Header from './Header';
import LoginTabs from './LoginTabs';
import MainTabs from './MainTabs';
import Users from './Users';
import UserDetails from './Users/UserDetails';
import Devices from './Devices';
import DeviceDetails from './Devices/DeviceDetails';
import Offices from './Offices';
import OfficeDetails from './Offices/OfficeDetails';
import ErrorComponent from './Error';

class MainContainer extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Route path='/login' component={LoginTabs} />
        <Route exact path='/error' component={ErrorComponent} />
        
        <LoggedInRoute path='/profile' component={UserDetails} />
        <LoggedInRoute path='/users/:id' component={UserDetails} />
        <LoggedInRoute exact path='/devices' component={() => {
          return (
            <div>
              <MainTabs tabIndex='/devices' />
              <Devices />
            </div>
          );
        }} />
        <LoggedInRoute path='/devices/:id' component={DeviceDetails} />
        <LoggedInRoute path='/offices/:id' component={OfficeDetails} />

        <AdminRoute exact path='/users' component={() => {
          return (
            <div>
              <MainTabs tabIndex='/users' />
              <Users />
            </div>
          );
        }} />
        <AdminRoute exact path='/offices' component={() => {
          return (
            <div>
              <MainTabs tabIndex='/offices' />
              <Offices />
            </div>
          );
        }} />
      </div>
    );
  }
}

export default MainContainer;