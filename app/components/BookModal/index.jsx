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

class BookModal extends React.Component{
  constructor(props){
    super(props);
    this.roundTime = this.roundTime.bind(this);
    this.dateToValue = this.dateToValue.bind(this);
    this.open = this.open.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
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
  }

  handleDateChange(e){
    console.log(e.target);
    const [h,m] = e.target.value.split(':').map( x => parseInt(x));
    const previousDate = this.props.returnDate;
    const nextDate = new Date(previousDate.getTime());
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
    nextDate.setMinutes(m);
    this.props.setReturnDate(nextDate);
    if(nextDate - this.props.currentDate < 900000){
      this.props.setReturnDateError(true, 'Book for minimum 15 minutes!');
    } else if(this.props.showReturnDateError){
      this.props.setReturnDateError(false);
    }
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
};

const mapStateToProps = (state) => ({
  showBookDialog: state.devices.showBookModal,
  returnDate: state.devices.returnDate,
  currentDate: state.devices.currentDate,
  returnDateError: state.devices.returnDateError,
  showReturnDateError: state.devices.showReturnDateError,
});

export default connect(mapStateToProps, devicesActions)(withStyles(Styles)(BookModal));