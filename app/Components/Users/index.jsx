import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import List from 'material-ui/List';
import { withStyles } from 'material-ui/styles';

import Styles from './Styles';
import UsersList from 'Constants/User';
import UserItem from './UserItem';

class Users extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={16}>
          <List className={classes.userList}>
            {UsersList.map(user => (
              <UserItem key={user.id} user={user} />
            ))}
          </List>
          <Grid item xs={12}>
            {/* TODO: Implement button functionality */}
            <Button variant="raised" color="primary" className={classes.addNewButton}>
              ADD NEW
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Users.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(Styles)(Users);