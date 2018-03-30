import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const LoggedInRoute = ({ component: Component, user, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      Object.keys(user).length !== 0 ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

LoggedInRoute.propTypes = {
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

export default withRouter(connect(mapStateToProps, null)(LoggedInRoute));