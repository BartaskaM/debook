// Date field has errors on setting

import React from 'react';
import {
  Input,
  Typography,
  Button,
  Select,
  Paper,
  Grid,
} from 'material-ui';
import { connect } from 'react-redux';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import {
  FormControl,
  FormGroup,
} from 'material-ui/Form';
import { withRouter, Link } from 'react-router-dom';
//import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import { DatePicker } from 'material-ui-pickers';

import Styles from './Styles';
import * as authActions from 'ActionCreators/authActions';
import * as officesActions from 'ActionCreators/officesActions';
import * as brandsActions from 'ActionCreators/brandsActions';
import * as devicesActions from 'ActionCreators/devicesActions';
import * as modelsActions from 'ActionCreators/modelsActions';

class NewDevice extends React.Component {
  constructor(props) {
    super(props);
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);
    this.state = {
      deviceActive: true,
      brand: '',
      model: '',
      modelForm: '',
      newModel: false,
      purchaseDate: todayDate,
      serialNumber: '',
      os: '',
      identificationNum: '',
      office: '',
      vendor: '',
      taxRate: 0.00,
      image: '',
      serialErrorMessage: '',
      locationErrorMessage: '',
      brandErrorMessage: '',
      modelErrorMessage: '',
      dateErrorMessage: '',
      errorInForm: '',
      modelFieldDisabled: true,
      models: [], 
      //date: '2018-05-01',
    };

