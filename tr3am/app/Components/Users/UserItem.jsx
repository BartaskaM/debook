import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import { withRouter } from 'react-router-dom';
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
              <Grid item xs={2}>{user.office.city}</Grid>
              <Grid item xs={2}>{user.slack || '-'}</Grid>
              <Grid item xs={1}>
                {user.role === 'admin' && <VerifiedUser/>}
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
      country: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    }).isRequired,
    slack: PropTypes.string,
    role: PropTypes.string.isRequired,
  }).isRequired,
};

export default withStyles(Styles)(withRouter(UserItem));