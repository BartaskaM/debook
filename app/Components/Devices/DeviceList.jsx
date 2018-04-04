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
import Clock from 'material-ui-icons/Schedule';
import BookModal from 'Components/BookModal';
import ReserveModal from 'Components/ReserveModal';
import * as devicesActions from 'ActionCreators/devicesActions';
import * as usersActions from 'ActionCreators/usersActions';
import Reservations from 'Constants/Reservations';
import Users from 'Constants/User';

class DeviceList extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      devices: props.devices.filter(device=>device.active),
    };
    this.renderDevices = this.renderDevices.bind(this);
    this.handleCheckClick = this.handleCheckClick.bind(this);
    this.renderDevices = this.renderDevices.bind(this);
    this.openBookDialog = this.openBookDialog.bind(this);
    this.openReserveDialog = this.openReserveDialog.bind(this);
    this.openReservationDetails = this.openReservationDetails.bind(this);
  }

  componentDidMount() {
    const { 
      reservations, 
      setReservations, 
      users, 
      setUsers, 
    } = this.props;
    if(reservations.length === 0){
      setReservations(Reservations);
    }
    if(users.length === 0){
      setUsers(Users);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.devices != this.state.devices) {
      this.setState({
        devices: nextProps.devices,
      });
    }
  }

  handleCheckClick(deviceId){
    const devices = this.state.devices.map(device=>{
      if(device.id == deviceId){
        if(device.custody.length === 0){
          this.openBookDialog(device.id);
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
    const { reservations, user } = this.props; 
    const userReservations = reservations
      .filter(res => res.user == user.id);
    const userReservedDevices = userReservations.map(res => res.device);
    return this.filterDevices().map((device, index)=>{
      return (
        //Replace list with device component
        <Grid item xs={4}key={index}>
          <Paper>
            <Link to={`/devices/${device.id.toString()}`}>
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
              disabled={
                device.available ? false : device.custody == (user.id) ? false : true
              } 
              color={device.available ? 'primary' : 'secondary'} 
              className={classes.button}
              onClick={()=>this.handleCheckClick(device.id)}>
              <Plus className={classes.leftIcon}/>
              {device.available ?
                'Book device' : 
                device.custody == (user.id) ? 
                  'Return device' :
                  'Device is booked'}
            </Button>
            <Button
              variant="raised"
              className={classes.button}
              onClick={ 
                userReservedDevices.includes(device.id) ?
                  () => this.openReservationDetails(userReservations
                    .find(res => res.device == device.id)) :
                  () => this.openReserveDialog(device.id)}>
              <Clock className={classes.leftIcon}/>
              {userReservedDevices.includes(device.id) ? 'Reservation details' : 'Reserve'}
            </Button>
          </Paper>
        </Grid>
      );
    });
  }

  openBookDialog(deviceId){
    this.props.showBookModal(true, deviceId);
  }

  openReserveDialog(deviceId){
    this.props.showReserveModal(true, deviceId);
  }

  openReservationDetails(reservation){
    const { from, to, device } = reservation;
    this.props.showReservationDetails(true, from, to, device);
  }

  render(){
    const { classes } = this.props;
    return (
      <Grid container spacing={8} className={classes.root}>
        {this.renderDevices(classes)}
        <BookModal />
        <ReserveModal />
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
  showReserveModal: PropTypes.func.isRequired,
  reservations: PropTypes.arrayOf(
    PropTypes.shape({
      device: PropTypes.number.isRequired,
      user: PropTypes.number.isRequired,
      from: PropTypes.object.isRequired,
      to: PropTypes.object.isRequired,
    })
  ),
  setReservations: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
  setUsers: PropTypes.func.isRequired,
  showReservationDetails: PropTypes.func.isRequired,
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
    reservations: state.devices.reservations,
    users: state.users.users,
  };
};
export default connect(mapStateToProps, {
  ...devicesActions, 
  ...usersActions,
})(withStyles(Styles)(DeviceList));