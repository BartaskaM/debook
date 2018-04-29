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

import { dateToFullYear } from 'Utils/dateUtils';

import Styles from './Styles';
//import Brands from 'Constants/Brands';
import * as authActions from 'ActionCreators/authActions';
import * as officesActions from 'ActionCreators/officesActions';
import * as brandsActions from 'ActionCreators/brandsActions';

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
      date: '',
      serialNumber: '',
      os: '',
      group: '',
      subgroup: '',
      description: '',
      location: '',
      vendor: '',
      taxRate: '',
      monthYear: '',
    };

    this.setState.date = dateToFullYear(new Date(Date.now()));
    this.setState.monthYear = dateToFullYear(new Date(Date.now()));

    this.inputHandler = this.inputHandler.bind(this);
    this.inputHandlerForModel = this.inputHandlerForModel.bind(this);
    this.submitNewDeviceForm = this.submitNewDeviceForm.bind(this);
    this.isDeviceUnique = this.isDeviceUnique.bind(this);
    this.addNewModel = this.addNewModel.bind(this);
    
  }

  componentDidMount(){
    this.props.fetchOffices();
    this.props.fetchBrands();
  }

  submitNewDeviceForm(e) {
    e.preventDefault();
    const results = {
      active: this.state.deviceActive,
      name: this.state.deviceName,
      brand: this.state.brand,
      modelForm: this.state.modelForm,
      model: this.state.model,
      newModel: this.state.newModel,
      purchaseDate: this.state.date,
      serial: this.state.serialNumber,
      os: this.state.os,
      group: this.state.group,
      subgroup: this.state.subgroup,
      description: this.state.description,
      location: this.state.location,
      vendor: this.state.vendor,
      taxRate: this.state.taxRate,
      someday: this.state.monthYear,
    };
    console.log(results);
  }

  inputHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  inputHandlerForModel(e) {
    if (e.target.value === true)
    {
      this.setState({ [e.target.name]: e.target.value });
      this.setState({ ['newModel']: true });
    }
    else
    {
      this.setState({ [e.target.name]: e.target.value });
      this.setState({ ['newModel']: false });
      this.setState({ ['model']: e.target.value });
    }
  }

  isDeviceUnique()
  {
    return false;
  }

  addNewModel()
  {
    
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
      monthYear,
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
        <Grid container justify='center'>
          <Paper className={classes.root}>
            <form method='POST' onSubmit={this.submitNewDeviceForm}>
              <FormGroup>
                {/* <Grid item xs={6}> */}
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
                      onChange={this.inputHandler}
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
                <FormControl className={classes.newDeviceFormField}>
                  <TextField
                    id='monthYear'
                    label="Device year and month"
                    type="date"
                    defaultValue={monthYear}
                    inputProps={{
                      name: 'monthYear',
                    }}
                    onChange={this.inputHandler}
                    className={classes.fontSize}
                    InputLabelProps={{
                      classes: { root: classes.label },
                      shrink: true }}
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
                <FormControl className={classes.newDeviceFormField}>
                  <TextField
                    id="date"
                    label="Device purchase date"
                    type="date"
                    defaultValue={date}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      name: 'date',
                    }}
                    onChange={this.inputHandler}
                  />
                </FormControl>
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
                {/* </Grid> */}

                <FormControl>
                  {/* <Grid Grid item xs={12} sm={6}> */}
                  <Button
                    type='submit'
                    variant="raised"
                    color="primary"
                    className={classes.buttonLeft}
                  >
                SAVE DEVICE
                  </Button>
                  {/* </Grid> */}
                  {/* <Grid Grid item xs={12} sm={6}> */}
                  <Link to={'/devices'}>
                    <Button
                      variant="raised"
                      color="primary"
                      className={classes.buttonRight}
                    >
                    CANCEL
                    </Button>
                  </Link>
                  {/* </Grid> */}
                </FormControl>
              </FormGroup>
            </form>
          </Paper>
        </Grid>
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
};

const mapStateToProps = store => ({
  // signUpError: store.auth.signUpError,
  // currentTab: store.auth.currentTab,
  // fetchingSignUp: store.auth.fetchingSignUp,
  offices: store.offices.offices,
  brands: store.brands.brands,
  // fetchOfficesLoading: store.offices.fetchOfficesLoading,
  // fetchOfficesErrorMessage: store.offices.fetchOfficesErrorMessage,
});

export default withRouter(connect(mapStateToProps, {
  ...authActions, 
  ...officesActions,
  ...brandsActions,
})(withStyles(Styles)(NewDevice)));