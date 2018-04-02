import React from 'react';
import PropTypes from 'prop-types';

import Grid from 'material-ui/Grid';
import {withStyles} from 'material-ui/styles';

import { styles } from './Styles';

const Row = (props) => {

  function renderSecondField(){
    return <Grid item sm={9}>{props.value}</Grid>;
  }
  const {classes} = props;
  return (<Grid container item>
    <Grid item sm={2} className={classes.label}>{props.label}:</Grid>
    {renderSecondField()}
  </Grid>);
};

Row.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Row);
