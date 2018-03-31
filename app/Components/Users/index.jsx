import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import List from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';

import Styles from './Styles';
import * as usersActions from 'ActionCreators/usersActions';
import UsersList from 'Constants/User';
import UserItem from './UserItem';

class Users extends React.Component {
  componentDidMount() {
    //TODO: Fetch users
    this.props.setUsers(UsersList);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={16}>
          <List className={classes.userList}>
            {this.props.users.map(user => (
              <UserItem key={user.id} user={user} />
            ))}
          </List>
        </Grid>
      </div>
    );
  }
}

Users.propTypes = {
  classes: PropTypes.object.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    office: PropTypes.string.isRequired,
    slack: PropTypes.string.isRequired,
  })).isRequired,
  setUsers: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    users: state.users.users,
  };
};

export default connect(mapStateToProps, usersActions)(withStyles(Styles)(Users));