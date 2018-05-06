import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogActions,
} from 'material-ui/Dialog';
import Select from 'material-ui/Select';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

import * as deviceDetailsActions from 'ActionCreators/deviceDetailsActions';
import styles from './Style';
import * as officesActions from 'ActionCreators/officesActions';

class LocationModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: 0,
    };
    this.changeLocation = this.changeLocation.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  static getDerivedStateFromProps(nextProps, previousState){
    if(nextProps.showLocationDialog && previousState.location === 0){
      return { location: nextProps.device.location.id };
    }
    return null;
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  changeLocation() {
    const {
      updateDeviceLocation,
      hideLocationModal,
      device,
      offices,
    } = this.props;
    const office = offices.find(office => office.id === this.state.location);
    const request = {
      id: device.id,
      brandId: device.brand.id,
      modelId: device.model.id,
      image: device.image,
      identificationNum: device.identificationNum,
      serialNum: device.serialNum,
      os: device.os,
      purchased: device.purchased.toISOString(),
      vendor: device.vendor,
      taxRate: device.taxRate,
      location: {
        id: office.id,
        city: office.city,
      },
      available: device.available,
      active: true,
      userId: device.custody ? device.custody.id : null,
    };
    updateDeviceLocation(request);
    hideLocationModal();
  }

  handleClose(){
    this.props.hideLocationModal();
    this.setState({ location: 0 });
  }

  render() {
    const {
      classes,
      showLocationDialog,
      offices,
    } = this.props;
    return (
      <div>
        <Dialog
          open={showLocationDialog}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle className={classes.title} disableTypography>
            Change device location
          </DialogTitle>
          <DialogContent>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="controlled-open-select">Office</InputLabel>
              <Select
                autoWidth={true}
                value={this.state.location}
                onChange={this.handleChange}
                inputProps={{
                  name: 'location',
                }}
              >
                {offices.map((office) => (
                  <MenuItem
                    key={office.id}
                    value={office.id}
                    className={classes.menuItemWidth}
                  >
                    {office.city}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Close
            </Button>
            <Button onClick={this.changeLocation} color="primary">
              Change
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

LocationModal.propTypes = {
  showLocationDialog: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  hideLocationModal: PropTypes.func.isRequired,
  updateDeviceLocation: PropTypes.func.isRequired,
  active: PropTypes.func,
  location: PropTypes.string,
  offices: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    country: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  })).isRequired,
  device: PropTypes.shape({
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
  }),
};

const mapStateToProps = (state) => ({
  showLocationDialog: state.deviceDetails.showLocationModal,
  device: state.deviceDetails.device,
  offices: state.offices.offices,
});
export default connect(mapStateToProps, { 
  ...officesActions,
  ...deviceDetailsActions,
})(withStyles(styles)(LocationModal));