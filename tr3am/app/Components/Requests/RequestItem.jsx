import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import { withRouter } from 'react-router-dom';
import { ListItem } from 'material-ui/List';

import Styles from './Styles';

const RequestItem = ({ classes, request, history, isUpdated }) => {
  return (
    <Grid item xs={12} >
      <ListItem button onClick={() => history.push(`/requests/${request.id}`)}>
        <Paper className={classes.officePaper + ' ' + (isUpdated ? classes.highlighted : '')}>
          <Typography variant='display1'>
            <Grid container>
              <Grid item xs={10}>{request.messages[0].text}</Grid>
              <Grid item xs={2}>{request.status}</Grid>
            </Grid>
          </Typography>
        </Paper>
      </ListItem>
    </Grid>
  );
};

RequestItem.propTypes = {
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  isUpdated: PropTypes.bool,
  request: PropTypes.shape({
    id: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    expectedDate: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    resolvedAt: PropTypes.string,
    messages: PropTypes.array,
  }).isRequired,
};

export default withStyles(Styles)(withRouter(RequestItem));