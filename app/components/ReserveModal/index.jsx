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
import Reservations from 'Constants/Reservations';
import { dateToValue, toUnixTimeStamp } from 'Utils/dateUtils';

class ReserveModal extends React.Component{
  constructor(props){
    super(props);
    this.roundTime = this.roundTime.bind(this);
    this.handleReturnChange = this.handleReturnChange.bind(this);
    this.checkForReservation = this.checkForReservation.bind(this);
    this.reserveDevice = this.reserveDevice.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleStartChange = this.handleStartChange.bind(this);
  }

  handleDateChange(e){
    const [ year, month, day ] = e.target.value.split('-').map( x => parseInt(x));
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

  roundTime(date){
    const currentDate = date;
    const minutes = currentDate.getMinutes();
    const hours = currentDate.getHours();
    const m = (parseInt((minutes + 7.5) / 15) * 15) % 60;
    const h = minutes > 52 ? (hours === 23 ? 0 : hours + 1) : hours;
    currentDate.setMinutes(m);
    currentDate.setHours(h);
    return currentDate;
  }

  handleMinuteChange(h, m, nextDate, previousDate){
    if(m === 0){
      //Handle hour increment
      if(previousDate.getMinutes() === 45){
        if(previousDate.getHours() === 23){
          nextDate.setHours(0);
        } else {
          nextDate.setHours(h + 1);
        }
      } 
    } else if(m === 45){
      //Handle hour decrement
      if(previousDate.getMinutes() === 0){
        if(previousDate.getHours() === 0){
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

  handleReturnChange(e){
    const [h,m] = e.target.value.split(':').map( x => parseInt(x));
    const previousDate = this.props.returnDate;
    const nextDate = new Date(previousDate.getTime());
    if(h === previousDate.getHours()){
      this.handleMinuteChange(h, m, nextDate, previousDate);
    } else {
      nextDate.setHours(h);
    }
    this.props.setReturnDate(nextDate);
    this.checkForErrors(nextDate, this.props.currentDate);
  }

  handleStartChange(e){
    const [h,m] = e.target.value.split(':').map( x => parseInt(x));
    const previousDate = this.props.currentDate;
    const nextDate = new Date(previousDate.getTime());
    if(h === previousDate.getHours()){
      this.handleMinuteChange(h, m, nextDate, previousDate);
    } else {
      nextDate.setHours(h);
    }
    this.props.setCurrentDate(nextDate);
    this.checkForErrors(this.props.returnDate, nextDate);
  }

  checkForErrors(startDate, currentDate){
    let err = false;
    const { setReturnDateError, showReturnDateError } = this.props;
    if(startDate - currentDate < 900000){
      err = true;
      setReturnDateError(true, 'Book for minimum 15 minutes!');
    } else if(this.checkForReservation(currentDate, startDate)){
      err = true;
      setReturnDateError(true, 'This time is reserved!');
    }else if(showReturnDateError){
      setReturnDateError(false);
    }
    return err;
  }
  
  checkForReservation(from, to){
    const extraMins = 900000;
    return Reservations.filter(res => res.device === this.props.selectedDevice 
      && (((res.to > to && res.from - extraMins < to) 
      || (res.to > from && res.from - extraMins < from)) 
      || (res.to < to && res.from > from)))
      .length !== 0 ;
  }

  reserveDevice(){
    const {
      selectedDevice,
      currentDate,
      returnDate,
      user,
      showReserveModal,
    } = this.props;

    if(!this.checkForErrors(returnDate, currentDate) && !this.checkIfLate()){
      const reservation = {
        deviceId: selectedDevice,
        from: toUnixTimeStamp(currentDate),
        to: toUnixTimeStamp(returnDate),
        userId: user.id,
      };
      console.log(reservation);
      showReserveModal(false);
      //Post booking info
    }
  }

  checkIfLate(){
    const currentDate = this.props.currentDate;
    return currentDate.getHours() == 23 
    && currentDate.getMinutes() >= 45;
  }
  render() {
    const { 
      classes, 
      currentDate, 
      returnDate, 
      showReserveDialog, 
      showReserveModal,
      showReturnDateError,
      returnDateError,
    } = this.props;
    return (
      <div>
        <Dialog
          open={showReserveDialog}
          onClose={() => showReserveModal(false)}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle className={classes.title} disableTypography>Book device</DialogTitle>
          <DialogContent>
            <DialogContentText className={classes.description}>
              To reserve this device, please select the reservation day and required time span. 
              You reserve book device if it is already reserved, or if there is less than 15 
              minutes until next reservation or midnight.
            </DialogContentText>
            <TextField
              autoFocus
              label="Reservation day"
              value={currentDate.toLocaleDateString()}
              onChange={this.handleDateChange}
              type="date"
              error={this.checkIfLate()}
              className={classes.inputField}
              InputLabelProps={{classes: {root: classes.label}}}
              FormHelperTextProps={{classes: {root: classes.helperText}}}
            />
            <TextField
              autoFocus
              label="Pick up time"
              type="time"
              error={this.checkIfLate()}
              helperText={this.checkIfLate() ? 'It\'s too late!' : ''}
              value={dateToValue(this.roundTime(currentDate))}
              onChange={this.handleStartChange}
              inputProps={{
                step: 900,
              }}
              className={classes.inputField}
              InputLabelProps={{classes: {root: classes.label}}}
              FormHelperTextProps={{classes: {root: classes.helperText}}}
            />
            <TextField
              autoFocus
              label="Drop off time"
              type="time"
              error={showReturnDateError}
              helperText={returnDateError}
              value={dateToValue(this.roundTime(returnDate))}
              onChange={this.handleReturnChange}
              onFocus={() => this.checkForErrors(returnDate, currentDate)}
              inputProps={{
                step: 900,
              }}
              className={classes.inputField}
              InputLabelProps={{classes: {root: classes.label}}}
              FormHelperTextProps={{classes: {root: classes.helperText}}}
            />
            <ReservationsTable />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => showReserveModal(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={this.reserveDevice} color="primary">
              Reserve
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
  showReturnDateError: PropTypes.bool.isRequired,
  setReturnDateError: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  selectedDevice: PropTypes.number.isRequired,
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
  showReserveModal: PropTypes.func.isRequired,
  showReserveDialog: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  showReserveDialog: state.devices.showReserveModal,
  returnDate: state.devices.returnDate,
  currentDate: state.devices.currentDate,
  returnDateError: state.devices.returnDateError,
  showReturnDateError: state.devices.showReturnDateError,
  selectedDevice: state.devices.selectedDevice,
  devices: state.devices.devices,
  user: state.auth.user,
});

export default connect(mapStateToProps, devicesActions)(withStyles(Styles)(ReserveModal));