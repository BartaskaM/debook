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
import DeviceDetails from 'Components/Devices/DeviceDetails';
import Offices from 'Constants/Offices';

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
});

class LocationModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
    };
    this.changeLocation = this.changeLocation.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  changeLocation() {
    const {
      selectedDevice,
      changeDeviceLocation,
      hideLocationModal,
    } = this.props;

    changeDeviceLocation(selectedDevice, this.state.location);
    hideLocationModal();
    <DeviceDetails />;
  }
  render() {
    const {
      classes,
      hideLocationModal,
      showLocationDialog,
    } = this.props;
    return (
      <div>
        <Dialog
          open={showLocationDialog}
          onClose={hideLocationModal}
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
                {Offices.map(office => (
                  <MenuItem
                    key={office.id}
                    value={office.city}
                    className={classes.menuItemWidth}
                  >
                    {office.city}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={hideLocationModal} color="primary">
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
  changeDeviceLocation: PropTypes.func.isRequired,
  device: PropTypes.shape({
    id: PropTypes.number.isRequired,
    location: PropTypes.string.isRequired,
  }),
  selectedDevice: PropTypes.number,
};

const mapStateToProps = (state) => ({
  showLocationDialog: state.deviceDetails.showLocationModal,
  selectedDevice: state.deviceDetails.selectedDevice,
});
export default connect(mapStateToProps, deviceDetailsActions)(withStyles(styles)(LocationModal));