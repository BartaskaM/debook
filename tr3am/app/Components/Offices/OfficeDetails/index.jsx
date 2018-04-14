import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import NavigateBefore from 'material-ui-icons/NavigateBefore';
import Divider from 'material-ui/Divider';

import Styles from './Styles';
import * as RouteRoles from 'Constants/RouteRoles';
import * as officeDetailsActions from 'ActionCreators/officeDetailsActions';
import Map from './Map';

class OfficeDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      office: null,
    };
  }

  componentDidMount() {
    this.props.getOfficeWithId(this.props.match.params.id);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.office != prevState.office) {
      return { office: nextProps.office };
    }

    return { office: null };
  }

  render() {
    const { classes, history, user } = this.props;
    return this.state.office ? (
      <div className={classes.root}>
        <Button variant="flat" onClick={history.goBack}>
          <NavigateBefore />
          <span className={classes.bigFont} >Back</span>
        </Button>
        <Divider className={classes.divider} />

        <Grid container spacing={16} justify='center' className={classes.officedetailsContainer}>
          <Grid item xs={6}>
            <Paper className={classes.officeLocationInfo}>
              <Typography
                variant='display2'><b>Country:</b> {this.state.office.country}</Typography>
              <br />
              <Typography
                variant='display2'><b>City:</b> {this.state.office.city}</Typography>
              <br />
              <Typography
                variant='display2'><b>Address:</b> {this.state.office.address}</Typography>
              <br />
              {RouteRoles.Offices.includes(user.role) &&
                <div>
                  <Typography
                    variant='display2'><b>LAT:</b> {this.state.office.lat}</Typography>
                  <br />
                </div>
              }
              {RouteRoles.Offices.includes(user.role) &&
                <div>
                  <Typography
                    variant='display2'><b>LNG:</b> {this.state.office.lng}</Typography>
                  <br />
                </div>
              }
              <span>
                {/* TODO: Implement button functionality */}
                <Button variant="raised" color="primary" className={classes.editButton}>
                  EDIT
                </Button>
              </span>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.mapElement}>
              <Map
                lat={this.state.office.lat}
                lng={this.state.office.lng}
                googleMapURL={'https://maps.googleapis.com/' +
                  'maps/api/js?key=AIzaSyD0S0xJVDjm1DrDafpWq6I2ThweGVvcTuA' +
                  '&v=3.exp&libraries=geometry,drawing,places'}
                loadingElement={<div style={{ height: '100%' }} />}
                containerElement={<div style={{ height: 400 }} />}
                mapElement={<div style={{ height: '100%' }} />}
              />
            </Paper>
          </Grid>
        </Grid>
      </div>
    ) : '';
  }
}

OfficeDetails.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  getOfficeWithId: PropTypes.func.isRequired,
  office: PropTypes.shape({
    id: PropTypes.number,
    country: PropTypes.string,
    city: PropTypes.string,
    address: PropTypes.string,
    lat: PropTypes.number,
    lng: PropTypes.number,
  }),
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    office: state.officeDetails.office,
  };
};

export default withRouter(
  connect(mapStateToProps, officeDetailsActions)(
    withStyles(Styles)(OfficeDetails)
  )
);