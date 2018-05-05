import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { IsAllowedRole } from 'Utils/routingUtils';

const Authorization = ({ component: Component, allowedRoles, user, location }) => (
  <div>
    {!user ?
      // Not Logged on
      <Redirect
        to={{
          pathname: '/',
          state: { from: location },
        }}
      /> : IsAllowedRole(allowedRoles, user.roles) ?
        <Component /> :
        <Redirect
          to={{
            pathname: '/error',
            state: { from: location },
          }}
        />
    }
  </div>
);

Authorization.propTypes = {
  location: PropTypes.object.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  component: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
  ]).isRequired,
  user: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  };
};

export default withRouter(connect(mapStateToProps, null)(Authorization));