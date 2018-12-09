import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import { withRouter } from 'react-router-dom';
import { ListItem } from 'material-ui/List';

import Styles from '../Styles';

const MessageItem = ({ classes, message }) => {
  return (
    <Grid item xs={12}>
      <ListItem>
        <Paper className={classes.officePaper}>
          <Typography variant='display1'>
            <Grid container className={classes.messageText}>
              <Grid item xs={12}>{message.text}</Grid>
            </Grid>
            <Grid container className={classes.messageFooter}>
              <Grid item xs={3}>{message.user.firstName} {message.user.lastName} </Grid>
              <Grid item xs={9}>{message.createdAt.toLocaleDateString()},{' '}
                {message.createdAt.toLocaleTimeString([],
                  { hour: '2-digit', minute: '2-digit' })}</Grid>
            </Grid>
          </Typography>
        </Paper>
      </ListItem>
    </Grid>
  );
};
/*
 * 
        */
MessageItem.propTypes = {
  classes: PropTypes.object.isRequired,
  message: PropTypes.object.isRequired,
};

export default withStyles(Styles)(withRouter(MessageItem));