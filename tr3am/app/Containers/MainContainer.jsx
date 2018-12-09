import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
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
import Error403 from 'Components/Errors/403';
import Error404 from 'Components/Errors/404';
import BrandList from 'Components/Brands';
import CreateDevice from 'Components/Devices/CreateDevice';
import RequestList from 'Components/Requests';
import Request from 'Components/Requests/Request';
import * as auth from 'ActionCreators/authActions';
import Styles from './Styles';

class MainContainer extends React.Component {
  constructor() {
    super();
    /* Render initiates before fetchUserDetailsLoading turns to true,
     * that is why we deny it before we see it tries or fails(no cookie)
     * to fetch the user. 
     */
    this.state = {
      allowRendering: true,
    };
  }

  componentDidMount() {
    if (!this.props.user) {
      this.props.fetchUserInfo();
    }
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.fetchUserDetailsLoading === true || nextProps.fetchUserDetailsError === true) {
      return {
        allowRendering: true,
      };
    }

    return null;
  }

  render() {
    const { fetchUserDetailsLoading, classes } = this.props;

    return this.state.allowRendering && !fetchUserDetailsLoading ? (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={LoginTabs} />
          <Route exact path='/forbidden' component={Error403} />
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
          <Route exact path='/createDevice' render={() =>
            <Auth component={CreateDevice} allowedRoles={RouteRoles.CreateDevice} />
          } />
          <Route exact path='/editDevice/:id' render={() =>
            <Auth component={CreateDevice} allowedRoles={RouteRoles.EditDevice} />
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

          <Route exact path='/requests' render={() =>
            <div>
              <MainTabs tabIndex='/requests' />
              <RequestList />
            </div>
          } />

          <Route path='/requests/:id' render={() =>
            <Auth component={Request} allowedRoles={RouteRoles.Requests} />
          } />

          { /* <Auth component={() => (
              <div>
                <MainTabs tabIndex='/requests' />
                <RequestList />
              </div>
            )} allowedRoles={RouteRoles.Requests} /> */ }
          <Route component={Error404} />
        </Switch>
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
  fetchUserDetailsError: PropTypes.bool,
  fetchUserInfo: PropTypes.func,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    fetchUserDetailsLoading: state.auth.fetchUserDetailsLoading,
    fetchUserDetailsError: state.auth.fetchUserDetailsError,
  };
};

export default connect(mapStateToProps, auth)(
  withStyles(Styles)(MainContainer)
);