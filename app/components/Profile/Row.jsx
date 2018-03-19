import React from 'react';

import Grid from 'material-ui/Grid';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import TextField from 'material-ui/TextField';

const styles = {
  label:{
    color: '#999',
    textTransform: 'capitalize',
  },
};

class Row extends React.Component{
  handleChange(e){
    this.props.changeInfo(this.props.label, e.target.value);
  }
  createSecondField(){
    if(this.props.edit){
      return (<TextField
        value={this.props.value}
        onChange={this.handleChange.bind(this)}
      />);
    } else {
      return <Grid item sm={10}>{this.props.value}</Grid>;
    }
  }
  render(){
    const {classes}=this.props;
    return (<Grid container item>
      <Grid item sm={2} className={classes.label}>{this.props.label}:</Grid>
      {this.createSecondField()}
    </Grid>);
  }
}

Row.propTypes={
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  edit: PropTypes.bool.isRequired,
  changeInfo: PropTypes.func.isRequired,
};

export default withStyles(styles)(Row);
