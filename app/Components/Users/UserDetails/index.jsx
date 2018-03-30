import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as userDetailsActions from 'ActionCreators/userDetailsActions';
import UserDetails from './UserDetails';

class UserDetailsHandler extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      // Is in /user/:id
      this.props.getUserWithID(this.props.match.params.id);
    }
    else {
      // Is in /profile
      // Temporary fix while there is no client side authorization
      if(Object.keys(this.props.currentUser).length === 0) {
        this.props.history.push('/login');
      }

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
    office: PropTypes.string.isRequired,
    slack: PropTypes.string.isRequired,
  }).isRequired,
  requestedUser: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    office: PropTypes.string.isRequired,
    slack: PropTypes.string.isRequired,
  }),
  match: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    currentUser: state.auth.user,
    requestedUser: state.userDetails.user,
  };
};

export default connect(mapStateToProps, userDetailsActions)(withRouter(UserDetailsHandler));