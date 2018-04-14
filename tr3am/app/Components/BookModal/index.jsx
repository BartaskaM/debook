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
  dateToHours, 
  checkIfLate, 
  roundTime,
  checkForReservation,
} from 'Utils/dateUtils';
import { fifteenMinutes } from 'Constants/Values';

class BookModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.bookDevice = this.bookDevice.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleMinuteChange(h, m, nextDate) {
    const previousDate = this.props.returnDate;
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

  handleDateChange(e) {
    const [h, m] = e.target.value.split(':').map(x => parseInt(x));
    const previousDate = this.props.returnDate;
    const nextDate = new Date(previousDate.getTime());
    if (h === previousDate.getHours()) {
      this.handleMinuteChange(h, m, nextDate);
    } else {
      nextDate.setHours(h);
    }
    this.props.setReturnDate(nextDate);
    this.checkForErrors(nextDate);
  }

  checkForErrors(nextDate) {
    let err = false;
    const {
      currentDate,
      setReturnDateError,
      showReturnDateError,
      reservations,
      selectedDevice,
    } = this.props;
    if (nextDate - currentDate < fifteenMinutes) {
      err = true;
      setReturnDateError(true, 'Book for minimum 15 minutes!');
    } else if (checkForReservation(currentDate, nextDate, reservations, selectedDevice)) {
      err = true;
      setReturnDateError(true, 'This time is reserved!');
    } else if (showReturnDateError) {
      setReturnDateError(false);
    }
    return err;
  }

  bookDevice() {
    const {
      devices,
      selectedDevice,
      user,
      setDevices,
      hideBookModal,
      currentDate,
      returnDate,
    } = this.props;
    this.roundTimes();
    if (!this.checkForErrors(returnDate) && !checkIfLate(currentDate)) {
      //Update device
      const updatedDevices = devices.map(device => {
        if (device.id === selectedDevice) {
          const newDevice = {...device};
          newDevice.custody = user.id;
          newDevice.available = false;
          return newDevice;
        }
        return device;
      });
      setDevices(updatedDevices);
      hideBookModal();
      //Post booking info
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
      showReturnDateError,
      returnDateError,
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
            <TextField
              autoFocus
              label="Drop off time"
              type="time"
              error={showReturnDateError}
              helperText={returnDateError}
              value={dateToHours(returnDate)}
              onChange={this.handleDateChange}
              onBlur={this.handleBlur}
              inputProps={{
                step: 900,
              }}
              className={classes.inputField}
              InputLabelProps={{ classes: { root: classes.label } }}
              FormHelperTextProps={{ classes: { root: classes.helperText } }}
            />
            <ReservationsTable />
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
  returnDate: PropTypes.object.isRequired,
  currentDate: PropTypes.object.isRequired,
  returnDateError: PropTypes.string.isRequired,
  showReturnDateError: PropTypes.bool.isRequired,
  setReturnDateError: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  selectedDevice: PropTypes.number,
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
  hideBookModal: PropTypes.func.isRequired,
  reservations: PropTypes.arrayOf(
    PropTypes.shape({
      device: PropTypes.number.isRequired,
      user: PropTypes.number.isRequired,
      from: PropTypes.object.isRequired,
      to: PropTypes.object.isRequired,
    })
  ),
};

const mapStateToProps = (state) => ({
  showBookDialog: state.devices.showBookModal,
  returnDate: state.devices.returnDate,
  currentDate: state.devices.currentDate,
  returnDateError: state.devices.returnDateError,
  showReturnDateError: state.devices.showReturnDateError,
  selectedDevice: state.devices.selectedDevice,
  devices: state.devices.devices,
  user: state.auth.user,
  reservations: state.devices.reservations,
});

export default connect(mapStateToProps, devicesActions)(withStyles(Styles)(BookModal));