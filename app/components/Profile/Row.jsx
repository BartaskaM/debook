import React from 'react';
import PropTypes from 'prop-types';

import Grid from 'material-ui/Grid';
import {withStyles} from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import { styles } from './Styles';

const Row=(props) => {
  function handleChange(e){
    props.changeInfo(props.label, e.target.value);
  }
  function renderSecondField(){
    if(props.edit){
      return (<TextField
        value={props.value}
        onChange={handleChange.bind(this)}
      />);
    } else {
      return <Grid item sm={10}>{props.value}</Grid>;
    }
  }
  const {classes}=props;
  return (<Grid container item>
    <Grid item sm={2} className={classes.label}>{props.label}:</Grid>
    {renderSecondField()}
  </Grid>);
};

Row.propTypes={
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  edit: PropTypes.bool.isRequired,
  changeInfo: PropTypes.func.isRequired,
};

export default withStyles(styles)(Row);
