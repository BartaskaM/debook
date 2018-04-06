import React from 'react';
import { Route } from 'react-router-dom';

import * as RouteRoles from 'Constants/RouteRoles';
import Auth from 'Components/Authorization';
import Header from 'Components/Header';
import LoginTabs from 'Components/LoginTabs';
import MainTabs from 'Components/MainTabs';
import Users from 'Components/Users';
import UserDetails from 'Components/Users/UserDetails';
import Devices from 'Components/Devices';
import DeviceDetails from 'Components/Devices/DeviceDetails';
import Offices from 'Components/Offices';
import OfficeDetails from 'Components/Offices/OfficeDetails';
import BookingEvents from 'Components/BookingEvents';
import ErrorComponent from 'Components/Errors/Basic';
import BrandList from 'Components/Brands';

class MainContainer extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Route exact path='/' component={LoginTabs} />
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
        <Route exact path='/events' render={() =>
          <Auth component={() => (
            <div>
              <MainTabs tabIndex='/events' />
              <BookingEvents />
            </div>
          )} allowedRoles={RouteRoles.Offices} />
        } />
        <Route exact path='/brands' render={() =>
          <Auth component={() => (
            <div>
              <MainTabs tabIndex='/brands' />
              <BrandList />
            </div>
          )} allowedRoles={RouteRoles.Brands} />
        } />

      </div>
    );
  }
}

export default MainContainer;