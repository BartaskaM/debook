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
import Devices from 'Constants/Devices';
import Device from './Device';
import { fifteenMinutes } from 'Constants/Values';

class DeviceList extends React.Component {
  constructor(props) {
    super(props);
    this.renderDevices = this.renderDevices.bind(this);
    this.renderDevices = this.renderDevices.bind(this);
    this.openBookDialog = this.openBookDialog.bind(this);
    this.openReserveDialog = this.openReserveDialog.bind(this);
    this.openReservationDetails = this.openReservationDetails.bind(this);
    this.returnDevice = this.returnDevice.bind(this);
  }

  componentDidMount() {
    const {
      reservations,
      setReservations,
      users,
      setUsers,
      devices,
      setDevices,
    } = this.props;
    if (reservations.length === 0) {
      setReservations(Reservations);
    }
    if (users.length === 0) {
      setUsers(Users);
    }
    if (devices.length === 0) {
      setDevices(Devices);
    }
  }

  returnDevice(deviceId) {
    const { devices, setDevices, user } = this.props;
    const newDevices = devices.map(device => {
      if (device.id === deviceId) {
        //Handle device return
        device.available = true;
        device.custody = null;
        device.location = user.office;
      }
      return device;
    });
    setDevices(newDevices);
  }

  filterDevices() {
    const {
      devices,
      modelFilter,
      brandFilter,
      showAvailable,
      showUnavailable,
      officeFilter,
    } = this.props;
    let devicesToRender = devices
      .filter(device => device.active &&
        device.model.toLowerCase().includes(modelFilter.toLowerCase()));
    if (brandFilter.length > 0) {
      devicesToRender = devicesToRender.filter(device =>
        brandFilter.includes(device.brand));
    }
    if (officeFilter.length > 0) {
      devicesToRender = devicesToRender.filter(device =>
        officeFilter.includes(device.location));
    }
    if (showAvailable != showUnavailable) {
      if (showAvailable) {
        devicesToRender = devicesToRender.filter(device => device.available);
      }
      if (showUnavailable) {
        devicesToRender = devicesToRender.filter(device => !device.available);
      }
    }
    return devicesToRender;
  }

  canCheckIn(reservation){
    if(reservation){
      const now = new Date();
      if(now - reservation.from < fifteenMinutes){
        return true;
      } else {
        return false;
      }
    }
  }

  checkIn(deviceId){
    const {
      devices,
      user,
      setDevices,
    } = this.props;
    //Update device
    const updatedDevices = [...devices];
    updatedDevices.map(device => {
      if (device.id == deviceId) {
        device.custody = user.id;
        device.available = false;
      }
    });
    setDevices(updatedDevices);
    //Post booking info
    //Change reservation status
  }

  renderDevices() {
    const { reservations, user, classes } = this.props;
    const userReservations = reservations
      .filter(res => res.user === user.id);
    return this.filterDevices().map((device, index) => {
      const userReservationForThisDevice = userReservations.find(res => res.device == device.id);
      return (
        //Replace list with device component
        <Grid item xs={4} key={index}>
          <Paper className={classes.devicePaper}>
            <div className={classes.deviceContainer}>
              <Link to={`/devices/${device.id.toString()}`}>
                <Device key={device.id} device={device}/>
              </Link>
            </div>
            <div className={classes.buttonsContainer}>
              <Button
                variant='raised'
                disabled={
                  device.available ? false : device.custody === user.id ? false : true
                }
                color={device.available ? 'primary' : 'secondary'}
                className={classes.button}
                onClick={device.custody ?
                  () => this.returnDevice(device.id) :
                  this.canCheckIn(userReservationForThisDevice) ?
                    () => this.checkIn(device.id) :
                    () => this.openBookDialog(device.id) 
                }>
                <Plus className={classes.leftIcon} />
                {device.available ?
                  this.canCheckIn(userReservationForThisDevice) ? 
                    'Check-in' : 
                    'Book device' : 
                  device.custody === user.id ?
                    'Return device' :
                    'Device is booked'}
              </Button>
              <Button
                variant="raised"
                className={classes.button}
                onClick={
                  userReservationForThisDevice ?
                    () => this.openReservationDetails(userReservationForThisDevice) :
                    () => this.openReserveDialog(device.id)}>
                <Clock className={classes.leftIcon} />
                {userReservationForThisDevice ? 'Reservation details' : 'Reserve'}
              </Button>
            </div>
          </Paper>
        </Grid>
      );
    });
  }

  openBookDialog(deviceId) {
    this.props.showBookModal(deviceId);
  }

  openReserveDialog(deviceId) {
    this.props.showReserveModal(deviceId);
  }

  openReservationDetails(reservation) {
    const { from, to, device } = reservation;
    this.props.showReservationDetails(from, to, device);
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid container spacing={8} className={classes.root}>
        {this.renderDevices()}
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
    custody: PropTypes.number,
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
  setDevices: PropTypes.func.isRequired,
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