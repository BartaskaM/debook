import React from 'react';
import {
  Input,
  Typography,
  Button,
  Select,
  Paper,
  Grid,
} from 'material-ui';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import {
  FormControl,
  FormGroup,
} from 'material-ui/Form';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';

import { 
  dateToFullYear,
  //roundTime,
} from 'Utils/dateUtils';

import Styles from './Styles';
import Brands from 'Constants/Brands';
//import dateToFullYear from 'Utils/dateUtils';

class NewDevice extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      deviceActive: true,
      deviceName: '',
      brand: '',
      model: '',
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
    this.submitNewDeviceForm = this.submitNewDeviceForm.bind(this);
    
  }

  submitNewDeviceForm(e) {
    e.preventDefault();
    console.log(this.state.date);
    //console.log(new Date(Date.now()).toLocaleString());
    
  }

  inputHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { 
      classes, 
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
                  <div  className={classes.wrapper}>
                    <Select
                      value={brand}
                      autoWidth={true}
                      inputProps={{
                        name: 'brand',
                      }}
                      onChange={this.inputHandler}
                      className={classes.select}
                    >
                      {Brands.map((brand) => (
                        <MenuItem
                          key={brand}
                          value={brand}
                          className={classes.menuItemWidth}
                        >
                          {brand}
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
                      <MenuItem
                        value={'iPhone'}
                        className={classes.menuItemWidth}>iPhone</MenuItem>
                      <MenuItem
                        value={'Galaxy S9'}
                        className={classes.menuItemWidth}>Galaxy S9</MenuItem>
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
                      <MenuItem 
                        value={'Kaunas'}
                        className={classes.menuItemWidth}>Kaunas</MenuItem>
                      <MenuItem 
                        value={'Vilnius'}
                        className={classes.menuItemWidth}>Vilnius</MenuItem>
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
};

export default withStyles(Styles)(NewDevice);