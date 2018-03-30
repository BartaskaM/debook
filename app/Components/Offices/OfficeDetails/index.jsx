import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import { withRouter } from 'react-router-dom';

import Styles from './Styles';
import Map from './Map';
import Offices from 'Constants/Offices';

class OfficeDetails extends React.Component {
  render() {
    const office = Offices.find(office => office.id == this.props.match.params.id);
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={16} justify='center'>
          <Grid item xs={5}>
            <Paper className={classes.officeLocationInfo}>
              <Typography variant='display2'><b>Country:</b> {office.country}</Typography>
              <br />
              <Typography variant='display2'><b>City:</b> {office.city}</Typography>
              <br />
              <Typography variant='display2'><b>Address:</b> {office.address}</Typography>
              <br />
              <span>
                <Button variant="raised"
                  color="secondary"
                  className={classes.backButton}
                  onClick={() => this.props.history.push('/offices')}
                >
                  BACK TO LIST
                </Button>
                {/* TODO: Implement button functionality */}
                <Button variant="raised" color="primary" className={classes.editButton}>
                  EDIT
                </Button>
              </span>
            </Paper>
          </Grid>
          <Grid item xs={5}>
            <Paper className={classes.mapElement}>
              <Map
                lat={office.lat}
                lng={office.lng}
                googleMapURL={'https://maps.googleapis.com/' +
                  'maps/api/js?v=3.exp&libraries=geometry,drawing,places'}
                loadingElement={<div style={{ height: '100%' }} />}
                containerElement={<div style={{ height: 400 }} />}
                mapElement={<div style={{ height: '100%' }} />}
              />
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

OfficeDetails.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(Styles)(withRouter(OfficeDetails));