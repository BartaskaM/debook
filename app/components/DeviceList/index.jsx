import React from 'react';
import PropTypes from 'prop-types';

import Grid from 'material-ui/Grid';
import Styles from './Styles';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';

class DeviceList extends React.Component{
  constructor(props){
    super(props);
    this.state={
      devices:props.devices.filter(device=>{return device.active===true;}),
    };
    this.renderDevices=this.renderDevices.bind(this);
    this.handleCheckClick=this.handleCheckClick.bind(this);
  }

  handleCheckClick(deviceId){
    return () => {
      const devices=this.state.devices.map(device=>{
        if(device.id==deviceId){
          device.available=!device.available;
        }
        return device;
      });
      this.setState({devices});
    };
  }
  renderDevices(){
    return this.state.devices.map((device,index)=>{
      return (
        <Grid item xs={4}key={index}>
          <Paper>
            <ul>
              <li>Id: {device.id}</li>
              <li>Brand: {device.brand}</li>
              <li>Model: {device.model}</li>
              <li>OS: {device.os}</li>
              <li>Location: {device.location}</li>
              <li>Custody: {device.custody}</li>
              <li>Available: {device.available.toString()}</li>
              <li>Active: {device.active.toString()}</li>
            </ul>
            <Button variant='raised' color={device.available?'primary':'secondary'} onClick={this.handleCheckClick(device.id)}>{device.available?'Check out':'Check in'}</Button>
          </Paper>
        </Grid>
      );
    });
  }
  render(){
    const { classes } = this.props;
    return (
      <Grid container spacing={8} className={classes.root}>
        {this.renderDevices()}
      </Grid>
    );
  }
}

DeviceList.propTypes={
  devices:PropTypes.arrayOf(PropTypes.shape({
    brand:PropTypes.string.isRequired,
    model:PropTypes.string.isRequired,
    os:PropTypes.string.isRequired,
    location:PropTypes.string.isRequired,
    custody:PropTypes.string.isRequired,
    available:PropTypes.bool.isRequired,
    active:PropTypes.bool.isRequired,
    id:PropTypes.number.isRequired,
  })).isRequired,
  classes:PropTypes.object.isRequired,
};

export default withStyles(Styles)(DeviceList);