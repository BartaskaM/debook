import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import List from 'material-ui/List';
import Paper from 'material-ui/paper';
import Typography from 'material-ui/Typography';

import Styles from './Styles';
import StylesUtils from 'Utils/StylesUtils';
import BrandsItem from './BrandsItem';
import AllBrands from '../../Constants/BrandsList';

class BrandList extends React.Component {

  renderListHeader() {
    const { classes } = this.props;
    return (
      <Grid item xs={12}>
        <Paper className={classes.headerPaper}>
          <Typography variant='display1'>
            <Grid container>
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
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={16}>
          {this.renderListHeader()}
          <List className={classes.brandList}>
            {AllBrands.map(brands => (
              <BrandsItem key={brands.id} brand={brands} />
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

export default withStyles({ ...Styles, ...StylesUtils })(BrandList);