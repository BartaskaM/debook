import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import { withRouter, Link } from 'react-router-dom';
import VerifiedUser from 'material-ui-icons/VerifiedUser';

import { ListItem } from 'material-ui/List';

import Styles from './Styles';

const UserItem = ({ classes, user, history }) => {
  return (
    <Grid item xs={12}>
      <ListItem button onClick={() => history.push(`/users/${user.id}`)}>
        <Paper className={classes.userPaper}>
          <Typography variant='display1'>
            <Grid container>
              <Grid item xs={2}>{user.firstName}</Grid>
              <Grid item xs={2}>{user.lastName}</Grid>
              <Grid item xs={3}>{user.email}</Grid>
              <Grid item xs={2}
                onClick={(e) => {
                  e.stopPropagation();
                  history.push(`/offices/${user.office.id}`);
                }}>
                <Link to='#'>{user.office.city}</Link>
              </Grid>
              <Grid item xs={2}>{user.slack || '-'}</Grid>
              <Grid item xs={1}>
                {user.roles.includes('admin') && <VerifiedUser/>}
              </Grid>
            </Grid>
          </Typography>
        </Paper>
      </ListItem>
    </Grid>
  );
};

UserItem.propTypes = {
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    office: PropTypes.shape({
      id: PropTypes.number.isRequired,
      city: PropTypes.string.isRequired,
    }).isRequired,
    slack: PropTypes.string,
    roles: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default withStyles(Styles)(withRouter(UserItem));