    this.inputHandler = this.inputHandler.bind(this);
    this.inputHandlerForModel = this.inputHandlerForModel.bind(this);
    this.inputHandlerForBrand = this.inputHandlerForBrand.bind(this);
    this.submitNewDeviceForm = this.submitNewDeviceForm.bind(this);
    this.isDeviceUnique = this.isDeviceUnique.bind(this);
    // this.createNewModel = this.createNewModel.bind(this);
    this.areAllSelected = this.areAllSelected.bind(this);
    this.loadModels = this.loadModels.bind(this);
    this.createNewDevice = this.createNewDevice.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    
  }

  componentDidMount() {

    if (this.props.offices.length === 0)
      this.props.fetchOffices();
    if (this.props.brands.length === 0)
      this.props.fetchBrands();    
  }

  handleDateChange(event, date) {
    this.setState({['purchaseDate']: date});
  }

  submitNewDeviceForm(e) {
    e.preventDefault();
    if (this.areAllSelected()) {
      this.setState({ ['errorInForm']: '' });
      if (this.isDeviceUnique()) {

        this.createNewDevice();
      }
      else
        this.setState({ ['errorInForm']: 'Check entered data' });
    }
    else
      this.setState({ ['errorInForm']: 'Check entered data' });
  }

  createNewDevice() {
    let modelId = this.state.model;
    if (this.state.newModel) {
      modelId = -1;
    }
    const newDevice = {
      active: this.state.deviceActive,
      brandid: this.state.brand,
      description: this.state.description,
      identificationnum: this.state.identificationNum,
      image: this.state.image,
      modelid: modelId,
      officeid: this.state.office,
      purchased: this.state.purchaseDate,
      serialnum: this.state.serialNumber,
      os: this.state.os,
      taxrate: this.state.taxRate,
      vendor: this.state.vendor,
      available: true,
      newmodel: this.state.newModel,
      modelname: this.state.model,
    };
    this.props.createDevice(newDevice, this.props.history);
  }

  //TODO: implement adding of new model;
  // createNewModel()
  // {
  //   const newModel = {
  //     name: this.state.model,
  //     brandId: this.state.brand,
  //   };
  //   const id = this.props.createModel(newModel);
  //   return id;
  // }

  inputHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  inputHandlerForBrand(e) {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({ ['modelFieldDisabled']: false });
    this.loadModels(e.target.value);
  }
  
  loadModels(id) {
    let key;
    for (let i = 0; i < this.props.brands.length; i++) {
      if (this.props.brands[i].id === id)
        key = i;
    }
    if(!isNaN(key))
      this.setState({['models']: this.props.brands[key].models}); 
  }

  inputHandlerForModel(e) {
    if (e.target.value === true) {
      this.setState({ [e.target.name]: e.target.value });
      this.setState({ ['newModel']: true });
    }
    else {
      this.setState({ [e.target.name]: e.target.value });
      this.setState({ ['newModel']: false });
      this.setState({ ['model']: e.target.value });
    }
  }

  areAllSelected()
  {
    if (this.state.brand === ''){
      console.log('Error 1');
      this.setState({ ['brandErrorMessage']: 'Select brand model' });
      return false;
    }
    else
      this.setState({ ['brandErrorMessage']: '' });
    if (this.state.model === ''){
      console.log('Error 2');
      this.setState({ ['modelErrorMessage']: 'Select device model' });
      return false;
    }
    else
      this.setState({ ['modelErrorMessage']: '' });
    if (this.state.office === ''){
      console.log('Error 3');
      this.setState({ ['locationErrorMessage']: 'Select location' });
      return false;
    }
    else
      this.setState({ ['locationErrorMessage']: '' });
    if (this.state.purchaseDate === ''){
      console.log('Error 4');
      this.setState({ ['dateErrorMessage']: 'Select purchase date' });
      return false;
    }
    else
      this.setState({ ['dateErrorMessage']: '' });
    return true;
  }

  isDeviceUnique()
  {
    const { devices } = this.props;
    const specificDevice = (devices.find(x => x.serialNumber === this.state.serialNumber));
    if (specificDevice != null) {
      this.setState({ serialErrorMessage: 'This device already exists' });
      return false;
    }
    else {
      return true;
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
      brand,
      model,
      serialNumber,
      os,
      identificationNum,
      office,
      vendor,
      taxRate,
      image,
      modelForm,
      models,
      //purchaseDate,
    } = this.state;

    const newModelForm = this.state.newModel 
      ? <div>
        <InputLabel className={classes.fontSize}>Other model</InputLabel>
        <Input
          value={model}
          onChange={this.inputHandler}
          inputProps={{
            name: 'model',
          }}
          className={classes.fontSize}
        />
      </div>
      : null;

    return (
      <div className={classes.root}>
        {/* <Grid container justify='center'> */}
        <Paper className={classes.root}>
          <form method='POST' onSubmit={this.submitNewDeviceForm}>
            <FormGroup>
              {/* <Grid item xs={6}> */}
              <Grid container direction='column'>
                <Typography variant='headline'>
          Please fill in you details for new device in the form below
                </Typography>
                <FormControl className={classes.newDeviceFormField}>
                  <InputLabel className={classes.fontSize}>Device status</InputLabel>
                  <div  className={classes.wrapper}>
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
                        value={true}
                        className={classes.menuItemWidth}>Active</MenuItem>
                      <MenuItem
                        value={false}
                        className={classes.menuItemWidth}>Non Active</MenuItem>
                    </Select>
                  </div>
                </FormControl>
                <FormControl className={classes.newDeviceFormField}>
                  <InputLabel className={classes.fontSize}>Brand</InputLabel>
                  <div className={classes.wrapper}>
                    <Select
                      value={brand}
                      autoWidth={true}
                      inputProps={{
                        name: 'brand',
                        required: 'required',
                      }}
                      errortext={this.state.brandErrorMessage}
                      onChange={this.inputHandlerForBrand }
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
                <Typography variant='headline' className={classes.errorMessage}>
                  {this.state.brandErrorMessage}
                </Typography>
                <FormControl className={classes.newDeviceFormField}>
                  <InputLabel className={classes.fontSize}>Model</InputLabel>
                  <div  className={classes.wrapper}>
                    <Select
                      disabled={this.state.modelFieldDisabled}
                      hinttext="Select Brand before selecting Model"
                      value={modelForm}
                      autoWidth={true}
                      inputProps={{
                        name: 'modelForm',
                        required: 'required',
                      }}
                      onChange={this.inputHandlerForModel}
                      className={classes.select}
                    >
                      <MenuItem
                        value={true}
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
                    value={image}
                    onChange={this.inputHandler}
                    inputProps={{
                      name: 'image',
                      maxLength: '255',
                      required: 'required',
                    }}
                    className={classes.fontSize}
                  />
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
                <Typography variant='headline' className={classes.errorMessage}>
                  {this.state.serialErrorMessage}
                </Typography>
                <FormControl className={classes.newDeviceFormField}>
                  <InputLabel className={classes.fontSize}>Identification number</InputLabel>
                  <Input
                    value={identificationNum}
                    onChange={this.inputHandler}
                    inputProps={{
                      type: 'number',
                      name: 'identificationNum',
                      maxLength: '4',
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
                      value={office}
                      autoWidth={true}
                      inputProps={{
                        name: 'office',
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
                <FormControl className={classes.newDeviceFormField}>
                  <DatePicker
                    // label="Device purchase date"
                    //showTodayButton
                    // format="DD/MM/YYYY"
                    //value={purchaseDate}
                    // onChange={this.handleDateChange}
                    // className={classes.inputField}
                    //InputLabelProps={{ classes: { root: classes.fontSize } }}
                  />
                </FormControl>
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
                    }}
                    className={classes.fontSize}
                  />
                </FormControl>
                <Typography variant='headline' className={classes.errorMessage}>
                  {this.state.errorInForm}
                </Typography>
                {/* </Grid> */}
              </Grid>
              <FormControl>
                <div className={classes.buttonsContainer}>
                  {/* <Grid Grid item xs={12} sm={6}> */}
                  <Button
                    type='submit'
                    variant="raised"
                    color="primary"
                    className={classes.button}
                  >
                SAVE DEVICE
                  </Button>
                  {/* </Grid> */}
                  {/* <Grid Grid item xs={12} sm={6}> */}
                  <Link to={'/devices'}>
                    <Button
                      variant="raised"
                      color="primary"
                      className={classes.button}
                    >
                    CANCEL
                    </Button>
                  </Link>
                  {/* </Grid> */}
                </div>
              </FormControl>
            </FormGroup>
          </form>
        </Paper>
        {/* </Grid> */}
      </div>
    );
  }
}

NewDevice.propTypes = {
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  fetchOffices: PropTypes.func.isRequired,
  fetchBrands: PropTypes.func.isRequired,
  offices: PropTypes.arrayOf(PropTypes.shape({
    // id: PropTypes.number.isRequired,
    // country: PropTypes.string.isRequired,
    // city: PropTypes.string.isRequired,
    // address: PropTypes.string.isRequired,
    // lat: PropTypes.number.isRequired,
    // lng: PropTypes.number.isRequired,
  })).isRequired,
  brands: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    models: PropTypes.array.isRequired,
  })).isRequired,
  // models: PropTypes.arrayOf(PropTypes.shape({
  //   id: PropTypes.number.isRequired,
  //   name: PropTypes.string.isRequired,
  // })).isRequired,
  devices: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    // active: PropTypes.bool.isRequired,
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
    // serialnum: PropTypes.string.isRequired,
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
  setDevices: PropTypes.func.isRequired,
  createDevice: PropTypes.func.isRequired,
  createModel: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  offices: state.offices.offices,
  brands: state.brands.brands,
  devices: state.devices.devices,
  // fetchOfficesLoading: store.offices.fetchOfficesLoading,
});

export default withRouter(connect(mapStateToProps, {
  ...authActions, 
  ...officesActions,
  ...brandsActions,
  ...devicesActions,
  ...modelsActions,
})(withStyles(Styles)(NewDevice)));