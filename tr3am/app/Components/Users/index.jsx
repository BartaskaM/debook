import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import List from 'material-ui/List';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { LinearProgress } from 'material-ui/Progress';

import Styles from './Styles';
import StylesUtils from 'Utils/StylesUtils';
import UserItem from './UserItem';
import * as usersActions from 'ActionCreators/usersActions';

class Users extends React.Component {

  componentDidMount() {
    this.props.fetchUsers();
  }

  renderListHeader() {
    const { classes } = this.props;
    return (
      <Grid item xs={12}>
        <Paper className={classes.headerPaper}>
          <Typography variant='display1'>
            <Grid container className={classes.headerContainer}>
              <Grid item xs={2}>FirstName</Grid>
              <Grid item xs={2}>LastName</Grid>
              <Grid item xs={3}>Email</Grid>
              <Grid item xs={2}>Office</Grid>
              <Grid item xs={2}>Slack name</Grid>
              <Grid item xs={1}></Grid>
            </Grid>
          </Typography>
        </Paper>
      </Grid>
    );
  }

  render() {
    const { classes, users, fetchUsersLoading } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={16}>
          {this.renderListHeader()}
          {fetchUsersLoading ?
            <Grid item xs={12}>
              <LinearProgress />
            </Grid>
            : <List className={classes.userList}>
              {users.map(user => (
                <UserItem key={user.id} user={user} />
              ))}
            </List>}
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
    office: PropTypes.shape({
      id: PropTypes.number.isRequired,
      country: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    }).isRequired,
    slack: PropTypes.string.isRequired,
  })).isRequired,
  fetchUsers: PropTypes.func.isRequired,
  fetchUsersLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => {
  return {
    users: state.users.users,
    fetchUsersLoading: state.users.fetchUsersLoading,
    fetchUsersErrorMessage: state.users.fetchUsersErrorMessage,
  };
};

export default connect(mapStateToProps, usersActions)(
  withStyles({ ...Styles, ...StylesUtils })(Users)
);