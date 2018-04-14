import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import List from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

import Styles from './Styles';
import StylesUtils from 'Utils/StylesUtils';
import * as usersActions from 'ActionCreators/usersActions';
import UsersList from 'Constants/User';
import UserItem from './UserItem';

class Users extends React.Component {
  constructor() {
    super();

    this.renderListHeader = this.renderListHeader.bind(this);
  }

  componentDidMount() {
    //TODO: Fetch users
    this.props.setUsers(UsersList);
  }

  renderListHeader() {
    const { classes } = this.props;
    return (
      <Grid item xs={12}>
        <Paper className={classes.headerPaper}>
          <Typography variant='display1'>
            <Grid container>
              <Grid item xs={2}>FirstName</Grid>
              <Grid item xs={2}>LastName</Grid>
              <Grid item xs={3}>Email</Grid>
              <Grid item xs={2}>Office</Grid>
              <Grid item xs={3}>Slack name</Grid>
            </Grid>
          </Typography>
        </Paper>
      </Grid>
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={16}>
          {this.renderListHeader()}
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

export default connect(mapStateToProps, usersActions)(
  withStyles({ ...Styles, ...StylesUtils })(Users)
);