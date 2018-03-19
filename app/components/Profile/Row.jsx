import React from 'react';

import Grid from 'material-ui/Grid';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';

const styles = {
  label:{
    color: '#999',
  },
};

class Row extends React.Component{
  render(){
    const {classes}=this.props;
    return (<Grid container item>
      <Grid item sm={2} className={classes.label}>{this.props.label}</Grid>
      <Grid item sm={10}>{this.props.value}</Grid>
    </Grid>);
  }
}

Row.propTypes={
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Row);
