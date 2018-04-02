import React from 'react';
import { Route } from 'react-router-dom';

import * as RouteRoles from 'Constants/RouteRoles';
import Auth from './Authorization';
import Header from './Header';
import LoginTabs from './LoginTabs';
import MainTabs from './MainTabs';
import Users from './Users';
import UserDetails from './Users/UserDetails';
import Devices from './Devices';
import DeviceDetails from './Devices/DeviceDetails';
import Offices from './Offices';
import OfficeDetails from './Offices/OfficeDetails';
//import User from '../Constants/User';
//import BookingEvents from './BookingEvents';
import ErrorComponent from './Error';

class MainContainer extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Route path='/login' component={LoginTabs} />
        <Route exact path='/error' component={ErrorComponent} />

        <Route path='/profile' render={() =>
          <Auth component={UserDetails} allowedRoles={RouteRoles.UserDetails} />
        } />
        <Route exact path='/users' render={() =>
          <Auth component={() => (
            <div>
              <MainTabs tabIndex='/users' />
              <Users />
            </div>
          )} allowedRoles={RouteRoles.Users} />
        } />
        <Route path='/users/:id' render={() =>
          <Auth component={UserDetails} allowedRoles={RouteRoles.UserDetails} />
        } />

        <Route exact path='/devices' render={() =>
          <Auth component={() => (
            <div>
              <MainTabs tabIndex='/devices' />
              <Devices />
            </div>
          )} allowedRoles={RouteRoles.Devices} />
        } />
        <Route path='/devices/:id' render={() =>
          <Auth component={DeviceDetails} allowedRoles={RouteRoles.DeviceDetails} />
        } />

        <Route exact path='/offices' render={() =>
          <Auth component={() => (
            <div>
              <MainTabs tabIndex='/offices' />
              <Offices />
            </div>
          )} allowedRoles={RouteRoles.Offices} />
        } />
        <Route path='/offices/:id' render={() =>
          <Auth component={OfficeDetails} allowedRoles={RouteRoles.OfficeDetails} />
        } />
        {/* <Route exact path='/events' render={() =>
          <Auth component={() => (
            <div>
              <MainTabs tabIndex='/events' />
              <BookingEvents />
            </div>
          );
        }} /> */}
      </div>
    );
  }
}

export default MainContainer;