import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Input from 'material-ui/Input';
import Button from 'material-ui/Button';
import NavigateBefore from 'material-ui-icons/NavigateBefore';
import Divider from 'material-ui/Divider';
import { LinearProgress } from 'material-ui/Progress';

import Styles from './Styles';
import * as RouteRoles from 'Constants/RouteRoles';
import * as officeDetailsActions from 'ActionCreators/officeDetailsActions';
import Map from './Map';

class OfficeDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      country: null,
      city: null,
      address: null,
      lat: null,
      lng: null,

      isEditMode: false,
    };

    this.saveEditedDetails = this.saveEditedDetails.bind(this);
  }

  componentDidMount() {
    this.props.fetchOfficeWithId(parseInt(this.props.match.params.id));
  }

  static getDerivedStateFromProps(nextProps) {
    return {
      ...nextProps.office,
      isEditMode: false,
    };
  }

  resetStateFromProps() {
    this.setState({ ...this.props.office });
  }

  saveEditedDetails() {
    const editedOffice = {
      id: this.props.office.id,
      country: this.state.country,
      city: this.state.city,
      address: this.state.address,
      lat: this.state.lat,
      lng: this.state.lng,
    };

    this.props.updateOfficeWithId(editedOffice);

    this.setState({ isEditMode: false });
  }

  renderInformation() {
    const { classes, userRole, office } = this.props;

    return (
      <Paper className={classes.officeLocationInfo}>
        <Typography
          variant='display2'><b>Country:</b> {office.country}</Typography>
        <br />
        <Typography
          variant='display2'><b>City:</b> {office.city}</Typography>
        <br />
        <Typography
          variant='display2'><b>Address:</b> {office.address}</Typography>
        <br />
        {RouteRoles.Offices.includes(userRole) &&
          <div>
            <Typography
              variant='display2'><b>LAT:</b> {office.lat}</Typography>
            <br />
          </div>
        }
        {RouteRoles.Offices.includes(userRole) &&
          <div>
            <Typography
              variant='display2'><b>LNG:</b> {office.lng}</Typography>
            <br />
          </div>
        }

        {this.renderButtons()}
      </Paper>
    );
  }

  renderInformationEditable() {
    const { classes } = this.props;
    return (
      <Paper className={classes.officeLocationInfo}>
        <Typography
          variant='display2'
          className={classes.inlineBlock}
        >
          <b>Country:</b>
        </Typography>
        <Input
          value={this.state.country}
          className={classes.inputField}
          onChange={(e) => this.setState({ country: e.target.value })}
          inputProps={{
            type: 'text',
            name: 'country',
            maxLength: '255',
            required: 'required',
          }}
        />
        <br />
        <Typography
          variant='display2'
          className={classes.inlineBlock}
        >
          <b>City:</b>
        </Typography>
        <Input
          value={this.state.city}
          className={classes.inputField}
          onChange={(e) => this.setState({ city: e.target.value })}
          inputProps={{
            type: 'text',
            name: 'city',
            maxLength: '255',
            required: 'required',
          }}
        />
        <br />
        <Typography
          variant='display2'
          className={classes.inlineBlock}
        >
          <b>Address:</b>
        </Typography>
        <Input
          value={this.state.address}
          className={classes.inputField}
          onChange={(e) => this.setState({ address: e.target.value })}
          inputProps={{
            type: 'text',
            name: 'address',
            maxLength: '255',
            required: 'required',
          }}
        />
        <br />
        <Typography
          variant='display2'
          className={classes.inlineBlock}
        >
          <b>LAT:</b>
        </Typography>
        <Input
          value={this.state.lat}
          className={classes.inputField}
          onChange={(e) => this.setState({ lat: e.target.value })}
          inputProps={{
            type: 'number',
            name: 'lat',
            maxLength: '12',
            required: 'required',
          }}
        />
        <br />
        <Typography
          variant='display2'
          className={classes.inlineBlock}
        >
          <b>LNG:</b>
        </Typography>
        <Input
          value={this.state.lng}
          className={classes.inputField}
          onChange={(e) => this.setState({ lng: e.target.value })}
          inputProps={{
            type: 'number',
            name: 'lng',
            maxLength: '12',
            required: 'required',
          }}
        />
        <br />

        {this.renderButtons()}
      </Paper>
    );
  }

  renderButtons() {
    const { classes, userRole } = this.props;

    return RouteRoles.Offices.includes(userRole) ? this.state.isEditMode ? (
      <span>
        <Button variant="raised"
          color="secondary"
          className={classes.cancelButton}
          onClick={() => {
            this.resetStateFromProps();
            this.setState({ isEditMode: false });
          }}
        >
          CANCEL
        </Button>
        <Button variant="raised"
          color="primary"
          className={classes.editButton}
          onClick={this.saveEditedDetails}
        >
          SAVE
        </Button>
      </span>
    ) :
      (
        <span>
          <Button variant="raised"
            color="primary"
            className={classes.editButton}
            onClick={() => this.setState({ isEditMode: true })}
          >
            EDIT
          </Button>
        </span>
      ) : '';
  }

  render() {
    const { classes, history, office, match, fetchOfficeLoading } = this.props;
    return office && office.id === parseInt(match.params.id) ? (
      <div className={classes.root}>
        <Button variant="flat" onClick={history.goBack}>
          <NavigateBefore />
          <span className={classes.bigFont} >Back</span>
        </Button>
        <Divider className={classes.divider} />

        <Grid container spacing={16} justify='center' className={classes.officedetailsContainer}>
          {fetchOfficeLoading ?
            <Grid item xs={12}>
              <LinearProgress />
            </Grid>
            : <Grid container>
              <Grid item xs={6}>
                {this.state.isEditMode ?
                  this.renderInformationEditable() :
                  this.renderInformation()}
              </Grid>
              <Grid item xs={6}>
                <Paper className={classes.mapElement}>
                  <Map
                    lat={office.lat}
                    lng={office.lng}
                    googleMapURL={`https://maps.googleapis.com/
                      maps/api/js?key=AIzaSyD0S0xJVDjm1DrDafpWq6I2ThweGVvcTuA
                      &v=3.exp&libraries=geometry,drawing,places`}
                    loadingElement={<div style={{ height: '100%' }} />}
                    containerElement={<div style={{ height: 400 }} />}
                    mapElement={<div style={{ height: '100%' }} />}
                  />
                </Paper>
              </Grid>
            </Grid>}
        </Grid>
      </div>
    ) : '';
  }
}

OfficeDetails.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  userRole: PropTypes.string.isRequired,
  fetchOfficeWithId: PropTypes.func.isRequired,
  updateOfficeWithId: PropTypes.func.isRequired,
  office: PropTypes.shape({
    id: PropTypes.number,
    country: PropTypes.string,
    city: PropTypes.string,
    address: PropTypes.string,
    lat: PropTypes.number,
    lng: PropTypes.number,
  }),
  fetchOfficeLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => {
  return {
    userRole: state.auth.user.role,
    office: state.officeDetails.office,
    fetchOfficeLoading: state.officeDetails.fetchOfficeLoading,
    updateOfficeLoading: state.officeDetails.updateOfficeLoading,
  };
};

export default withRouter(
  connect(mapStateToProps, officeDetailsActions)(
    withStyles(Styles)(OfficeDetails)
  )
);