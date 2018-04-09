import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import { withRouter } from 'react-router-dom';
import { ListItem } from 'material-ui/List';

import Styles from './Styles';

const BrandsItem = ({ classes, brand}) => {
  return (
    <Grid item xs={12}>
      <ListItem>
        <Paper className={classes.brandPaper}>
          <Typography variant='display1'>
            <Grid container>
              <Grid item xs><img className={classes.brandLogo} src={brand.image}/></Grid>
              <Grid item xs>{brand.brand}</Grid>
              <Grid item xs>{brand.modelCount}</Grid>  
            </Grid>
          </Typography>
        </Paper>
      </ListItem>
    </Grid>
  );
};

BrandsItem.propTypes = {
  classes: PropTypes.object.isRequired,
  brand: PropTypes.shape({
    image: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    brand: PropTypes.string.isRequired,
    modelCount: PropTypes.number.isRequired,
  }).isRequired,
};

export default withStyles(Styles)(withRouter(BrandsItem));