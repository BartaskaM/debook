import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Select from 'material-ui/Select';
import Button from 'material-ui/Button';
import { MenuItem } from 'material-ui/Menu';
import  { withStyles } from 'material-ui/styles';
import { CircularProgress, LinearProgress } from 'material-ui/Progress';
import Typography from 'material-ui/Typography';

import * as devicesActions from 'ActionCreators/devicesActions';
import * as officesActions from 'ActionCreators/officesActions';
import Styles from './Styles';
import { reservationStatus } from 'Constants/Enums';

class ReturnModal extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selectedOffice: props.user.office.id,
    };
    this.handleChange = this.handleChange.bind(this);
    this.returnDevice = this.returnDevice.bind(this);
    this.close = this.close.bind(this);
  }

  componentDidMount(){
    this.props.fetchOffices();
  }

  returnDevice(){
    const { user, devices, returnDevice, selectedDevice } = this.props;
    const deviceBooking = devices.find(dev => dev.id == selectedDevice).userBooking;
    const request = {
      id: deviceBooking.id,
      userId: user.id,
      deviceId: selectedDevice,
      from: deviceBooking.from.toISOString(),
      to: deviceBooking.to.toISOString(),
      status: reservationStatus.completed,
      officeId: this.state.selectedOffice,
    };
    returnDevice(request);
  }
  
  handleChange(e){
    this.setState({selectedOffice: e.target.value});
  }

  close(){
    const { user, hideReturnModal } = this.props;
    hideReturnModal();
    this.setState({selectedOffice: user.office.city});
  }

  render(){
    const { 
      classes, 
      showReturnDialog, 
      offices, 
      fetchOfficesLoading,
      returningDevice,
      returningDeviceErrorMessage,
    } = this.props;
    return(
      <Dialog
        open={showReturnDialog}
        onClose={this.close}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle className={classes.title} disableTypography>Return device</DialogTitle>
        <DialogContent>
          <DialogContentText className={classes.description}>
              Select office in which you return device.
          </DialogContentText>
          <span className={classes.wrapper}>
            <Select value={this.state.selectedOffice} onChange={this.handleChange}>
              {offices
                .map( (office, i) =>
                  <MenuItem key={i} value={office.id}>
                    {office.city}
                  </MenuItem>
                )}
            </Select>
            {fetchOfficesLoading &&
            <CircularProgress size={18} className={classes.buttonProgress}/>}
          </span>
          { 
            returningDeviceErrorMessage.length > 0 && 
              <Typography className={classes.errorMessage} variant="display1">
                { returningDeviceErrorMessage }
              </Typography>
          }
          {returningDevice && <LinearProgress className={classes.loader}/>}
        </DialogContent>
        <DialogActions>
          <Button onClick={this.close} color="primary">
              Close
          </Button>
          <Button onClick={this.returnDevice} color="primary">
              Return
          </Button>
        </DialogActions>
      </Dialog>);
  }
}

ReturnModal.propTypes = {
  classes: PropTypes.object.isRequired,
  hideReturnModal: PropTypes.func.isRequired,
  showReturnDialog: PropTypes.bool.isRequired,
  setDevices: PropTypes.func.isRequired,
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
  selectedDevice: PropTypes.number,
  offices: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    country: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  })).isRequired,
  fetchOffices: PropTypes.func.isRequired,
  fetchOfficesLoading: PropTypes.bool.isRequired,
  returnDevice: PropTypes.func.isRequired,
  returningDeviceErrorMessage: PropTypes.string.isRequired,
  returningDevice: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  showReturnDialog: state.devices.showReturnModal,
  selectedDevice: state.devices.selectedDevice,
  devices: state.devices.devices,
  user: state.auth.user,
  offices: state.offices.offices,
  fetchOfficesLoading: state.offices.fetchOfficesLoading,
  returningDeviceErrorMessage: state.devices.returningDeviceErrorMessage,
  returningDevice: state.devices.returningDevice,
});

export default connect(mapStateToProps, { 
  ...devicesActions, 
  ...officesActions, 
})(withStyles(Styles)(ReturnModal));