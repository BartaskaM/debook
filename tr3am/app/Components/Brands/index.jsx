import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import List from 'material-ui/List';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { LinearProgress } from 'material-ui/Progress';

import Styles from './Styles';
import StylesUtils from 'Utils/StylesUtils';
import BrandsItem from './BrandsItem';
import * as brandsActions from 'ActionCreators/brandsActions';
import CreateBrandModal from './CreateBrandModal';

class BrandList extends React.Component {
  constructor(props) {
    super(props);
    this.openCreateBrandDialog = this.openCreateBrandDialog.bind(this);
  }

  componentDidMount() {
    this.props.fetchBrands();
  }

  openCreateBrandDialog() {
    this.props.showCreateBrandModal();
  }

  renderListHeader() {
    const { classes } = this.props;
    return (
      <Grid item xs={12}>
        <Paper className={classes.headerPaper}>
          <Typography variant='display1'>
            <Grid container className={classes.headerContainer}>
              <Grid item xs>Logo</Grid>
              <Grid item xs>Name</Grid>
              <Grid item xs>Model count</Grid>
            </Grid>
          </Typography>
        </Paper>
      </Grid>
    );
  }

  render() {
    const { classes, brands, fetchBrandsLoading } = this.props;
    return (
      <div className={classes.root}>
        <CreateBrandModal />
        <Grid container spacing={16}>
          {this.renderListHeader()}
          {fetchBrandsLoading ?
            <Grid item xs={12}>
              <LinearProgress />
            </Grid> :
            brands.length === 0 ?
              <div className={classes.noItems}>
                <Typography align="center" variant="display3">No devices found</Typography>
              </div>
              : <Grid container>
                <List className={classes.brandList}>
                  {brands.map(brand => (
                    <BrandsItem key={brand.id} brand={brand} />
                  ))}
                </List>
                <Grid item xs={12}>
                  <Button
                    variant="raised"
                    color="primary"
                    className={classes.addNewButton}
                    onClick={this.openCreateBrandDialog}
                  >
                  ADD NEW
                  </Button>
                </Grid>
              </Grid>}
        </Grid>
      </div>
    );
  }
}

BrandList.propTypes = {
  classes: PropTypes.object.isRequired,
  fetchBrands: PropTypes.func.isRequired,
  brands: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string,
    name: PropTypes.string.isRequired,
    models: PropTypes.array,
  })).isRequired,
  fetchBrandsLoading: PropTypes.bool.isRequired,
  showCreateBrandModal: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    brands: state.brands.brands,
    fetchBrandsLoading: state.brands.fetchBrandsLoading,
    fetchBrandsErrorMessage: state.brands.fetchBrandsErrorMessage,
  };
};

export default connect(mapStateToProps, brandsActions)(
  withStyles({ ...Styles, ...StylesUtils })(BrandList)
);