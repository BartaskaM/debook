import React from 'react';
import PropTypes from 'prop-types';
import {Grid, Button, List} from 'material-ui';
import { withStyles } from 'material-ui/styles';

import Styles from './Styles';
import BrandsItem from './BrandsItem';
import AllBrands from '../../Constants/BrandsList';

class BrandList extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={16}>
          <List className={classes.brandList}>
            {AllBrands.map(brands => (
              <BrandsItem key={brands.id} brand={brands}/>
            ))}
          </List>
        </Grid>
        <Button variant="raised" color="primary" className={classes.addNewButton}>
              ADD NEW
        </Button>
      </div>
    );
  }
}
BrandList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(Styles)(BrandList);