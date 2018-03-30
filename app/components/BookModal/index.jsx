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
import List from 'material-ui/List';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import * as devicesActions from 'ActionCreators/devicesActions';
import Styles from './Styles';
import Row from './Row';
import Reservations from 'Constants/Reservations';

class BookModal extends React.Component{
  constructor(props){
    super(props);
    this.roundTime = this.roundTime.bind(this);
    this.dateToValue = this.dateToValue.bind(this);
    this.open = this.open.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.checkForReservation = this.checkForReservation.bind(this);
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

  dateToValue(date){
    return date.toLocaleTimeString().split(':').slice(0,2).join(':');
  }

  open(){
    this.props.showBookModal(true);
    this.props.setCurrentDate();
    const currentDate = new Date(Date.now());
    currentDate.setHours(currentDate.getHours() + 1);
    this.props.setReturnDate(currentDate);
    this.props.setSelectedDevice(1);
  }

  handleDateChange(e){
    console.log(e.target.value);
    const [h,m] = e.target.value.split(':').map( x => parseInt(x));
    const previousDate = this.props.returnDate;
    const nextDate = new Date(previousDate.getTime());
    if(h === previousDate.getHours()){
      if(m === 0){
        if(previousDate.getMinutes() === 45){
          if(previousDate.getHours() === 23){
            nextDate.setHours(0);
          } else {
            nextDate.setHours(h + 1);
          }
        } 
      } else if(m === 45){
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
    } else {
      nextDate.setHours(h);
    }
    nextDate.setMinutes(m);
    this.props.setReturnDate(nextDate);
    if(nextDate - this.props.currentDate < 900000){
      this.props.setReturnDateError(true, 'Book for minimum 15 minutes!');
    } else if(this.checkForReservation(this.props.currentDate,nextDate)){
      this.props.setReturnDateError(true, 'This time is reserved!');
    }else if(this.props.showReturnDateError){
      this.props.setReturnDateError(false);
    }
  }

  checkForReservation(from, to){
    return Reservations.filter(res => res.device === this.props.selectedDevice 
      && (((res.to > to && res.from < to) || (res.to > from && res.from < from)) 
      || (res.to < to && res.from > from)))
      .length !== 0 ;
  }
  renderRows(){
    return Reservations.filter(res => res.device === this.props.selectedDevice)
      .map((res, i) => 
        <Row key={i} first={this.dateToValue(res.from) + ' - ' + this.dateToValue(res.to)} 
          second={'User with id' + res.user} 
          styleClass={this.props.classes.row}
          addDivider={true}/>
      );
  }
  render() {
    const currentDate = this.props.currentDate;
    const returnDate = this.props.returnDate;
    const { classes } = this.props;
    return (
      <div>
        <Button onClick={this.open}>Open form dialog</Button>
        <Dialog
          open={this.props.showBookDialog}
          onClose={() => this.props.showBookModal(false)}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle>Book device</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To book this device, please select return time. 
              You cannot book device if it is reserved, or if there is less than 15 minutes until 
              next reservation or midnight.
            </DialogContentText>
            <TextField
              autoFocus
              label="Pick up time"
              type="time"
              error={currentDate.getHours() == 23 && currentDate.getMinutes() >= 45}
              helperText={currentDate.getHours() == 23 ? 
                (currentDate.getMinutes() >= 45 ? 'It\'s too late!' : '') : ''}
              disabled={true}
              value={this.dateToValue(currentDate)}
              className={classes.inputField}
            />
            <TextField
              autoFocus
              label="Drop off time"
              type="time"
              error={this.props.showReturnDateError}
              helperText={this.props.returnDateError}
              value={this.dateToValue(this.roundTime(returnDate))}
              onChange={this.handleDateChange}
              inputProps={{
                step: 900, // 5 min
              }}
              className={classes.inputField}
            />
            <Grid container spacing={16}>
              <Grid item xs={12}>
                <List className={classes.officeList}>
                  <Row first="TIME" second="RESERVED BY" styleClass={classes.topRow}/>
                  {this.renderRows()}
                </List>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.props.showBookModal(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
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
  setCurrentDate: PropTypes.func.isRequired,
  setReturnDate: PropTypes.func.isRequired,
  showBookDialog: PropTypes.bool.isRequired,
  returnDate: PropTypes.object.isRequired,
  currentDate: PropTypes.object.isRequired,
  returnDateError: PropTypes.string.isRequired,
  showReturnDateError: PropTypes.bool.isRequired,
  setReturnDateError: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  selectedDevice: PropTypes.number.isRequired,
  setSelectedDevice: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  showBookDialog: state.devices.showBookModal,
  returnDate: state.devices.returnDate,
  currentDate: state.devices.currentDate,
  returnDateError: state.devices.returnDateError,
  showReturnDateError: state.devices.showReturnDateError,
  selectedDevice: state.devices.selectedDevice,
});

export default connect(mapStateToProps, devicesActions)(withStyles(Styles)(BookModal));