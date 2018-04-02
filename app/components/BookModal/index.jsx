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
import ReservationsTable from './ReservationsTable';
import Reservations from 'Constants/Reservations';
import dateToValue from './dateConvert';

class BookModal extends React.Component{
  constructor(props){
    super(props);
    this.roundTime = this.roundTime.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.checkForReservation = this.checkForReservation.bind(this);
    this.bookDevice = this.bookDevice.bind(this);
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
  handleMinuteChange(h, m, nextDate){
    const previousDate = this.props.returnDate;
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
  handleDateChange(e){
    const [h,m] = e.target.value.split(':').map( x => parseInt(x));
    const previousDate = this.props.returnDate;
    const nextDate = new Date(previousDate.getTime());
    if(h === previousDate.getHours()){
      this.handleMinuteChange(h, m, nextDate);
    } else {
      nextDate.setHours(h);
    }
    this.props.setReturnDate(nextDate);
    this.checkForErrors(nextDate);
  }

  checkForErrors(nextDate){
    let err = false;
    if(nextDate - this.props.currentDate < 900000){
      err = true;
      this.props.setReturnDateError(true, 'Book for minimum 15 minutes!');
    } else if(this.checkForReservation(this.props.currentDate, nextDate)){
      err = true;
      this.props.setReturnDateError(true, 'This time is reserved!');
    }else if(this.props.showReturnDateError){
      this.props.setReturnDateError(false);
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

  bookDevice(){
    if(!this.checkForErrors() && !this.checkIfLate()){
      //Update device
      const updatedDevices = [...this.props.devices];
      updatedDevices.map(device => {
        if(device.id == this.props.selectedDevice){
          device.custody = this.props.user.id;
          device.available = false;
        }
      });
      this.props.setDevices(updatedDevices);
      this.props.showBookModal(false);
      console.log('works');
      //Post booking info
    }
  }

  checkIfLate(){
    return this.props.currentDate.getHours() == 23 
    && this.props.currentDate.getMinutes() >= 45;
  }
  render() {
    const { classes, currentDate, returnDate } = this.props;
    return (
      <div>
        <Dialog
          open={this.props.showBookDialog}
          onClose={() => this.props.showBookModal(false)}
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
              autoFocus
              label="Pick up time"
              type="time"
              error={this.checkIfLate()}
              helperText={this.checkIfLate() ? 'It\'s too late!' : ''}
              disabled={true}
              value={dateToValue(currentDate)}
              className={classes.inputField}
              InputLabelProps={{classes: {root: classes.label}}}
              FormHelperTextProps={{classes: {root: classes.helperText}}}
            />
            <TextField
              autoFocus
              label="Drop off time"
              type="time"
              error={this.props.showReturnDateError}
              helperText={this.props.returnDateError}
              value={dateToValue(this.roundTime(returnDate))}
              onChange={this.handleDateChange}
              onFocus={() => this.checkForErrors(this.props.returnDate)}
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
            <Button onClick={() => this.props.showBookModal(false)} color="primary">
              Cancel
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
  showBookModal: PropTypes.func.isRequired,
  setReturnDate: PropTypes.func.isRequired,
  showBookDialog: PropTypes.bool.isRequired,
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
});

export default connect(mapStateToProps, devicesActions)(withStyles(Styles)(BookModal));