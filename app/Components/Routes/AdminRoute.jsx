import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const AdminRoute = ({ component: Component, user, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      user.admin ? (
        <Component {...props} />
      ) : Object.keys(user).length === 0 ? (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />
      ) : (
        <Redirect
          to={{
            pathname: '/error',
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

AdminRoute.propTypes = {
  user: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  component: PropTypes.oneOfType([
    PropTypes.func, 
    PropTypes.element,
  ]),
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  };
};

export default withRouter(connect(mapStateToProps, null)(AdminRoute));