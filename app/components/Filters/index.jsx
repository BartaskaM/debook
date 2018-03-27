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

  renderBrandFilter(){
    const brands = [...new Set(this.props.devices.map(device => device.brand))]
      .map((brand, i) => <FormControlLabel key={i}
        control={
          <Checkbox
            checked={false}
            value={brand}
          />
        }
        label={brand}
      />);
    return brands;
  }
  render() {
    this.renderBrandFilter();
    return (
      <FormControl>
        <FormLabel >Brands</FormLabel>
        <FormGroup>
          {this.renderBrandFilter()}
        </FormGroup>
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
};
const mapStateToProps = state => {
  return {
    devices: state.devices.devices,
  };
};
export default connect(mapStateToProps,devicesActions)(Filters);