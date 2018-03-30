import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
    if (this.props.match) {
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
  getUserWithID: PropTypes.func.isRequired,
  match: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    currentUser: state.auth.user,
    requestedUser: state.userDetails.user,
  };
};

export default connect(mapStateToProps, userDetailsActions)(UserDetailsHandler);