import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

import Styles from './Styles';
import OfficeList from 'Constants/Offices';
import OfficeItem from './OfficeItem';

class Offices extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={16}>
          {OfficeList.map(office => (
            <OfficeItem key={office.id} office={office} />
          ))}
          <Grid item xs={12}>
            {/* TODO: Implement button functionality */}
            <Button variant="raised" color="primary" className={classes.addNewButton}>
              ADD NEW
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Offices.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(Styles)(Offices);