import React from 'react';
// TODO: Seporate material-ui imports
import {
  Input,
  Typography,
  Button,
  Select,
  Paper,
} from 'material-ui';
import Grid from 'material-ui/grid';
import { connect } from 'react-redux';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import {
  FormControl,
  FormGroup,
} from 'material-ui/Form';
import { withRouter, Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import { DatePicker } from 'material-ui-pickers';
import ImageRegEx from 'Constants/ImageRegEx';

import Styles from './Styles';
import * as authActions from 'ActionCreators/authActions';
import * as officesActions from 'ActionCreators/officesActions';
import * as devicesActions from 'ActionCreators/devicesActions';
import * as brandsActions from 'ActionCreators/brandsActions';

class CreateDevice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deviceActive: 1,
      brandId: '',
      modelId: '',
      //modelForm: '',
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
      errorInForm: '',
      modelFieldDisabled: true,
      models: [],
    };
    this.inputHandler = this.inputHandler.bind(this);
    this.inputHandlerForModel = this.inputHandlerForModel.bind(this);
    this.inputHandlerForBrand = this.inputHandlerForBrand.bind(this);
    this.submitNewDeviceForm = this.submitNewDeviceForm.bind(this);
    this.areAllSelected = this.areAllSelected.bind(this);
    this.loadModels = this.loadModels.bind(this);
    this.createNewDevice = this.createNewDevice.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.validateImage = this.validateImage.bind(this);
    this.validateIdentificationNumber = this.validateIdentificationNumber.bind(this);
  }

  componentDidMount() {
    if (this.props.offices.length === 0)
      this.props.fetchOffices();
    if (this.props.brands.length === 0) {
      this.props.fetchBrands();
    }
  }

  handleDateChange(date) {
    this.setState({ ['purchaseDate']: date });
  }

  submitNewDeviceForm(e) {
    e.preventDefault();
    if (this.areAllSelected() && this.validateImage() && this.validateIdentificationNumber()) {
      this.setState({ ['errorInForm']: '' });
      this.createNewDevice();
    }
  }

  createNewDevice() {
    // let modelId = this.state.modelId;
    // if (this.state.newModel) {
    //   modelId = -1;
    // }
    const newDevice = {
      active: this.state.deviceActive,
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
      available: true,
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
      [e.target.name]: e.target.value,
      // TODO: FIX ALL of the [''] where it is string
      ['modelFieldDisabled']: false,
    });
    this.loadModels(e.target.value);
  }

  loadModels(id) {
    let key;
    for (let i = 0; i < this.props.brands.length; i++) {
      if (this.props.brands[i].id === id)
        key = i;
    }
    if (!isNaN(key))
      this.setState({ ['models']: this.props.brands[key].models });
  }

  inputHandlerForModel(e) {
    this.setState({
      [e.target.name]: e.target.value,
      ['newModel']: e.target.value === -1 ? true : false,
    });
  }

  areAllSelected() {
    if (this.state.brandId === '') {
      this.setState({ ['errorInForm']: 'Select device brand' });
      return false;
    }
    if (this.state.modelId === '') {
      this.setState({ ['errorInForm']: 'Select device model' });
      return false;
    }
    if (this.state.officeId === '') {
      this.setState({ ['errorInForm']: 'Select location' });
      return false;
    }
    return true;
  }

  validateImage() {
    const regImage = new RegExp(ImageRegEx.r_image);
    if (regImage.exec(this.state.imageURL)) {
      return true;
    } else {
      this.setState({ errorInForm: 'Wrong image URL. Make sure you entered correct URL.' });
      return false;
    }
  }

  validateIdentificationNumber() {
    if (this.state.identificationNum > 0) {
      return true;
    } else {
      this.setState({ errorInForm: 'Identification number must be greater than 0' });
      return false;
    }
  }

  render() {
    const {
      classes,
      offices,
      brands,
    } = this.props;
    const {
      deviceActive,
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
    } = this.state;

    const newModelForm = this.state.newModel ?
      <div>
        <InputLabel className={classes.fontSize}>Other model</InputLabel>
        <Input
          value={modelName}
          onChange={this.inputHandler}
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
              <form method='POST' onSubmit={this.submitNewDeviceForm}>
                <FormGroup>
                  <Typography variant='headline'>
                    Please fill in you details for new device in the form below
                  </Typography>
                  <FormControl className={classes.newDeviceFormField}>
                    <InputLabel className={classes.fontSize}>Device status</InputLabel>
                    <div className={classes.wrapper}>
                      <Select
                        value={deviceActive}
                        autoWidth={true}
                        inputProps={{
                          name: 'deviceActive',
                          required: 'required',
                        }}
                        onChange={this.inputHandler}
                        className={classes.select}
                      >
                        <MenuItem
                          value={1}
                          className={classes.menuItemWidth}>Active</MenuItem>
                        <MenuItem
                          value={0}
                          className={classes.menuItemWidth}>Non Active</MenuItem>
                      </Select>
                    </div>
                  </FormControl>
                  <FormControl className={classes.newDeviceFormField}>
                    <InputLabel className={classes.fontSize}>Brand</InputLabel>
                    <div className={classes.wrapper}>
                      <Select
                        value={brandId}
                        autoWidth={true}
                        inputProps={{
                          name: 'brandId',
                          required: 'required',
                        }}
                        errortext={this.state.brandErrorMessage}
                        onChange={this.inputHandlerForBrand}
                        className={classes.select}
                      >
                        {brands.map((brand, i) => (
                          <MenuItem
                            key={i}
                            value={brand.id}
                            className={classes.menuItemWidth}
                          >
                            {brand.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                  </FormControl>
                  {/* TODO: use <FormHelperText> for error texts */}
                  <Typography variant='headline' className={classes.errorMessage}>
                    {this.state.brandErrorMessage}
                  </Typography>
                  <FormControl className={classes.newDeviceFormField}>
                    <InputLabel className={classes.fontSize}>Model</InputLabel>
                    <div className={classes.wrapper}>
                      <Select
                        disabled={this.state.modelFieldDisabled}
                        value={modelId}
                        autoWidth={true}
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
                        {models.map((model, i) => (
                          <MenuItem
                            key={i}
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
                  </FormControl>
                  <Typography variant='headline' className={classes.errorMessage}>
                    {this.state.modelErrorMessage}
                  </Typography>
                  <FormControl className={classes.newDeviceFormField}>
                    <InputLabel className={classes.fontSize}>Image URL</InputLabel>
                    <Input
                      value={imageURL}
                      onChange={this.inputHandler}
                      inputProps={{
                        name: 'imageURL',
                        maxLength: '255',
                        required: 'required',
                      }}
                      className={classes.fontSize}
                    />
                  </FormControl>
                  <Typography variant='headline' className={classes.errorMessage}>
                    {this.state.imageErrorMessage}
                  </Typography>
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
                  <Typography variant='headline' className={classes.errorMessage}>
                    {this.state.serialErrorMessage}
                  </Typography>
                  <FormControl className={classes.newDeviceFormField}>
                    <InputLabel className={classes.fontSize}>Identification number</InputLabel>
                    <Input
                      value={identificationNum}
                      onChange={this.inputHandler}
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
                        inputProps={{
                          name: 'officeId',
                          required: 'required',
                        }}
                        onChange={this.inputHandler}
                        className={classes.select}
                      >
                        {offices.map((office, i) => (
                          <MenuItem
                            key={i}
                            value={office.id}
                            className={classes.menuItemWidth}
                          >
                            {office.city}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                  </FormControl>
                  <Typography variant='headline' className={classes.errorMessage}>
                    {this.state.locationErrorMessage}
                  </Typography>
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
                  <Typography variant='headline' className={classes.errorMessage}>
                    {this.state.dateErrorMessage}
                  </Typography>
                  <FormControl className={classes.newDeviceFormField}>
                    <InputLabel className={classes.fontSize}>Vendor</InputLabel>
                    <Input
                      value={vendor}
                      onChange={this.inputHandler}
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
                  </FormControl>
                  <Typography variant='headline' className={classes.errorMessage}>
                    {this.state.errorInForm}
                  </Typography>
                  <FormControl>
                    <div className={classes.buttonsContainer}>
                      <Button
                        type='submit'
                        variant="raised"
                        color="primary"
                        className={classes.button}
                      >
                        SAVE DEVICE
                      </Button>
                      <Link to={'/devices'}>
                        <Button
                          variant="raised"
                          color="primary"
                          className={classes.button}
                        >
                          CANCEL
                        </Button>
                      </Link>
                    </div>
                  </FormControl>
                </FormGroup>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

CreateDevice.propTypes = {
  history: PropTypes.object.isRequired,
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
  devices: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
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
  })).isRequired,
  createDevice: PropTypes.func.isRequired,
  fetchBrands: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  offices: state.offices.offices,
  devices: state.devices.devices,
  brands: state.brands.brands,
});

export default withRouter(connect(mapStateToProps, {
  ...authActions,
  ...officesActions,
  ...devicesActions,
  ...brandsActions,
})(withStyles(Styles)(CreateDevice)));