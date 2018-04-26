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
import Typography from 'material-ui/Typography';
import { ListItem } from 'material-ui/List';
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
    const { brandFilter, addBrandFilter, removeBrandFilter } = this.props;
    const indexOfBrand = brandFilter.indexOf(brand);
    if(indexOfBrand === -1){
      addBrandFilter(brand);
    }
    else{
      removeBrandFilter(indexOfBrand);
    }
  }

  handleOfficeChange(office){
    const { officeFilter, addOfficeFilter, removeOfficeFilter } = this.props;
    const indexOfOffice = officeFilter.indexOf(office);
    if(indexOfOffice === -1){
      addOfficeFilter(office);
    }
    else{
      removeOfficeFilter(indexOfOffice);
    }
  }

  renderBrandFilter(){
    const { classes, brandFilter } = this.props;
    const brands = Brands
      .map((brand, i) => 
        <ListItem button dense key={i}
          classes={{gutters: classes.itemPadding}}
          onClick={() => this.handleBrandChange(brand)}>
          <FormControlLabel
            control={
              <Checkbox
                checked={brandFilter.includes(brand) ? true : false}
                value={brand}
              />
            }
          />
          <Typography className={classes.itemText}>{brand}</Typography>
        </ListItem>);
    return (
      <div>
        <FormLabel className={classes.groupName}>Brands</FormLabel>
        <FormGroup >
          {brands}
        </FormGroup>
      </div>
    );
  }

  renderOfficeFilter(){
    const { classes, officeFilter } = this.props;
    const offices = Offices
      .map((office, i) => 
        <ListItem button dense key={i}
          classes={{gutters: classes.itemPadding}}
          onClick={() => this.handleOfficeChange(office.city)}>
          <FormControlLabel
            control={
              <Checkbox
                checked={officeFilter.includes(office.city) ? true : false}
              />
            }
          />
          <Typography className={classes.itemText}>{office.city}</Typography>
        </ListItem>
      );
    return (
      <div>
        <FormLabel className={classes.groupName}>Offices</FormLabel>
        <FormGroup>
          {offices}
        </FormGroup>
      </div>
    );
  }

  renderAvailabilityFilter(){
    const {
      classes,
      setShowAvailable,
      showAvailable,
      setShowUnavailable,
      showUnavailable,
    } = this.props;
    return (
      <div>
        <FormLabel className={classes.groupName}>Availability</FormLabel>
        <FormGroup>
          <ListItem button dense
            classes={{gutters: classes.itemPadding}}
            onClick={() => setShowAvailable(!showAvailable)}>
            <FormControlLabel 
              control={
                <Checkbox
                  checked={showAvailable}
                />
              }
            />
            <Typography className={classes.itemText}>Available</Typography>
          </ListItem>
          <ListItem button dense
            classes={{gutters: classes.itemPadding}}
            onClick={() => setShowUnavailable(!showUnavailable)}>
            <FormControlLabel 
              control={
                <Checkbox
                  checked={showUnavailable}
                />
              }
            />
            <Typography className={classes.itemText}>Unavailable</Typography>
          </ListItem>
        </FormGroup>
      </div>
    );
  }

  render() {
    const { classes, resetFilters } = this.props;
    return (
      <Drawer variant="permanent" className={classes.root} classes={{paper: classes.drawerPaper}}>
        <div className={classes.toolbar} />
        <FormControl className={classes.toolbar}>
          <Button
            classes={{label: classes.textSize}}
            variant='raised'
            className={classes.button}
            onClick={() => resetFilters()}>
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
    custody: PropTypes.number,
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