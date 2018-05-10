import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Divider from 'material-ui/Divider';
import { ListItem } from 'material-ui/List';

const Row = ({ first, second, styleClass, addDivider = false}) => {
  return (
    <Grid item xs={12}>
      <ListItem>
        <Grid container>
          {addDivider ? <Grid item xs={12}><Divider /></Grid> : null}
          <Grid item xs={6} className={styleClass}>{first}</Grid>
          <Grid item xs={6} className={styleClass}>{second}</Grid>
        </Grid>
      </ListItem>
    </Grid>
  );
};

Row.propTypes = {
  first: PropTypes.string.isRequired,
  second: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
  styleClass: PropTypes.string.isRequired,
  addDivider: PropTypes.bool,
};
export default Row;