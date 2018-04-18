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
import * as devicesActions from 'ActionCreators/devicesActions';
import * as officesActions from 'ActionCreators/officesActions';
import Styles from './Styles';

class ReturnModal extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selectedOffice: props.user.office.city,
    };
    console.log(props.user.office.city);
    this.handleChange = this.handleChange.bind(this);
    this.returnDevice = this.returnDevice.bind(this);
    this.close = this.close.bind(this);
  }

  componentDidMount(){
    this.props.fetchOffices();
  }

  returnDevice(){
    const { devices, setDevices, selectedDevice } = this.props;
    const newDevices = devices.map(device => {
      if (device.id === selectedDevice) {
        return {
          ...device,
          available: true,
          custody: null,
          location: this.state.selectedOffice,
        };
      }
      return device;
    });
    setDevices(newDevices);
    this.close();
    //Post changes
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
    const { classes, showReturnDialog, offices } = this.props;
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
          <Select value={this.state.selectedOffice} onChange={this.handleChange}>
            {offices
              .map( (office, i) => <MenuItem key={i} value={office.city}>{office.city}</MenuItem>)}
          </Select>
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
    slack: PropTypes.string.isRequired,
  }),
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
};

const mapStateToProps = state => ({
  showReturnDialog: state.devices.showReturnModal,
  selectedDevice: state.devices.selectedDevice,
  devices: state.devices.devices,
  user: state.auth.user,
  offices: state.offices.offices,
});

export default connect(mapStateToProps, { 
  ...devicesActions, 
  ...officesActions, 
})(withStyles(Styles)(ReturnModal));