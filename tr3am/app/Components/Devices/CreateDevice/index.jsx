import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Input from 'material-ui/Input';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Select from 'material-ui/Select';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/grid';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import {
  FormControl,
  FormGroup,
  FormHelperText,
} from 'material-ui/Form';
import { withStyles } from 'material-ui/styles';
import { DatePicker } from 'material-ui-pickers';
import { LinearProgress } from 'material-ui/Progress';

import Styles from './Styles';
import * as officesActions from 'ActionCreators/officesActions';
import * as devicesActions from 'ActionCreators/devicesActions';
import * as deviceDetailsActions from 'ActionCreators/deviceDetailsActions';
import * as brandsActions from 'ActionCreators/brandsActions';
import { r_url } from 'Utils/regExUtils';

class CreateDevice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brandId: '',
      modelId: '',
      modelName: '',
      newModel: false,
      purchaseDate: new Date(),
      serialNumber: '',
      os: '',
      identificationNum: '',
      officeId: '',
      vendor: '',
      taxRate: 0.00,
      imageURL: '',
      modelFieldDisabled: true,
      models: [],
      locationErrorMessage: '',
      modelErrorMessage: '',
      brandErrorMessage: '',
      imageURLErrorMessage: '',
      serialNumberErrorMessage: '',
      identificationNumberErrorMessage: '',
      osErrorMessage: '',
      vendorErrorMessage: '',
      taxRateErrorMessage: '',
    };
    this.inputHandler = this.inputHandler.bind(this);
    this.inputHandlerForModel = this.inputHandlerForModel.bind(this);
    this.inputHandlerForBrand = this.inputHandlerForBrand.bind(this);
    this.submitDeviceForm = this.submitDeviceForm.bind(this);
    this.areAllSelected = this.areAllSelected.bind(this);
    this.loadModels = this.loadModels.bind(this);
    this.createNewDevice = this.createNewDevice.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.validateImage = this.validateImage.bind(this);
    this.validateIdentificationNumber = this.validateIdentificationNumber.bind(this);
    this.validateTaxRateNumber = this.validateTaxRateNumber.bind(this);
    this.resetErrorMessages = this.resetErrorMessages.bind(this);
  }

  componentDidMount() {
    const { match, history, fetchOffices, fetchBrands, fetchDeviceWithId } = this.props;
    const id = parseInt(match.params.id);

    if (id) {
      fetchDeviceWithId(id, history);
    }
    fetchOffices();
    fetchBrands();
  }

  static getDerivedStateFromProps(nextProps) {
    const { device, fetchDeviceLoading, match } = nextProps;
    if (device && !fetchDeviceLoading && match.params.id) {
      return {
        brandId: device.brand.id,
        identificationNum: device.identificationNum,
        imageURL: device.image,
        modelId: device.model.id,
        officeId: device.location.id,
        purchaseDate: device.purchased,
        serialNumber: device.serialNum,
        os: device.os,
        taxRate: device.taxRate,
        vendor: device.vendor,
        newModel: false,
        modelName: device.model.name,
        modelFieldDisabled: false,
        models: nextProps.brands.find(brand => brand.id === device.brand.id).models,
      };
    }

    return null;
  }

  handleDateChange(date) {
    this.setState({ purchaseDate: date });
  }

  submitDeviceForm(e) {
    e.preventDefault();
    if (this.areAllSelected() && this.validateImage
      && this.validateIdentificationNumber && this.validateTaxRateNumber) {
      this.props.match.params.id ?
        this.updateDevice() :
        this.createNewDevice();
    }
  }

  updateDevice() {
    // TODO: Implement
  }

  createNewDevice() {
    const newDevice = {
      brandId: this.state.brandId,
      identificationNum: this.state.identificationNum,
      image: this.state.imageURL,
      modelId: this.state.modelId,
      officeId: this.state.officeId,
      purchased: this.state.purchaseDate,
      serialNum: this.state.serialNumber,
      os: this.state.os,
      taxrate: this.state.taxRate,
      vendor: this.state.vendor,
      newModel: this.state.newModel,
      modelName: this.state.modelName,
    };

    this.props.createDevice(newDevice, this.props.history);
  }

  inputHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  inputHandlerForBrand(e) {
    this.setState({
      brandId: e.target.value,
      modelFieldDisabled: false,
    });
    this.loadModels(e.target.value);
  }

  loadModels(id) {
    this.setState({
      models: this.props.brands.find(brand => brand.id === id).models,
    });
  }

  inputHandlerForModel(e) {
    this.setState({
      modelId: e.target.value,
      newModel: e.target.value === -1 ? true : false,
    });
  }

  resetErrorMessages() {
    this.setState({
      locationErrorMessage: '',
      modelErrorMessage: '',
      brandErrorMessage: '',
      imageURLErrorMessage: '',
      serialNumberErrorMessage: '',
      identificationNumberErrorMessage: '',
      osErrorMessage: '',
      vendorErrorMessage: '',
      taxRateErrorMessage: '',
    });
  }

  areAllSelected() {
    let allSelected = true;
    this.resetErrorMessages();
    if (this.state.brandId === '') {
      this.setState({ brandErrorMessage: 'Select brand' });
      allSelected = false;
    }
    if (this.state.modelId === '') {
      this.setState({ modelErrorMessage: 'Select model' });
      allSelected = false;
    }
    if (this.state.officeId === '') {
      this.setState({ locationErrorMessage: 'Select location' });
      allSelected = false;
    }
    return allSelected;
  }

  validateImage() {
    const regImage = new RegExp(r_url);
    if (regImage.exec(this.state.imageURL)) {
      this.setState({ imageURLErrorMessage: '' });
      return true;
    } else {
      this.setState({
        imageURLErrorMessage: 'Wrong image URL. Make sure you entered correct URL.',
      });
      return false;
    }
  }

  validateIdentificationNumber() {
    if (this.state.identificationNum > 0) {
      this.setState({
        identificationNumberErrorMessage: '',
      });
      return true;
    } else {
      this.setState({
        identificationNumberErrorMessage: 'Identification number must be greater than 0',
      });
      return false;
    }
  }

  validateTaxRateNumber() {
    if (this.state.taxRate >= 0 && this.state.taxRate <= 100) {
      this.setState({ taxRateErrorMessage: '' });
      return true;
    } else {
      this.setState({
        taxRateErrorMessage: 'Tax rate must be number between 0 and 100',
      });
      return false;
    }
  }

  render() {
    const {
      classes,
      offices,
      brands,
      history,
      fetchDeviceLoading,
      match,
    } = this.props;
    const {
      brandId,
      modelId,
      serialNumber,
      os,
      identificationNum,
      officeId,
      vendor,
      taxRate,
      imageURL,
      modelName,
      models,
      purchaseDate,
      brandErrorMessage,
      modelErrorMessage,
      locationErrorMessage,
      imageURLErrorMessage,
      identificationNumberErrorMessage,
      taxRateErrorMessage,
    } = this.state;
    const deviceId = parseInt(match.params.id);

    const newModelForm = this.state.newModel ?
      <div>
        <InputLabel className={classes.fontSize}>Other model</InputLabel>
        <Input
          value={modelName}
          onChange={this.inputHandler}
          error={brandErrorMessage.length > 0}
          inputProps={{
            name: 'modelName',
            required: 'required',
          }}
          className={classes.customField}
        />
      </div>
      : null;

    return (
      <div className={classes.root}>
        <Grid container spacing={16} justify='center'>
          <Grid item xs={6}>
            <Paper className={classes.createDevicePaper}>
              {fetchDeviceLoading && deviceId ?
                <LinearProgress />
                : (
                  <form method='POST' onSubmit={this.submitDeviceForm}>
                    <FormGroup>
                      <Typography variant='headline'>
                        {deviceId ?
                          'Please update the device details in the form below:' :
                          'Please fill in you details for new device in the form below:'
                        }
                      </Typography>
                      <FormControl className={classes.newDeviceFormField}>
                        <InputLabel className={classes.fontSize}>Brand</InputLabel>
                        <div className={classes.wrapper}>
                          <Select
                            value={brandId}
                            autoWidth={true}
                            error={brandErrorMessage.length > 0}
                            inputProps={{
                              name: 'brandId',
                              required: 'required',
                            }}
                            onChange={this.inputHandlerForBrand}
                            className={classes.select}
                          >
                            {brands.map((brand) => (
                              <MenuItem
                                key={brand.id}
                                value={brand.id}
                                className={classes.menuItemWidth}
                              >
                                {brand.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </div>
                        <FormHelperText className={classes.errorMessage}>
                          {this.state.brandErrorMessage}
                        </FormHelperText>
                      </FormControl>

                      <FormControl className={classes.newDeviceFormField}>
                        <InputLabel className={classes.fontSize}>Model</InputLabel>
                        <div className={classes.wrapper}>
                          <Select
                            disabled={this.state.modelFieldDisabled}
                            value={modelId}
                            autoWidth={true}
                            error={modelErrorMessage.length > 0}
                            inputProps={{
                              name: 'modelId',
                              required: 'required',
                            }}
                            onChange={this.inputHandlerForModel}
                            className={classes.select}
                          >
                            <MenuItem
                              value={-1}
                              className={classes.menuItemWidth}>
                              Other model
                            </MenuItem>
                            {models.map((model) => (
                              <MenuItem
                                key={model.id}
                                value={model.id}
                                className={classes.menuItemWidth}
                              >
                                {model.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </div>
                      </FormControl>
                      <FormControl>
                        {newModelForm}
                        <FormHelperText className={classes.errorMessage}>
                          {modelErrorMessage}
                        </FormHelperText>
                      </FormControl>
                      <FormControl className={classes.newDeviceFormField}>
                        <InputLabel className={classes.fontSize}>Image URL</InputLabel>
                        <Input
                          value={imageURL}
                          onChange={this.inputHandler}
                          onBlur={this.validateImage}
                          error={imageURLErrorMessage.length > 0}
                          inputProps={{
                            name: 'imageURL',
                            maxLength: '255',
                            required: 'required',
                          }}
                          className={classes.fontSize}
                        />
                        <FormHelperText className={classes.errorMessage}>
                          {imageURLErrorMessage}
                        </FormHelperText>
                      </FormControl>
                      <FormControl className={classes.newDeviceFormField}>
                        <InputLabel className={classes.fontSize}>Serial Number</InputLabel>
                        <Input
                          value={serialNumber}
                          onChange={this.inputHandler}
                          inputProps={{
                            name: 'serialNumber',
                            maxLength: '255',
                            required: 'required',
                          }}
                          className={classes.fontSize}
                        />
                      </FormControl>
                      <FormHelperText className={classes.errorMessage}>
                        {this.state.serialErrorMessage}
                      </FormHelperText>
                      <FormControl className={classes.newDeviceFormField}>
                        <InputLabel className={classes.fontSize}>Identification Number</InputLabel>
                        <Input
                          value={identificationNum}
                          onChange={this.inputHandler}
                          onBlur={this.validateIdentificationNumber}
                          error={identificationNumberErrorMessage.length > 0}
                          type='number'
                          inputProps={{
                            type: 'number',
                            name: 'identificationNum',
                            maxLength: '4',
                            required: 'required',
                            step: '1',
                            placeholder: '1234',
                          }}
                          className={classes.fontSize}
                        />
                        <FormHelperText className={classes.errorMessage}>
                          {identificationNumberErrorMessage}
                        </FormHelperText>
                      </FormControl>
                      <FormControl className={classes.newDeviceFormField}>
                        <InputLabel className={classes.fontSize}>Operating system</InputLabel>
                        <Input
                          value={os}
                          onChange={this.inputHandler}
                          inputProps={{
                            name: 'os',
                            maxLength: '255',
                            required: 'required',
                          }}
                          className={classes.fontSize}
                        />
                      </FormControl>
                      <FormControl className={classes.newDeviceFormField}>
                        <InputLabel className={classes.fontSize}>Location</InputLabel>
                        <div className={classes.wrapper}>
                          <Select
                            value={officeId}
                            autoWidth={true}
                            error={locationErrorMessage.length > 0}
                            inputProps={{
                              name: 'officeId',
                              required: 'required',
                            }}
                            onChange={this.inputHandler}
                            className={classes.select}
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
                        </div>
                        <FormHelperText className={classes.errorMessage}>
                          {locationErrorMessage}
                        </FormHelperText>
                      </FormControl>
                      <DatePicker
                        label="Device purchase date"
                        showTodayButton
                        disableFuture
                        format="DD/MM/YYYY"
                        value={purchaseDate}
                        onChange={this.handleDateChange}
                        className={classes.inputField}
                        InputLabelProps={{ classes: { root: classes.fontSize } }}
                      />
                      <FormControl className={classes.newDeviceFormField}>
                        <InputLabel className={classes.fontSize}>Vendor</InputLabel>
                        <Input
                          value={vendor}
                          onChange={this.inputHandler}
                          error={taxRateErrorMessage.length > 0}
                          inputProps={{
                            name: 'vendor',
                            required: 'required',
                          }}
                          className={classes.fontSize}
                        />
                      </FormControl>
                      <FormControl className={classes.newDeviceFormField}>
                        <InputLabel className={classes.fontSize}>Tax rate</InputLabel>
                        <Input
                          value={taxRate}
                          onChange={this.inputHandler}
                          error={taxRateErrorMessage.length > 0}
                          onBlur={this.validateTaxRateNumber}
                          type="number"
                          inputProps={{
                            name: 'taxRate',
                            type: 'number',
                            required: 'required',
                            step: '0.01',
                            placeholder: '12.34',
                          }}
                          className={classes.fontSize}
                        />
                        <FormHelperText className={classes.errorMessage}>
                          {taxRateErrorMessage}
                        </FormHelperText>
                      </FormControl>
                      <FormControl>
                        <div className={classes.buttonsContainer}>
                          <Button
                            variant="raised"
                            color="secondary"
                            className={classes.button}
                            onClick={() => history.goBack()}
                          >
                            CANCEL
                          </Button>
                          <Button
                            type='submit'
                            variant="raised"
                            color="primary"
                            className={classes.button}
                          >
                            {deviceId ? 'UPDATE' : 'SUBMIT'}
                          </Button>
                        </div>
                      </FormControl>
                    </FormGroup>
                  </form>
                )}
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

CreateDevice.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  fetchOffices: PropTypes.func.isRequired,
  offices: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    city: PropTypes.string.isRequired,
  })).isRequired,
  brands: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    models: PropTypes.array,
  })).isRequired,
  createDevice: PropTypes.func.isRequired,
  fetchBrands: PropTypes.func.isRequired,
  fetchDeviceWithId: PropTypes.func.isRequired,
  fetchDeviceLoading: PropTypes.bool.isRequired,
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
    serialNum: PropTypes.string.isRequired,
    vendor: PropTypes.string.isRequired,
    taxRate: PropTypes.number.isRequired,
    purchased: PropTypes.instanceOf(Date).isRequired,
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
    reservations: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
      }),
      from: PropTypes.instanceOf(Date).isRequired,
      to: PropTypes.instanceOf(Date).isRequired,
      status: PropTypes.number.isRequired,
    })).isRequired,
  }),
};

const mapStateToProps = state => ({
  offices: state.offices.offices,
  brands: state.brands.brands,
  device: state.deviceDetails.device,
  fetchDeviceLoading: state.deviceDetails.fetchDeviceLoading,
});

export default withRouter(connect(mapStateToProps, {
  ...officesActions,
  ...devicesActions,
  ...deviceDetailsActions,
  ...brandsActions,
})(withStyles(Styles)(CreateDevice)));