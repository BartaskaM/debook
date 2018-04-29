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
import {
  FormControl,
  FormHelperText,
} from 'material-ui/Form';
import { InputLabel } from 'material-ui/Input';
import { LinearProgress } from 'material-ui/Progress';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import TimeInput from 'material-ui-time-picker';
import * as devicesActions from 'ActionCreators/devicesActions';
import Styles from './Styles';
import ReservationsTable from '../ReservationsTable';
import { 
  dateToHours, 
  checkIfLate, 
  roundTime,
  checkForReservation,
} from 'Utils/dateUtils';
import { fifteenMinutes } from 'Constants/Values';
import { reservationStatus } from 'Constants/Enums';

class BookModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.bookDevice = this.bookDevice.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleDateChange(time){
    const newDate = roundTime(time);
    this.props.setReturnDate(newDate);
    this.checkForErrors(newDate);
  }

  checkForErrors(nextDate) {
    let err = false;
    const {
      currentDate,
      setReturnDateError,
      returnDateError,
      selectedDeviceReservations,
      selectedDevice,
    } = this.props;
    if (nextDate - currentDate < fifteenMinutes) {
      err = true;
      setReturnDateError('Book for minimum 15 minutes!');
    } else if (checkForReservation(currentDate, nextDate,
      selectedDeviceReservations, selectedDevice)) {
      err = true;
      setReturnDateError('This time is reserved!');
    } else if (returnDateError.length > 1) {
      setReturnDateError(' ');
    }
    return err;
  }

  bookDevice() {
    const {
      selectedDevice,
      user,
      currentDate,
      returnDate,
    } = this.props;
    this.roundTimes();
    if (!this.checkForErrors(returnDate) && !checkIfLate(currentDate)) {
      const request = {
        deviceId: selectedDevice,
        userId: user.id,
        from: new Date(),
        to: returnDate,
        status: reservationStatus.checkedIn,
      };
      this.props.bookDevice(request, user);
    }
  }

  roundTimes() {
    const { 
      setReturnDate,  
      returnDate, 
    } = this.props;
    setReturnDate(roundTime(returnDate));
  }

  handleBlur() {
    const { returnDate } = this.props;
    this.roundTimes();
    this.checkForErrors(returnDate);
  }
  
  render() {
    const {
      classes,
      currentDate,
      returnDate,
      showBookDialog,
      hideBookModal,
      returnDateError,
      booking,
      bookingErrorMessage,
    } = this.props;
    return (
      <div>
        <Dialog
          open={showBookDialog}
          onClose={hideBookModal}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle className={classes.title} disableTypography>Book device</DialogTitle>
          <DialogContent>
            <DialogContentText className={classes.description}>
              To book this device, please select return time.
              You cannot book device if it is reserved, or if there is less than 15 minutes until
              next reservation or midnight.
            </DialogContentText>
            <TextField
              label="Pick up time"
              type="time"
              error={checkIfLate(currentDate)}
              helperText={checkIfLate(currentDate) ? 'It\'s too late!' : ' '}
              disabled={true}
              value={dateToHours(currentDate)}
              className={classes.inputField}
              InputLabelProps={{ classes: { root: classes.label } }}
              FormHelperTextProps={{ classes: { root: classes.helperText } }}
            />
            <FormControl error={returnDateError.length > 1} className={classes.inputField}>
              <InputLabel className={classes.label}>Drop off time</InputLabel>
              <TimeInput mode="24h" value={returnDate} 
                onChange={time => this.handleDateChange(time)}
                onBlur={this.handleBlur}/>
              <FormHelperText className={classes.helperText}>{returnDateError}</FormHelperText>
            </FormControl>
            <ReservationsTable />
            { booking && <LinearProgress/> }
            { 
              bookingErrorMessage && 
              <Typography className={classes.errorMessage} variant="display1">
                { bookingErrorMessage }
              </Typography>
            }
          </DialogContent>
          <DialogActions>
            <Button onClick={hideBookModal} color="primary">
              Close
            </Button>
            <Button onClick={this.bookDevice} color="primary">
              Book
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

BookModal.propTypes = {
  setReturnDate: PropTypes.func.isRequired,
  showBookDialog: PropTypes.bool.isRequired,
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
  hideBookModal: PropTypes.func.isRequired,
  selectedDeviceReservations: PropTypes.arrayOf(
    PropTypes.shape({
      deviceId: PropTypes.number.isRequired,
      user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
      }).isRequired,
      from: PropTypes.object.isRequired,
      to: PropTypes.object.isRequired,
      status: PropTypes.number.isRequired,
    })
  ),
  bookDevice: PropTypes.func.isRequired,
  booking: PropTypes.bool.isRequired,
  bookingErrorMessage: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  showBookDialog: state.devices.showBookModal,
  returnDate: state.devices.returnDate,
  currentDate: state.devices.currentDate,
  returnDateError: state.devices.returnDateError,
  selectedDevice: state.devices.selectedDevice,
  devices: state.devices.devices,
  user: state.auth.user,
  booking: state.devices.booking,
  bookingErrorMessage: state.devices.bookingErrorMessage,
  selectedDeviceReservations: state.devices.selectedDeviceReservations,
});

export default connect(mapStateToProps, devicesActions)(withStyles(Styles)(BookModal));