import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import { CircularProgress } from 'material-ui/Progress';

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
<<<<<<< HEAD
import NewDevice from 'Components/Devices/NewDevice';
=======
import * as auth from 'ActionCreators/authActions';
import Styles from './Styles';
>>>>>>> develop

class MainContainer extends React.Component {
  componentDidMount() {
    if (!this.props.user) {
      this.props.fetchUserInfo();
    }
  }

  render() {
    const { fetchUserDetailsLoading, classes } = this.props;

    return !fetchUserDetailsLoading ? (
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
          )} allowedRoles={RouteRoles.Events} />
        } />
        <Route exact path='/brands' render={() =>
          <Auth component={() => (
            <div>
              <MainTabs tabIndex='/brands' />
              <BrandList />
            </div>
          )} allowedRoles={RouteRoles.Brands} />
        } />
<<<<<<< HEAD
        <Route exact path='/newdevice' render={() =>
          <Auth component={() => (
            <div>
              <MainTabs tabIndex='/devices' />
              <NewDevice />
            </div>
          )} allowedRoles={RouteRoles.Offices} />
        } />
=======
>>>>>>> develop
      </div>
    ) :
      <CircularProgress
        className={classes.loadingCircle}
        size={150}
      />;
  }
}

MainContainer.propTypes = {
  user: PropTypes.object,
  fetchUserDetailsLoading: PropTypes.bool,
  fetchUserInfo: PropTypes.func,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    fetchUserDetailsLoading: state.auth.fetchUserDetailsLoading,
  };
};

export default connect(mapStateToProps, auth)(
  withStyles(Styles)(MainContainer)
);