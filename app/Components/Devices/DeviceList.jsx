import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Grid from 'material-ui/Grid';
import Styles from './Styles';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';
import Plus from 'material-ui-icons/Add';

import BookModal from 'components/BookModal';
import Device from './Device';
import * as devicesActions from 'ActionCreators/devicesActions';

class DeviceList extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      devices: props.devices.filter(device=>device.active),
    };
    this.renderDevices = this.renderDevices.bind(this);
    this.handleCheckClick = this.handleCheckClick.bind(this);
    this.renderDevices = this.renderDevices.bind(this);
    this.open = this.open.bind(this);
  }

  handleCheckClick(deviceId){
    const devices = this.state.devices.map(device=>{
      if(device.id == deviceId){
        if(device.custody.length === 0){
          this.open(device.id);
        } else {
          //Handle device return
          device.available = !device.available;
          device.custody = '';
          device.location = this.props.user.office;
        }
      }
      return device;
    });
    this.setState({devices}); 
  }

  filterDevices(){
    let devicesToRender = this.state.devices
      .filter(device => device.model.toLowerCase().includes(this.props.modelFilter.toLowerCase()));
    if(this.props.brandFilter.length > 0)
    {
      devicesToRender = devicesToRender.filter(device => 
        this.props.brandFilter.includes(device.brand));
    }
    if(this.props.officeFilter.length > 0){
      devicesToRender = devicesToRender.filter(device => 
        this.props.officeFilter.includes(device.location));
    }
    if(this.props.showAvailable != this.props.showUnavailable)
    {
      if(this.props.showAvailable){
        devicesToRender = devicesToRender.filter(device => device.available);
      }
      if(this.props.showUnavailable){
        devicesToRender = devicesToRender.filter(device => !device.available);
      }
    }
    return devicesToRender;
  }

  renderDevices(classes){      
    return this.filterDevices().map((device, index)=>{
      return (
        //Replace list with device component
        <Grid item xs={4}key={index}>
          <Paper>
            <Link to={`/devices/${device.id.toString()}`}>
              <Device key={device.id} device={device}/>
            </Link>
            <Button            
              disabled={
                device.available ? false : device.custody == (this.props.user.id) ? false : true
              } 
              variant='raised'
              color={device.available ? 'primary' : 'secondary'} 
              onClick={()=>this.handleCheckClick(device.id)}>
              <Plus className={classes.leftIcon}/>
              {device.available ?
                'Book device' : 
                device.custody == (this.props.user.id) ? 
                  'Return device' :
                  'Device is booked'}
            </Button>          
          </Paper>
        </Grid>
      );
    });
  }

  open(deviceId){
    this.props.setCurrentDate();
    const currentDate = new Date();
    if(currentDate.getHours() !== 23)
    {
      currentDate.setHours(currentDate.getHours() + 1);
    } 
    this.props.setReturnDate(currentDate);
    this.props.setSelectedDevice(deviceId);
    this.props.showBookModal(true);
  }

  render(){
    const { classes } = this.props;
    return (
      <Grid container spacing={8} className={classes.root}>
        {this.renderDevices(classes)}
        <BookModal />
      </Grid>
    );
  }
}

DeviceList.propTypes = {
  devices: PropTypes.arrayOf(PropTypes.shape({
    brand: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
    os: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    custody: PropTypes.string.isRequired,
    available: PropTypes.bool.isRequired,
    active: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
  })).isRequired,
  classes: PropTypes.object.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    office: PropTypes.string.isRequired,
    slack: PropTypes.string.isRequired,
  }),
  modelFilter: PropTypes.string.isRequired,
  brandFilter: PropTypes.array.isRequired,
  officeFilter: PropTypes.array.isRequired,
  showAvailable: PropTypes.bool.isRequired,
  showUnavailable: PropTypes.bool.isRequired,
  setCurrentDate: PropTypes.func.isRequired,
  setReturnDate: PropTypes.func.isRequired,
  showBookModal: PropTypes.func.isRequired,
  setSelectedDevice: PropTypes.func.isRequired,
};
const mapStateToProps = state => {
  return {
    devices: state.devices.devices,
    modelFilter: state.devices.modelFilter,
    brandFilter: state.devices.brandFilter,
    officeFilter: state.devices.officeFilter,
    showAvailable: state.devices.showAvailable,
    showUnavailable: state.devices.showUnavailable,
    user: state.auth.user,
  };
};
export default connect(mapStateToProps, devicesActions)(withStyles(Styles)(DeviceList));