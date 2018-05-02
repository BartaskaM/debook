import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Grid from 'material-ui/Grid';
import Styles from './Styles';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import { ListItem } from 'material-ui/List';
import { LinearProgress } from 'material-ui/Progress';
import Typography from 'material-ui/Typography';
import Add from 'material-ui-icons/Add';
import Remove from 'material-ui-icons/Remove';
import Done from 'material-ui-icons/Done';
import Clock from 'material-ui-icons/Schedule';
import Description from 'material-ui-icons/Description';

import BookModal from 'Components/BookModal';
import ReserveModal from 'Components/ReserveModal';
import * as devicesActions from 'ActionCreators/devicesActions';
import * as usersActions from 'ActionCreators/usersActions';
import Device from './Device';
import ReturnModal from 'Components/ReturnModal';
import { fifteenMinutes } from 'Constants/Values';
import { reservationStatus } from 'Constants/Enums';

class DeviceList extends React.Component {
  constructor(props) {
    super(props);
    this.renderDevices = this.renderDevices.bind(this);
    this.openBookDialog = this.openBookDialog.bind(this);
    this.openReserveDialog = this.openReserveDialog.bind(this);
    this.openReservationDetails = this.openReservationDetails.bind(this);
    this.handleBookClick = this.handleBookClick.bind(this);
    this.getBookButtonValues = this.getBookButtonValues.bind(this);
    this.state = {
      bookButtonValues: [],
    };
  }

