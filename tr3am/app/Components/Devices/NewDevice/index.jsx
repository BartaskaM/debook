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
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';

// import { dateToFullYear } from 'Utils/dateUtils';

import Styles from './Styles';
//import Brands from 'Constants/Brands';
import * as authActions from 'ActionCreators/authActions';
import * as officesActions from 'ActionCreators/officesActions';
import * as brandsActions from 'ActionCreators/brandsActions';
import * as devicesActions from 'ActionCreators/devicesActions';
import devices from 'Constants/Devices';

class NewDevice extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      deviceActive: true,
      deviceName: '',
      brand: '',
      model: '',
      modelForm: '',
      newModel: false,
      purchaseDate: '',
      serialNumber: '',
      os: '',
      group: '',
      subgroup: '',
      description: '',
      location: '',
      vendor: '',
      taxRate: '',
      image: '',
      serialErrorMessage: '',
      locationErrorMessage: '',
      brandErrorMessage: '',
      modelErrorMessage: '',
      dateErrorMessage: '',
      errorInForm: '',
    };

    this.inputHandler = this.inputHandler.bind(this);
    this.inputHandlerForModel = this.inputHandlerForModel.bind(this);
    this.inputHandlerForBrand = this.inputHandlerForBrand.bind(this);
    this.submitNewDeviceForm = this.submitNewDeviceForm.bind(this);
    this.isDeviceUnique = this.isDeviceUnique.bind(this);
    this.addNewModel = this.addNewModel.bind(this);
    this.areAllSelected = this.areAllSelected.bind(this);
    this.loadModels = this.loadModels.bind(this);
    
  }

  componentDidMount() {
    this.props.fetchOffices();
    this.props.fetchBrands();
    this.props.setDevices(devices);
    console.log('componentDidMount()');
  }

  submitNewDeviceForm(e) {
    e.preventDefault();
    //const { addDevice, history  } = this.props;
    const { addDevice } = this.props;
    console.log('Calling for errors');
    
    if (this.areAllSelected()) {
      console.log('All fields filled');
      this.setState({ ['errorInForm']: '' });
      if (this.isDeviceUnique()) {
        if (this.state.newModel) {
          this.setState({['model']: this.addNewModel()});
        }
        console.log(devices);
        const newDevice = {
          active: this.state.deviceActive,
          name: this.state.deviceName,
          brand: this.state.brand,
          model: this.state.model,
          purchaseDate: this.state.purchaseDate,
          serial: this.state.serialNumber,
          os: this.state.os,
          group: this.state.group,
          subgroup: this.state.subgroup,
          description: this.state.description,
          location: this.state.location,
          vendor: this.state.vendor,
          taxRate: this.state.taxRate,
          image: this.state.image,
        };
        console.log(newDevice);
        const newDeviceID = addDevice(newDevice)['newDeviceID'];
        console.log(newDeviceID);
        // history.push(`/devices/${newDeviceID}`);
        //history.push('/devices/9');
        console.log(devices);
      }
      else
        this.setState({ ['errorInForm']: 'Check entered data' });
    }
    else
      this.setState({ ['errorInForm']: 'Check entered data' });
  }

  inputHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  inputHandlerForBrand(e) {
    this.setState({ [e.target.name]: e.target.value });
    this.loadModels(e.target.value);
  }
  
  // TODO: implement loading of models list
  loadModels(id) {
    console.log('Loading models with Brand id: ', id);
    //Load models
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
    console.log('Checking errors');
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
    if (this.state.location === ''){
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

  //TODO: implement adding of new model;
  addNewModel()
  {
    const newModelID = 1;
    return newModelID;
  }

  render() {
    const { 
      classes, 
      offices,
      brands, 
    } = this.props;
    const {
      deviceActive,
      deviceName,
      brand,
      model,
      date,
      serialNumber,
      os,
      group,
      subgroup,
      description,
      location,
      vendor,
      taxRate,
      image,
      modelForm,
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
                  <InputLabel className={classes.fontSize}>Device name</InputLabel>
                  <Input
                    value={deviceName}
                    onChange={this.inputHandler}
                    inputProps={{
                      name: 'deviceName',
                      maxLength: '255',
                    }}
                    className={classes.fontSize}
                  />
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
                      onChange={this.inputHandlerForBrand}
                      className={classes.select}
                    >
                      {brands.map((brand, i) => (
                        <MenuItem
                          key={i}
                          value={brand.id}
                          className={classes.menuItemWidth}
                        >
                          {brand.brandName}
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
                        className={classes.menuItemWidth}>Other model</MenuItem>
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
                  <InputLabel className={classes.fontSize}>OS</InputLabel>
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
                  <InputLabel className={classes.fontSize}>Group</InputLabel>
                  <Input
                    value={group}
                    onChange={this.inputHandler}
                    inputProps={{
                      name: 'group',
                      maxLength: '255',
                    }}
                    className={classes.fontSize}
                  />
                </FormControl>
                <FormControl className={classes.newDeviceFormField}>
                  <InputLabel className={classes.fontSize}>Subgroup</InputLabel>
                  <Input
                    value={subgroup}
                    onChange={this.inputHandler}
                    inputProps={{
                      name: 'subgroup',
                      maxLength: '255',
                    }}
                    className={classes.fontSize}
                  />
                </FormControl>
                <FormControl className={classes.newDeviceFormField}>
                  <InputLabel className={classes.fontSize}>Description</InputLabel>
                  <Input
                    value={description}
                    onChange={this.inputHandler}
                    inputProps={{
                      name: 'description',
                      maxLength: '2000',
                    }}
                    className={classes.fontSize}
                  />
                </FormControl>
                <FormControl className={classes.newDeviceFormField}>
                  <InputLabel className={classes.fontSize}>Location</InputLabel>
                  <div className={classes.wrapper}>
                    <Select
                      value={location}
                      autoWidth={true}
                      inputProps={{
                        name: 'location',
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
                  <TextField
                    id="purchaseDate"
                    label="Device purchase date"
                    type="date"
                    defaultValue={date}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      name: 'purchaseDate',
                      required: 'required',
                    }}
                    onChange={this.inputHandler}
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
                    inputProps={{
                      name: 'taxRate',
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
    id: PropTypes.number.isRequired,
    country: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  })).isRequired,
  brands: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    brandName: PropTypes.string.isRequired,
    models: PropTypes.array.isRequired,
  })).isRequired,
  devices: PropTypes.arrayOf(PropTypes.shape({
    brand: PropTypes.number.isRequired,
    model: PropTypes.number.isRequired,
    os: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
  })).isRequired,
  setDevices: PropTypes.func.isRequired,
  addDevice: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  // signUpError: store.auth.signUpError,
  // currentTab: store.auth.currentTab,
  // fetchingSignUp: store.auth.fetchingSignUp,
  offices: state.offices.offices,
  brands: state.brands.brands,
  devices: state.devices.devices,
  // fetchOfficesLoading: store.offices.fetchOfficesLoading,
  // fetchOfficesErrorMessage: store.offices.fetchOfficesErrorMessage,
});

export default withRouter(connect(mapStateToProps, {
  ...authActions, 
  ...officesActions,
  ...brandsActions,
  ...devicesActions,
})(withStyles(Styles)(NewDevice)));