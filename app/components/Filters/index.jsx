import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as devicesActions from 'ActionCreators/devicesActions';
import {
  FormLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
} from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import Drawer from 'material-ui/Drawer';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import Styles from './Styles';
import Divider from 'material-ui/Divider';
import Brands from 'Constants/Brands';
import Offices from 'Constants/Offices';

class Filters extends React.Component{
  constructor(props){
    super(props);
    this.handleBrandChange = this.handleBrandChange.bind(this);
    this.handleOfficeChange = this.handleOfficeChange.bind(this);
  }

  componentWillUnmount(){
    this.props.resetFilters();
  }
  handleBrandChange(brand){
    const indexOfBrand = this.props.brandFilter.indexOf(brand);
    if(indexOfBrand === -1){
      this.props.addBrandFilter(brand);
    }
    else{
      this.props.removeBrandFilter(indexOfBrand);
    }
  }

  handleOfficeChange(office){
    const indexOfOffice = this.props.officeFilter.indexOf(office);
    if(indexOfOffice === -1){
      this.props.addOfficeFilter(office);
    }
    else{
      this.props.removeOfficeFilter(indexOfOffice);
    }
  }

  renderBrandFilter(){
    const brands = Brands
      .map((brand, i) => <FormControlLabel key={i}
        control={
          <Checkbox
            onChange={() => this.handleBrandChange(brand)}
            checked={this.props.brandFilter.includes(brand) ? true : false}
            value={brand}
          />
        }
        label={brand}
      />);
    return (
      <div>
        <FormLabel >Brands</FormLabel>
        <FormGroup>
          {brands}
        </FormGroup>
      </div>
    );
  }

  renderOfficeFilter(){
    const offices = Offices
      .map((office, i) => <FormControlLabel key={i}
        control={
          <Checkbox
            onChange={() => this.handleOfficeChange(office.city)}
            checked={this.props.officeFilter.includes(office.city) ? true : false}
            value={office.city}
          />
        }
        label={office.city}
      />);
    return (
      <div>
        <FormLabel >Offices</FormLabel>
        <FormGroup>
          {offices}
        </FormGroup>
      </div>
    );
  }

  renderAvailabilityFilter(){
    return (
      <div>
        <FormLabel >Availability</FormLabel>
        <FormGroup>
          <FormControlLabel 
            control={
              <Checkbox
                onChange={() => this.props.setShowAvailable(!this.props.showAvailable)}
                checked={this.props.showAvailable}
                value='Available'
              />
            }
            label='Available'
          />
          <FormControlLabel 
            control={
              <Checkbox
                onChange={() => this.props.setShowUnavailable(!this.props.showUnavailable)}
                checked={this.props.showUnavailable}
                value='Unavailable'
              />
            }
            label='Unavailable'
          />
        </FormGroup>
      </div>
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <Drawer variant="permanent" className={classes.root} classes={{paper: classes.drawerPaper}}>
        <div className={classes.toolbar} />
        <FormControl className={classes.toolbar}>
          <Button variant='flat' color='secondary' onClick={() => this.props.resetFilters()}>
          Clear filters
          </Button>
          {this.renderBrandFilter()}
          <Divider/>
          {this.renderOfficeFilter()}
          <Divider/>
          {this.renderAvailabilityFilter()}
        </FormControl>
      </Drawer>
    );
  }
}

Filters.propTypes = {
  devices: PropTypes.arrayOf(PropTypes.shape({
    brand: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
    os: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    custody: PropTypes.isRequired,
    available: PropTypes.bool.isRequired,
    active: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
  })).isRequired,
  brandFilter: PropTypes.array.isRequired,
  addBrandFilter: PropTypes.func.isRequired,
  removeBrandFilter: PropTypes.func.isRequired,
  officeFilter: PropTypes.array.isRequired,
  addOfficeFilter: PropTypes.func.isRequired,
  removeOfficeFilter: PropTypes.func.isRequired,
  showAvailable: PropTypes.bool.isRequired,
  showUnavailable: PropTypes.bool.isRequired,
  setShowUnavailable: PropTypes.func.isRequired,
  setShowAvailable: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  resetFilters: PropTypes.func.isRequired,
};
const mapStateToProps = state => {
  return {
    devices: state.devices.devices,
    brandFilter: state.devices.brandFilter,
    officeFilter: state.devices.officeFilter,
    showAvailable: state.devices.showAvailable,
    showUnavailable: state.devices.showUnavailable,
  };
};
export default connect(mapStateToProps, devicesActions)(withStyles(Styles)(Filters));