import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';

import { styles } from './Styles';

const Row = ({ classes, value, label, onClick }) => {
  function renderSecondField() {
    return <Grid item sm={9} onClick={onClick}>{value}</Grid>;
  }
  return (<Grid container item>
    <Grid item sm={2} className={classes.label}>{label}:</Grid>
    {renderSecondField()}
  </Grid>);
};

Row.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};

export default withStyles(styles)(Row);
