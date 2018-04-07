import React from 'react';
import {
  Input,
  Button,
} from 'material-ui';
import { InputLabel } from 'material-ui/Input';
import {
  FormControl,
  FormGroup,
} from 'material-ui/Form';
import { withStyles } from 'material-ui/styles';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as officesActions from 'ActionCreators/officesActions';

import Styles from './Styles';

class AddOfficeModal extends React.Component {
  constructor(props) {
    super(props);
    this.submitOffice = this.submitOffice.bind(this);
  }

  submitOffice()
  {
    this.props.showAddOfficeModal(false);
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Dialog
          open={this.props.showAddOfficeDialog}
          onClose={() => this.props.showAddOfficeModal(false)}
          aria-labelledby="form-dialog-title"
          className={classes.modalWidth}>
          
          <DialogTitle className={classes.title} disableTypography>Add new office</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter all needed data into fields,
            </DialogContentText>
            <form>
              <FormGroup>
                <FormControl>
                  <InputLabel className={classes.fontSize}>Country:</InputLabel>
                  <Input
                    inputProps={{
                      name: 'country',
                      maxLength: '255',
                      required: 'required',
                    }}/>
                </FormControl>
                <FormControl>
                  <InputLabel className={classes.fontSize}>City:</InputLabel>
                  <Input
                    inputProps={{
                      name: 'city',
                      maxLength: '255',
                      required: 'required',
                    }}/>
                </FormControl>
                <FormControl>
                  <InputLabel className={classes.fontSize}>Address:</InputLabel>
                  <Input
                    inputProps={{
                      name: 'address',
                      maxLength: '255',
                      required: 'required',
                    }}/>
                </FormControl>
                <FormControl>
                  <InputLabel className={classes.fontSize}>Coordinates:</InputLabel>
                  <Input
                    inputProps={{
                      name: 'coordinates',
                      maxLength: '255',
                      required: 'required',
                    }}/>
                </FormControl>
              </FormGroup>
            </form>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.submitOffice}
              color="primary"
              className={classes.button}>
              SUBMIT
            </Button>
            <Button
              onClick={() => this.props.showAddOfficeModal(false)}
              className={classes.button}>
              CANCEL
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

AddOfficeModal.propTypes = {
  setCountry: PropTypes.func.isRequired,
  setCity: PropTypes.func.isRequired,
  setAddress: PropTypes.func.isRequired,
  setLat: PropTypes.func.isRequired,
  setLng: PropTypes.func.isRequired,
  showAddOfficeModal: PropTypes.func.isRequired,
  showAddOfficeDialog: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  office: PropTypes.shape({
    id: PropTypes.number.isRequired,
    country: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  showAddOfficeDialog: state.offices.showAddOfficeModal,
  country: state.offices.country,
  city: state.offices.city,
  address: state.offices.address,
  lat: state.offices.lat,
  lng: state.offices.lng,
  user: state.auth.user,
});

export default connect(mapStateToProps, officesActions)(withStyles(Styles)(AddOfficeModal));