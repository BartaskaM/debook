import React from 'react';
import { Route } from 'react-router-dom';

import * as RouteRoles from 'Constants/RouteRoles';
import Authorization from './Authorization';
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
import { Profile } from '../Constants/RouteRoles';

class MainContainer extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Route path='/login' component={LoginTabs} />
        <Route exact path='/error' component={ErrorComponent} />

        <Route path='/profile' render={() =>
          <Authorization component={Profile} allowedRoles={RouteRoles.Profile} />
        } />
        <Route exact path='/users' render={() =>
          <Authorization component={() => (
            <div>
              <MainTabs tabIndex='/users' />
              <Users />
            </div>
          )} allowedRoles={RouteRoles.Users} />
        } />
        <Route path='/users/:id' render={() =>
          <Authorization component={UserDetails} allowedRoles={RouteRoles.UserDetails} />
        } />

        <Route exact path='/devices' render={() =>
          <Authorization component={() => (
            <div>
              <MainTabs tabIndex='/devices' />
              <Devices />
            </div>
          )} allowedRoles={RouteRoles.Devices} />
        } />
        <Route path='/devices/:id' render={() =>
          <Authorization component={DeviceDetails} allowedRoles={RouteRoles.DeviceDetails} />
        } />

        <Route exact path='/offices' render={() =>
          <Authorization component={() => (
            <div>
              <MainTabs tabIndex='/offices' />
              <Offices />
            </div>
          )} allowedRoles={RouteRoles.Offices} />
        } />
        <Route path='/offices/:id' render={() =>
          <Authorization component={OfficeDetails} allowedRoles={RouteRoles.OfficeDetails} />
        } />
      </div>
    );
  }
}

export default MainContainer;