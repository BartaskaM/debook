import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import {
  FormControl,
  FormHelperText,
} from 'material-ui/Form';
import { InputLabel } from 'material-ui/Input';
import TimeInput from 'material-ui-time-picker';
import { DatePicker } from 'material-ui-pickers';
import { withStyles } from 'material-ui/styles';
import { LinearProgress } from 'material-ui/Progress';
import Typography from 'material-ui/Typography';

import * as devicesActions from 'ActionCreators/devicesActions';
import Styles from './Styles';
import ReservationsTable from '../ReservationsTable';
import { 
  checkIfLate, 
  roundTime,
  checkForReservation,
} from 'Utils/dateUtils';
import { fifteenMinutes } from 'Constants/Values';
import { reservationStatus } from 'Constants/Enums';

class ReserveModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleReturnChange = this.handleReturnChange.bind(this);
    this.reserveDevice = this.reserveDevice.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleStartChange = this.handleStartChange.bind(this);
    this.cancelReservation = this.cancelReservation.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleDateChange(date) {
    const {
      setReturnDate,
      setCurrentDate,
      currentDate,
      returnDate,
    } = this.props;
    const endDate = new Date(returnDate);
    endDate.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
    setReturnDate(endDate);
    const startDate = new Date(currentDate);
    startDate.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
    setCurrentDate(startDate);
    this.checkForErrors(endDate, startDate);
  }

  handleReturnChange(time) {
    const { currentDate, returnDate, setReturnDate } = this.props;
    let newDate = new Date(returnDate);
    newDate.setHours(time.getHours());
    newDate.setMinutes(time.getMinutes());
    newDate = roundTime(newDate);
    setReturnDate(newDate);
    this.checkForErrors(newDate, currentDate);
  }

  handleStartChange(time) {
    const { currentDate, returnDate, setCurrentDate } = this.props;
    let newDate = new Date(currentDate);
    newDate.setHours(time.getHours());
    newDate.setMinutes(time.getMinutes());
    newDate = roundTime(newDate);
    setCurrentDate(newDate);
    this.checkForErrors(returnDate, newDate);
  }

  checkIfFuture(date){
    const now = new Date();
    return date >= now ? true : false;
  }

  checkForErrors(returnDate, currentDate) {
    let err = false;
    const { 
      setReturnDateError,  
      reservations, 
      selectedDevice, 
      setCurrentDateError,
      returnDateError,
      currentDateError,
    } = this.props;
    if (returnDate - currentDate < fifteenMinutes) {
      err = true;
      setReturnDateError('Reserve for minimum 15 minutes!');
    } else if (checkForReservation(currentDate, returnDate, reservations, selectedDevice)) {
      err = true;
      setReturnDateError('This time is reserved!');
    } else if (returnDateError.length > 1) {
      setReturnDateError(' ');
    }

    if(checkIfLate(currentDate)){
      err = true;
      setCurrentDateError('It\'s too late!');
    } else if (!this.checkIfFuture(currentDate)) {
      err = true;
      setCurrentDateError('Reserve for future dates!');
    } else if (currentDateError.length > 1) {
      setCurrentDateError(' ');
    }
    return err;
  }

  reserveDevice() {
    this.roundTimes();
    const {
      selectedDevice,
      currentDate,
      returnDate,
      user,
      reserveDevice,
    } = this.props;
    if (!this.checkForErrors(returnDate, currentDate) && !checkIfLate(currentDate)) {
      const reservation = {
        deviceId: selectedDevice,
        from: currentDate,
        to: returnDate,
        userId: user.id,
        status: reservationStatus.pending,
      };
      reserveDevice(reservation, user);
    }
  }

  cancelReservation() {
    const {
      user,
      devices,
      selectedDevice,
      cancelReservation,
    } = this.props;
    const deviceBooking = devices.find(dev => dev.id == selectedDevice).userReservation;
    const request = {
      id: deviceBooking.id,
      userId: user.id,
      deviceId: selectedDevice,
      from: deviceBooking.from.toISOString(),
      to: deviceBooking.to.toISOString(),
      status: reservationStatus.canceled,
    };
    cancelReservation(request);

  }

  roundTimes() {
    const { 
      setCurrentDate,
      setReturnDate, 
      currentDate, 
      returnDate, 
    } = this.props;
    setCurrentDate(roundTime(currentDate));
    setReturnDate(roundTime(returnDate));
  }

  handleBlur() {
    const { currentDate, returnDate } = this.props;
    this.roundTimes();
    this.checkForErrors(returnDate, currentDate);
  }

  render() {
    const {
      classes,
      currentDate,
      returnDate,
      showReserveDialog,
      hideReserveModal,
      returnDateError,
      hideReservationDetails,
      showDetails,
      currentDateError,
      reserving,
      reservingErrorMessage,
      cancelingReservation,
      cancelingReservationErrorMessage,
    } = this.props;
    return (
      <div>
        <Dialog
          open={showReserveDialog}
          onClose={
            showDetails ?
              hideReservationDetails :
              hideReserveModal}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle className={classes.title} disableTypography>
            {showDetails ? 'Reservation details' : 'Reserve device'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText className={classes.description}>
              {showDetails ?
                'This is your reservation details. You can cancel your reservation any time.' :
                `To reserve this device, please select the reservation day and required time 
                span. You cannot reserve device if it is already reserved, or if there is 
                less than 15 minutes until next reservation or midnight.`
              }
            </DialogContentText>
            <DatePicker
              disabled={showDetails}
              label="Reservation day"
              showTodayButton
              disablePast
              format="DD/MM/YYYY"
              value={currentDate}
              onChange={this.handleDateChange}
              className={classes.inputField}
              InputLabelProps={{ classes: { root: classes.label } }}
            />
            <FormControl
              error={currentDateError.length > 1}
              disabled={showDetails}
              className={classes.inputField}>
              <InputLabel className={classes.label}>Pick up time</InputLabel>
              <TimeInput mode="24h" value={currentDate} 
                onChange={time => this.handleStartChange(time)}
                onBlur={this.handleBlur}/>
              <FormHelperText className={classes.helperText}>{currentDateError}</FormHelperText>
            </FormControl>
            <FormControl
              error={returnDateError.length > 1}
              disabled={showDetails}
              className={classes.inputField}>
              <InputLabel className={classes.label}>Drop off time</InputLabel>
              <TimeInput mode="24h" value={returnDate} 
                onChange={time => this.handleReturnChange(time)}
                onBlur={this.handleBlur}/>
              <FormHelperText className={classes.helperText}>{returnDateError}</FormHelperText>
            </FormControl>
            { !showDetails && <ReservationsTable /> }
            { (reserving || cancelingReservation) && <LinearProgress/> }
            { 
              reservingErrorMessage.length > 0 && 
              <Typography className={classes.errorMessage} variant="display1">
                { reservingErrorMessage }
              </Typography>
            }
            { 
              cancelingReservationErrorMessage.length > 0 && 
              <Typography className={classes.errorMessage} variant="display1">
                { cancelingReservationErrorMessage }
              </Typography>
            }
          </DialogContent>
          <DialogActions>
            <Button
              onClick={
                showDetails ?
                  hideReservationDetails :
                  hideReserveModal}
              color="primary">
              Close
            </Button>
            <Button
              onClick={
                showDetails ?
                  this.cancelReservation :
                  this.reserveDevice
              }
              color="primary">
              {showDetails ? 'Cancel reservation' : 'Reserve'}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

ReserveModal.propTypes = {
  setReturnDate: PropTypes.func.isRequired,
  returnDate: PropTypes.instanceOf(Date).isRequired,
  currentDate: PropTypes.instanceOf(Date).isRequired,
  returnDateError: PropTypes.string.isRequired,
  setReturnDateError: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  selectedDevice: PropTypes.number,
  devices: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    available: PropTypes.bool.isRequired,
    brand: PropTypes.shape({
      id: PropTypes.number.isRequired,
      brandName: PropTypes.string.isRequired,
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
  setDevices: PropTypes.func.isRequired,
  setCurrentDate: PropTypes.func.isRequired,
  hideReserveModal: PropTypes.func.isRequired,
  showReserveDialog: PropTypes.bool.isRequired,
  reservations: PropTypes.arrayOf(
    PropTypes.shape({
      device: PropTypes.number.isRequired,
      user: PropTypes.number.isRequired,
      from: PropTypes.object.isRequired,
      to: PropTypes.object.isRequired,
    })
  ),
  setReservations: PropTypes.func.isRequired,
  showDetails: PropTypes.bool.isRequired,
  hideReservationDetails: PropTypes.func.isRequired,
  setCurrentDateError: PropTypes.func.isRequired,
  currentDateError: PropTypes.string.isRequired,
  reserveDevice: PropTypes.func.isRequired,
  reserving: PropTypes.bool.isRequired,
  reservingErrorMessage: PropTypes.string.isRequired,
  cancelReservation: PropTypes.func.isRequired,
  cancelingReservation: PropTypes.bool.isRequired,
  cancelingReservationErrorMessage: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  showReserveDialog: state.devices.showReserveModal,
  returnDate: state.devices.returnDate,
  currentDate: state.devices.currentDate,
  returnDateError: state.devices.returnDateError,
  selectedDevice: state.devices.selectedDevice,
  devices: state.devices.devices,
  user: state.auth.user,
  reservations: state.devices.reservations,
  showDetails: state.devices.showReservationDetails,
  currentDateError: state.devices.currentDateError,
  reserving: state.devices.reserving,
  reservingErrorMessage: state.devices.reservingErrorMessage,
  cancelingReservation: state.devices.cancelingReservation,
  cancelingReservationErrorMessage: state.devices.cancelingReservationErrorMessage,
});

export default connect(mapStateToProps, devicesActions)(withStyles(Styles)(ReserveModal));