  componentDidMount() {
    //Refresh button values every 10 s
    this.interval = setInterval(this.getBookButtonValues, 10000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  static getDerivedStateFromProps(nextProps) {
    const { devices } = nextProps;
    return { bookButtonValues: DeviceList.formBookButtonValuesArray(devices) };
  }

  static formBookButtonValuesArray(devices) {
    const bookButtonValues = [];
    devices.forEach(device => {
      if (device.available) {
        if (DeviceList.canCheckIn(device.userReservation)) {
          bookButtonValues[device.id] = 'Check-in';
        } else {
          bookButtonValues[device.id] = 'Book device';
        }
      } else {
        if (device.userBooking) {
          bookButtonValues[device.id] = 'Return device';
        } else {
          bookButtonValues[device.id] = 'Device is booked';
        }
      }
    });
    return bookButtonValues;
  }

  getBookButtonValues() {
    const { devices } = this.props;
    this.setState({
      bookButtonValues: DeviceList.formBookButtonValuesArray(devices),
    });
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
      .filter(device =>
        device.model.name.toLowerCase().includes(modelFilter.toLowerCase()));
    if (brandFilter.length > 0) {
      devicesToRender = devicesToRender.filter(device =>
        brandFilter.includes(device.brand.name));
    }
    if (officeFilter.length > 0) {
      devicesToRender = devicesToRender.filter(device =>
        officeFilter.includes(device.location.city) || device.userBooking);
    }
    if (showAvailable != showUnavailable) {
      if (showAvailable) {
        devicesToRender = devicesToRender.filter(device => device.available || device.userBooking);
      }
      if (showUnavailable) {
        devicesToRender = devicesToRender.filter(device => !device.available);
      }
    }
    return devicesToRender;
  }

  static canCheckIn(reservation) {
    if (reservation) {
      const now = new Date();
      if (reservation.from - now < fifteenMinutes) {
        return true;
      } else {
        return false;
      }
    }
  }

  handleBookClick(device) {
    const { showReturnModal, checkIn, user } = this.props;
    return device.custody ?
      showReturnModal(device.id) :
      DeviceList.canCheckIn(device.userReservation) ?
        checkIn({
          id: device.userReservation.id,
          userId: user.id,
          deviceId: device.id,
          from: device.userReservation.from,
          to: device.userReservation.to,
          status: reservationStatus.checkedIn,
        }, {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        }) :
        this.openBookDialog(device.id);
  }

  renderDevices() {
    const {
      classes,
      history,
      fetchingDevices,
      checkInLoading,
    } = this.props;
    const { bookButtonValues } = this.state;
    const filteredDevices = this.filterDevices();
    return filteredDevices.length === 0 ?
      fetchingDevices ? null : 
        <div className={classes.noItems}>
          <Typography align="center" variant="display3">No devices found</Typography>
        </div> :
      filteredDevices.map(device => {
        return (
        //Replace list with device component
          <Grid item xs={4} key={device.id}>
            <Paper className={classes.devicePaper}>
              <ListItem
                className={classes.deviceItem}
                button
                dense
                onClick={() => history.push(`/devices/${device.id.toString()}`)}>
                <div className={classes.itemContainer}>
                  <Device key={device.id} device={device} />
                  { checkInLoading === device.id && <LinearProgress/> }
                </div>
              </ListItem>
              <div className={classes.buttonsContainer}>
                <Button
                  variant='raised'
                  disabled={
                    device.available ? false : device.userBooking ? false : true
                  }
                  color={device.available ? 'primary' : 'secondary'}
                  className={classes.buttonLeft}
                  onClick={() => this.handleBookClick(device)}>
                  {
                    bookButtonValues[device.id] === 'Return device' ?
                      <Remove className={classes.leftIcon} /> :
                      bookButtonValues[device.id] === 'Check-in' ?
                        <Done className={classes.leftIcon} /> :
                        <Add className={classes.leftIcon} />
                  }
                  {bookButtonValues[device.id]}
                </Button>
                <Button
                  variant="raised"
                  className={classes.buttonRight}
                  onClick={
                    device.userReservation ?
                      () => this.openReservationDetails(device.userReservation, device.id) :
                      () => this.openReserveDialog(device.id)}>
                  {
                    device.userReservation ?
                      <Description className={classes.leftIcon}/> :
                      <Clock className={classes.leftIcon}/>
                  }
                  {device.userReservation ? 'Reservation details' : 'Reserve'}
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

  openReservationDetails(reservation, deviceId) {
    const { from, to } = reservation;
    this.props.showReservationDetails(from, to, deviceId);
  }

  render() {
    const { classes, fetchingDevices } = this.props;
    return (
      <Grid container spacing={8} className={classes.root}>
        { fetchingDevices && <Grid item xs={12}><LinearProgress/></Grid> }
        { this.renderDevices() }
        <BookModal />
        <ReserveModal />
        <ReturnModal />
      </Grid>
    );
  }
}

DeviceList.propTypes = {
  devices: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    available: PropTypes.bool.isRequired,
    brand: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    model: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    identificationNum: PropTypes.number.isRequired,
    os: PropTypes.string.isRequired,
    location: PropTypes.shape({
      id: PropTypes.number.isRequired,
      city: PropTypes.string.isRequired,
    }).isRequired,
    custody: PropTypes.shape({
      id: PropTypes.number.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }),
    userBooking: PropTypes.shape({
      id: PropTypes.number.isRequired,
      from: PropTypes.instanceOf(Date).isRequired,
      to: PropTypes.instanceOf(Date).isRequired,
      status: PropTypes.number.isRequired,
    }),
    userReservation: PropTypes.shape({
      id: PropTypes.number.isRequired,
      from: PropTypes.instanceOf(Date).isRequired,
      to: PropTypes.instanceOf(Date).isRequired,
      status: PropTypes.number.isRequired,
    }),
  })).isRequired,
  classes: PropTypes.object.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    office: PropTypes.shape({
      id: PropTypes.number.isRequired,
      country: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
      address: PropTypes.string.isRequired,
    }).isRequired,
    slack: PropTypes.string,
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
  showReservationDetails: PropTypes.func.isRequired,
  showReturnModal: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  fetchingDevices: PropTypes.bool.isRequired,
  checkIn: PropTypes.func.isRequired,
  checkInLoading: PropTypes.number.isRequired,
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
    fetchingDevices: state.devices.fetchingDevices,
    checkInLoading: state.devices.checkInLoading,
  };
};
export default withRouter(connect(mapStateToProps, {
  ...devicesActions,
  ...usersActions,
})(withStyles(Styles)(DeviceList)));
