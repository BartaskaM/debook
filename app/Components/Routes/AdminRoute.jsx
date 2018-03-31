import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const AdminRoute = ({ component: Component, user, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      !user ? (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />
      ) : user.admin ? (
        <Component {...props} />
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
  location: PropTypes.object.isRequired,
  user: PropTypes.object,
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