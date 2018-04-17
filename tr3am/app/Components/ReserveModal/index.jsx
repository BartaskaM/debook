import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import { withStyles } from 'material-ui/styles';
import * as devicesActions from 'ActionCreators/devicesActions';
import Styles from './Styles';
import ReservationsTable from '../ReservationsTable';
import { 
  dateToFullYear,
  dateToHours, 
  checkIfLate, 
  roundTime,
  checkForReservation,
} from 'Utils/dateUtils';
import { fifteenMinutes } from 'Constants/Values';

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

  handleDateChange(e) {
    const [year, month, day] = e.target.value.split('-').map(x => parseInt(x));
    const {
      setReturnDate,
      setCurrentDate,
      currentDate,
      returnDate,
    } = this.props;
    const endDate = new Date(returnDate);
    endDate.setFullYear(year, month - 1, day);
    setReturnDate(endDate);
    const startDate = new Date(currentDate);
    startDate.setFullYear(year, month - 1, day);
    setCurrentDate(startDate);
    this.checkForErrors(endDate, startDate);
  }

  handleMinuteChange(h, m, nextDate, previousDate) {
    if (m === 0) {
      //Handle hour increment
      if (previousDate.getMinutes() === 45) {
        if (previousDate.getHours() === 23) {
          nextDate.setHours(0);
        } else {
          nextDate.setHours(h + 1);
        }
      }
    } else if (m === 45) {
      //Handle hour decrement
      if (previousDate.getMinutes() === 0) {
        if (previousDate.getHours() === 0) {
          nextDate.setHours(23);
        } else {
          nextDate.setHours(h - 1);
        }
      }
    } else {
      nextDate.setHours(h);
    }
    nextDate.setMinutes(m);
  }

  handleReturnChange(e) {
    const { currentDate, returnDate, setReturnDate } = this.props;
    const [h, m] = e.target.value.split(':').map(x => parseInt(x));
    const previousDate = returnDate;
    const nextDate = new Date(previousDate.getTime());
    if (h === previousDate.getHours()) {
      this.handleMinuteChange(h, m, nextDate, previousDate);
    } else {
      nextDate.setHours(h);
    }
    setReturnDate(nextDate);
    this.checkForErrors(nextDate, currentDate);
  }

  handleStartChange(e) {
    const { currentDate, returnDate, setCurrentDate } = this.props;
    const [h, m] = e.target.value.split(':').map(x => parseInt(x));
    const previousDate = currentDate;
    const nextDate = new Date(previousDate.getTime());
    if (h === previousDate.getHours()) {
      this.handleMinuteChange(h, m, nextDate, previousDate);
    } else {
      nextDate.setHours(h);
    }
    setCurrentDate(nextDate);
    this.checkForErrors(returnDate, nextDate);
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
    const {
      selectedDevice,
      currentDate,
      returnDate,
      user,
      hideReserveModal,
      setReservations,
      reservations,
    } = this.props;
    this.roundTimes();
    if (!this.checkForErrors(returnDate, currentDate) && !checkIfLate(currentDate)) {
      const reservation = {
        device: selectedDevice,
        from: currentDate,
        to: returnDate,
        user: user.id,
      };
      const newReservations = [...reservations];
      newReservations.push(reservation);
      setReservations(newReservations);
      hideReserveModal();
      //Post booking info
    }
  }

  cancelReservation() {
    const {
      reservations,
      user,
      setReservations,
      selectedDevice,
      hideReservationDetails,
    } = this.props;
    const newReservations = reservations
      .filter(res => !(res.user == user.id && res.device == selectedDevice));
    setReservations(newReservations);
    hideReservationDetails();
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
            <TextField
              disabled={showDetails}
              label="Reservation day"
              value={dateToFullYear(currentDate)}
              onChange={this.handleDateChange}
              type="date"
              className={classes.inputField}
              InputLabelProps={{ classes: { root: classes.label } }}
              FormHelperTextProps={{ classes: { root: classes.helperText } }}
            />
            <TextField
              disabled={showDetails}
              autoFocus
              label="Pick up time"
              type="time"
              error={currentDateError.length > 1}
              helperText={currentDateError}
              value={dateToHours(currentDate)}
              onChange={this.handleStartChange}
              onBlur={this.handleBlur}
              inputProps={{
                step: 900,
              }}
              className={classes.inputField}
              InputLabelProps={{ classes: { root: classes.label } }}
              FormHelperTextProps={{ classes: { root: classes.helperText } }}
            />
            <TextField
              disabled={showDetails}
              label="Drop off time"
              type="time"
              error={returnDateError.length > 1}
              helperText={returnDateError}
              value={dateToHours(returnDate)}
              onChange={this.handleReturnChange}
              onBlur={this.handleBlur}
              inputProps={{
                step: 900,
              }}
              className={classes.inputField}
              InputLabelProps={{ classes: { root: classes.label } }}
              FormHelperTextProps={{ classes: { root: classes.helperText } }}
            />
            {!showDetails && <ReservationsTable />}
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
  returnDate: PropTypes.object.isRequired,
  currentDate: PropTypes.object.isRequired,
  returnDateError: PropTypes.string.isRequired,
  setReturnDateError: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  selectedDevice: PropTypes.number.isRequired,
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
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    office: PropTypes.string.isRequired,
    slack: PropTypes.string.isRequired,
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
});

export default connect(mapStateToProps, devicesActions)(withStyles(Styles)(ReserveModal));