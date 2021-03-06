import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
import Divider from 'material-ui/Divider';
import { LinearProgress } from 'material-ui/Progress';

import Styles from './Styles';
import * as devicesActions from 'ActionCreators/devicesActions';

class Filters extends React.Component{
  constructor(props){
    super(props);
    this.handleBrandChange = this.handleBrandChange.bind(this);
    this.handleOfficeChange = this.handleOfficeChange.bind(this);
  }

  componentDidMount(){
    const { setShowAvailable, addOfficeFilter, user } = this.props;
    setShowAvailable(true);
    addOfficeFilter(user.office.id);
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
    const { classes, brandFilter, brands } = this.props;
    const brandItems = brands
      .map((brand, i) => 
        <ListItem button dense key={i}
          classes={{gutters: classes.itemPadding}}
          onClick={() => this.handleBrandChange(brand.id)}>
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                checked={brandFilter.includes(brand.id) ? true : false}
                value={brand.id.toString()}
              />
            }
          />
          <Typography className={classes.itemText}>{brand.name}</Typography>
        </ListItem>);
    return (
      <div>
        <FormLabel className={classes.groupName}>Brands</FormLabel>
        <FormGroup >
          {brandItems}
        </FormGroup>
      </div>
    );
  }

  renderOfficeFilter(){
    const { classes, officeFilter, offices } = this.props;
    const officeItems = offices
      .map((office) => 
        <ListItem button dense key={office.id}
          classes={{gutters: classes.itemPadding}}
          onClick={() => this.handleOfficeChange(office.id)}>
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                checked={officeFilter.includes(office.id) ? true : false}
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
          {officeItems}
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
                  color="primary"
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
                  color="primary"
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
    const { classes, resetFilters, fetchingDevices, fetchBrandsLoading } = this.props;
    return (
      <Drawer variant="permanent" className={classes.root} classes={{paper: classes.drawerPaper}}>
        <div className={classes.toolbar} />
        { (fetchingDevices || fetchBrandsLoading) && <LinearProgress/> }
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
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    office: PropTypes.shape({
      id: PropTypes.number.isRequired,
      city: PropTypes.string.isRequired,
    }).isRequired,
    slack: PropTypes.string,
  }),
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
    name: PropTypes.string.isRequired,
  })).isRequired,
  fetchBrandsLoading: PropTypes.bool.isRequired,
  fetchingDevices: PropTypes.bool.isRequired,
};
const mapStateToProps = state => {
  return {
    brandFilter: state.devices.brandFilter,
    officeFilter: state.devices.officeFilter,
    showAvailable: state.devices.showAvailable,
    showUnavailable: state.devices.showUnavailable,
    offices: state.offices.offices,
    user: state.auth.user,
    brands: state.devices.brands,
    fetchingDevices: state.devices.fetchingDevices,
    fetchBrandsLoading: state.devices.fetchBrandsLoading,
  };
};
export default connect(mapStateToProps, devicesActions)(withStyles(Styles)(Filters));