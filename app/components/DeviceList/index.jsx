import React from 'react';
import PropTypes from 'prop-types';

import Grid from 'material-ui/Grid';
import Styles from './Styles';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';
import Plus from 'material-ui-icons/Add';
class DeviceList extends React.Component{
  constructor(props){
    super(props);
    this.state={
      devices:props.devices.filter(device=>device.active),
    };
    this.renderDevices=this.renderDevices.bind(this);
    this.handleCheckClick=this.handleCheckClick.bind(this);
  }

  handleCheckClick(deviceId){
    return () => {
      const devices=this.state.devices.map(device=>{
        if(device.id==deviceId){
          device.available=!device.available;
          if(device.custody.length === 0){
            device.custody = this.props.user.id;
          } else {
            device.custody = '';
          }
          device.location=this.props.user.office;
        }
        return device;
      });
      this.setState({devices});
    };
  }
  renderDevices(classes){
    return this.state.devices.map((device,index)=>{
      return (
        //Replace list with device component
        <Grid item xs={4}key={index}>
          <Paper>
            <Link to={'/devices/'+device.id.toString()}>
              <div>
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
              </div>
            </Link>
            <Button 
              variant='raised'
              disabled={device.available? false : device.custody==(this.props.user.id)? false : true} 
              color={device.available?'primary':'secondary'} 
              onClick={this.handleCheckClick(device.id)}>
              <Plus className={classes.leftIcon}/>
              {device.available?'Book device': device.custody==(this.props.user.id)? 'Return device':'Device is booked'}
            </Button>
          </Paper>
        </Grid>
      );
    });
  }
  render(){
    const { classes } = this.props;
    return (
      <Grid container spacing={8} className={classes.root}>
        {this.renderDevices(classes)}
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
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    office: PropTypes.string.isRequired,
    slack: PropTypes.string.isRequired,
  }),
};

export default withStyles(Styles)(DeviceList);