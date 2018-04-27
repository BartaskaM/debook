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
      changeDeviceLocation,
      hideLocationModal,
    } = this.props;

    changeDeviceLocation(this.state.location);
    hideLocationModal();
  }
  render() {
    const {
      classes,
      hideLocationModal,
      showLocationDialog,
      offices,
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
                {offices.map((office) => (
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