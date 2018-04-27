import React from 'react';
import { withRouter } from 'react-router-dom';
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
import Typography from 'material-ui/Typography';
import CoordinatesRegEx from 'Constants/CoordinatesRegEx';
import { LinearProgress } from 'material-ui/Progress';

import Styles from './Styles';

class AddOfficeModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      country: '',
      city: '',
      address: '',
      LAT: 0,
      LNG: 0,
      errorMessage: '',
    };
    this.submitOffice = this.submitOffice.bind(this);
    this.inputHandler = this.inputHandler.bind(this);
    this.createNewOffice = this.createNewOffice.bind(this);
    this.officeExists = this.officeExists.bind(this);
    this.validateCoordinates = this.validateCoordinates.bind(this);
  }

  componentWillUnmount() {
    this.props.showAddOfficeModal(false);
  }

  inputHandler(e) {
    this.setState({ errorMessage: '' });
    this.setState({ [e.target.name]: e.target.value });
  }

  createNewOffice() {
    const newOffice = {
      country: this.state.country,
      city: this.state.city,
      address: this.state.address,
      lat: parseFloat(this.state.LAT),
      lng: parseFloat(this.state.LNG),
    };

    this.props.createOffice(newOffice, this.props.history);
  }

  officeExists() {
    const { offices } = this.props;
    const specificOffice = (offices.find(x => x.city === this.state.city));
    if (specificOffice != null &&
      specificOffice.country === this.state.country &&
      specificOffice.address === this.state.address) {
      this.setState({ errorMessage: 'Office already exists' });
      return true;
    }
    else {
      return false;
    }
  }

  validateCoordinates() {
    const regLAT = new RegExp(CoordinatesRegEx.r_LAT);
    const regLNG = new RegExp(CoordinatesRegEx.r_LNG);
    if (regLAT.exec(this.state.LAT) && regLNG.exec(this.state.LNG)) {
      return true;
    } else {
      this.setState({ errorMessage: 'Wrong coordinates format' });
      return false;
    }
  }

  submitOffice(e) {
    e.preventDefault();
    if (this.validateCoordinates()) {
      if (!this.officeExists()) {
        this.createNewOffice();
      }
    }
  }
  render() {
    const { classes, createOfficeLoading } = this.props;
    return (
      <div>
        <Dialog
          open={this.props.showAddOfficeDialog}
          onClose={() => this.props.showAddOfficeModal(false)}
          aria-labelledby="form-dialog-title"
          className={classes.modalWidth}
          modal='true'>
          <div className={classes.dialogBox}>
            <DialogTitle className={classes.title} disableTypography>Add new office</DialogTitle>
            <DialogContent>
              <DialogContentText className={classes.description}>
                Please enter all needed data into fields,
              </DialogContentText>
              <form
                onSubmit={this.submitOffice}
                id="createNewOfficeForm">
                <FormGroup>
                  <FormControl className={classes.formField}>
                    <InputLabel className={classes.fontSize}>Country:</InputLabel>
                    <Input
                      inputProps={{
                        name: 'country',
                        maxLength: '256',
                        required: 'required',
                      }}
                      onChange={this.inputHandler} />
                  </FormControl>
                  <FormControl className={classes.formField}>
                    <InputLabel className={classes.fontSize}>City:</InputLabel>
                    <Input
                      inputProps={{
                        name: 'city',
                        maxLength: '256',
                        required: 'required',
                      }}
                      onChange={this.inputHandler} />
                  </FormControl>
                  <FormControl className={classes.formField}>
                    <InputLabel className={classes.fontSize}>Address:</InputLabel>
                    <Input
                      inputProps={{
                        name: 'address',
                        maxLength: '256',
                        required: 'required',
                      }}
                      onChange={this.inputHandler} />
                  </FormControl>
                  <FormControl className={classes.formField}>
                    <InputLabel className={classes.fontSize}>Coordinates LAT:</InputLabel>
                    <Input
                      inputProps={{
                        name: 'LAT',
                        maxLength: '12',
                        required: 'required',
                      }}
                      onChange={this.inputHandler} />
                  </FormControl>
                  <FormControl className={classes.formField}>
                    <InputLabel className={classes.fontSize}>Coordinates LNG:</InputLabel>
                    <Input
                      inputProps={{
                        name: 'LNG',
                        maxLength: '12',
                        required: 'required',
                      }}
                      onChange={this.inputHandler} />
                  </FormControl>
                </FormGroup>
              </form>
              {createOfficeLoading &&
                <LinearProgress className={classes.createOfficeLoadingBar} />
              }
            </DialogContent>
            <Typography variant='headline' className={classes.errorMessage}>
              {this.state.errorMessage}
            </Typography>
            <DialogActions>
              <Button
                onClick={() => this.props.showAddOfficeModal(false)}
                className={classes.button}>
                CANCEL
              </Button>
              <Button
                type='submit'
                form='createNewOfficeForm'
                color="primary"
                className={classes.button}>
                SUBMIT
              </Button>
            </DialogActions>
          </div>
        </Dialog>
      </div>

    );
  }
}

AddOfficeModal.propTypes = {
  createOffice: PropTypes.func.isRequired,
  showAddOfficeModal: PropTypes.func.isRequired,
  showAddOfficeDialog: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  offices: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    country: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  })).isRequired,
  createOfficeLoading: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  showAddOfficeDialog: state.offices.showAddOfficeModal,
  createOfficeLoading: state.offices.createOfficeLoading,
  offices: state.offices.offices,
  user: state.auth.user,
});

export default withRouter(connect(mapStateToProps,
  officesActions)(withStyles(Styles)(AddOfficeModal))
);