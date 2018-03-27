import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as devicesActions from '../../ActionCreators/devicesActions';
import {
  FormLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
} from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
class Filters extends React.Component{
  constructor(props){
    super(props);
    this.handleBrandChange = this.handleBrandChange.bind(this);
    this.handleOfficeChange = this.handleOfficeChange.bind(this);
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
    const brands = [...new Set(this.props.devices.map(device => device.brand))]
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
    const offices = [...new Set(this.props.devices.map(device => device.location))]
      .map((office, i) => <FormControlLabel key={i}
        control={
          <Checkbox
            onChange={() => this.handleOfficeChange(office)}
            checked={this.props.officeFilter.includes(office) ? true : false}
            value={office}
          />
        }
        label={office}
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

  render() {
    
    return (
      <FormControl>
        {this.renderBrandFilter()}
        {this.renderOfficeFilter()}
      </FormControl>
    );
  }
}

Filters.propTypes = {
  devices: PropTypes.arrayOf(PropTypes.shape({
    brand: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
    os: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    custody: PropTypes.string.isRequired,
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
};
const mapStateToProps = state => {
  return {
    devices: state.devices.devices,
    brandFilter: state.devices.brandFilter,
    officeFilter: state.devices.officeFilter,
  };
};
export default connect(mapStateToProps,devicesActions)(Filters);