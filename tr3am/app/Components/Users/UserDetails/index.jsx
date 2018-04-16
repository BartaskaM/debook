import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as userDetailsActions from 'ActionCreators/userDetailsActions';
import * as usersActions from 'ActionCreators/usersActions';
import UserDetails from './UserDetails';
import Users from 'Constants/User';

class UserDetailsHandler extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    this.props.setUsers(Users);
    
    if (this.props.match.params.id) {
      // Is in /user/:id
      this.props.getUserWithID(this.props.match.params.id);
    }
    else {
      // Is in /profile
      this.setState({
        user: this.props.currentUser,
      });
    }
  }

  render() {
    return (
      <div>
        {this.state.user &&
          <UserDetails user={this.state.user} />
        }
      </div>
    );
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.user != nextProps.requestedUser) {
      this.setState({
        user: nextProps.requestedUser,
      });
    }
  }
}

UserDetailsHandler.propTypes = {
  getUserWithID: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  currentUser: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    office: PropTypes.shape({
      id: PropTypes.number.isRequired,
      country: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
      address: PropTypes.string.isRequired,
    }).isRequired,
    slack: PropTypes.string.isRequired,
  }).isRequired,
  requestedUser: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    office: PropTypes.shape({
      id: PropTypes.number.isRequired,
      country: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
      address: PropTypes.string.isRequired,
    }).isRequired,
    slack: PropTypes.string.isRequired,
  }),
  match: PropTypes.object,
  setUsers: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    currentUser: state.auth.user,
    requestedUser: state.userDetails.user,
  };
};

export default connect(mapStateToProps, {
  ...usersActions,
  ...userDetailsActions})(withRouter(UserDetailsHandler));