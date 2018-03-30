import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import { withRouter } from 'react-router-dom';

import { ListItem } from 'material-ui/List';

import Styles from './Styles';

const OfficeItem = ({ classes, user, history }) => {
  return (
    <Grid item xs={12}>
      <ListItem button onClick={() => history.push(`/users/${user.id}`)}>
        <Paper className={classes.userPaper}>
          <Typography variant='display1'>
            <Grid container>
              <Grid item xs={2}>{user.firstName}</Grid>
              <Grid item xs={2}>{user.lastName}</Grid>
              <Grid item xs={3}>{user.email}</Grid>
              <Grid item xs={2}>{user.office}</Grid>
              <Grid item xs={3}>{user.slack}</Grid>
            </Grid>
          </Typography>
        </Paper>
      </ListItem>
    </Grid>
  );
};

OfficeItem.propTypes = {
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    office: PropTypes.string.isRequired,
    slack: PropTypes.string.isRequired,
    admin: PropTypes.bool.isRequired,
  }).isRequired,
};


export default withStyles(Styles)(withRouter(OfficeItem));