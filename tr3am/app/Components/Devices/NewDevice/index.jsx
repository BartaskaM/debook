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
      // brand: props.brands[0] ? props.brands[0].id : null,
      brand: '',
      model: '',
      date: '',
      serialNumber: '',
      os: '',
      group: '',
      subgroup: '',
      description: '',
      // location: props.offices[0] ? props.offices[0].id : null,
      location: '',
      vendor: '',
      taxRate: '',
      monthYear: '',
    };

    this.setState.date = dateToFullYear(new Date(Date.now()));
    this.setState.monthYear = dateToFullYear(new Date(Date.now()));

    this.inputHandler = this.inputHandler.bind(this);
    this.submitNewDeviceForm = this.submitNewDeviceForm.bind(this);
    
  }

  componentDidMount(){
    this.props.fetchOffices();
    this.props.fetchBrands();
  }

  submitNewDeviceForm(e) {
    e.preventDefault();
    const results = {
      Active: this.state.deviceActive,
      Name: this.state.deviceName,
      Brand: this.state.brand,
      Model: this.state.model,
      PurchaseDate: this.state.date,
      Serial: this.state.serialNumber,
      OS: this.state.os,
      Greoup: this.state.group,
      Subgroup: this.state.subgroup,
      Description: this.state.description,
      Location: this.state.location,
      Vendor: this.state.vendor,
      TaxRate: this.state.taxRate,
      Someday: this.state.monthYear,
    };
    console.log(results);
    //console.log(new Date(Date.now()).toLocaleString());
    
  }

  inputHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
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
    } = this.state;
    return (
      <div className={classes.root}>
        <Grid item xs={12} justify='center'>
          <Grid item xs={3} />
          <Paper>
            <form method='POST' onSubmit={this.submitNewDeviceForm}>
              <FormGroup>
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
                      }}
                      onChange={this.inputHandler}
                      className={classes.fontSize}
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
                      value={model}
                      autoWidth={true}
                      inputProps={{
                        name: 'model',
                      }}
                      onChange={this.inputHandler}
                      className={classes.select}
                    >
                      {/* {brands.models.map((model, i) => (
                        <MenuItem
                          key={i}
                          value={model.id}
                          className={classes.menuItemWidth}
                        >
                          {model.name}
                        </MenuItem>
                      ))} */}
                    </Select>
                  </div>
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
                    }}
                    className={classes.fontSize}
                  />
                </FormControl>
                <FormControl>
                  <Button
                    type='submit'
                    variant="raised"
                    color="primary"
                  >
                SAVE DEVICE
                  </Button>
                  <Button
                    variant="raised"
                    color="primary"
                    onClick={history.goBack}
                  >
                CANCEL
                  </Button>
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

export default connect(mapStateToProps, {
  ...authActions, 
  ...officesActions,
  ...brandsActions,
})(withStyles(Styles)(NewDevice));