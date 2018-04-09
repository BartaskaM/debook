import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Plus from 'material-ui-icons/Add';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import Tooltip from 'material-ui/Tooltip';
import Flag from 'material-ui-icons/Flag';
import NavigateBefore from 'material-ui-icons/NavigateBefore';

import ReservationsTable from 'Components/ReservationsTable';
import ReservationsCalendar from 'Components/ReservationsCalendar';
import Row from './Row';
import { styles } from './Styles';
import LocationModal from 'Components/LocationModal';
import * as deviceDetailsActions from 'ActionCreators/deviceDetailsActions';
import * as devicesActions from 'ActionCreators/devicesActions';

class DeviceDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      device: null,
    };
    this.handleEditClick = this.handleCheckClick.bind(this);
    this.getParsedDate = this.getParsedDate.bind(this);
    this.renderError = this.renderError.bind(this);
    this.openLocationDialog = this.openLocationDialog.bind(this);
    this.handler = this.handler.bind(this);
  }
  componentDidMount() {
    const id = parseInt(this.props.match.params.id);
    if (id) {
      this.props.getDeviceWithId(id);
      this.props.setSelectedDevice(id);
    }
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.device != prevState.device) {
      return { device: nextProps.device };
    }
    return { device: null };
  }
  renderError() {
    return <div><h1>Something went WRONG. Please try again. </h1></div>;
  }
  getParsedDate() {
    const currentDate = new Date(),
      currentMonth = currentDate.getMonth() < 9 ? '-0' + (currentDate.getMonth() + 1) :
        '-' + (currentDate.getMonth() + 1),
      currentDay = currentDate.getDate() < 10 ? '-0' + currentDate.getDate() :
        '-' + currentDate.getDate(),
      date = currentDate.getFullYear() + currentMonth + currentDay;

    return date;
  }
  handleCheckClick() {
    const device = this.state.device;
    if (device.custody.length === 0) {
      this.open(device.id);
    } else {
      //Handle device return
      device.available = !device.available;
      device.custody = 'New guy';
      device.booked_from = this.getParsedDate();
    }
    this.setState({ device });
  }

  render() {
    const { classes, history } = this.props;
    return (
      this.state.device ?
        <div className={classes.root}>
          <Button variant="flat" onClick={history.goBack}>
            <NavigateBefore />
            <span className={classes.bigFont} >Back</span>
          </Button>
          <Divider className={classes.divider} />
          <LocationModal active={this.handler} />
          <Grid container spacing={8}>
            <Grid item md>
              <img
                className={classes.image}
                src={this.state.device.image}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Paper className={classes.table}>
                <Grid container className={classes.table}>
                  <Grid item md={11}>
                    <Typography className={classes.title} variant="display3" align="left">
                      {this.state.device.name}
                    </Typography>
                  </Grid>
                  <Grid item md={11} xs={11} className={classes.custody}>
                    <Grid container item>
                      <Grid item md={2} className={classes.label}>Custody of:</Grid>
                      <Grid item md={9}>{this.state.device.custody}
                        <Tooltip
                          id="tooltip-bottom"
                          enterDelay={100}
                          leaveDelay={5000}
                          title="Request custody update"
                          placement="bottom">
                          <Flag style={{ color: 'red' }} />
                        </Tooltip>
                      </Grid>
                    </Grid>
                    <Row
                      label="Booked from"
                      value={this.state.device.booked_from} />
                  </Grid>
                  <Grid item md={11} xs={11}>
                    <Divider className={classes.divider} />
                    <Typography className={classes.title} variant="display1" align="left">
                      ITEM DETAILS
                    </Typography>
                    <Divider className={classes.divider} />
                  </Grid>
                  <Row
                    label="ID#"
                    value={this.state.device.identification_num} />
                  <Row
                    label="Serial number"
                    value={this.state.device.serial_num} />
                  <Row
                    label="OS"
                    value={this.state.device.os} />
                  <Row
                    label="Group"
                    value={this.state.device.group} />
                  <Row
                    label="Subgroup"
                    value={this.state.device.subgroup} />
                  <Row
                    label="Description"
                    value={this.state.device.description} />
                  <Row
                    label="Check-in due"
                    value={this.state.device.check_in_due} />
                  <Row
                    label="Location"
                    value={this.state.device.location} />
                  <Row
                    label="Purchased on:"
                    value={this.state.device.purchased} />
                  <Row
                    label="Vendor"
                    value={this.state.device.vendor} />
                  <Row
                    label="Tax rate"
                    value={this.state.device.tax_rate} />
                </Grid>
              </Paper>
            </Grid>
            <Grid item md={3}
              className={classes.table}
              container
              direction='column'
            >
              <Button
                variant='raised'
                size='large'
                disabled={
                  this.state.device.available ? false : true
                }
                className={classes.button}
                color={this.state.device.available ? 'primary' : 'secondary'}
                onClick={() => this.handleCheckClick()}>
                <Plus />
                {this.state.device.available ?
                  'Book device' :
                  'Device is booked'}
              </Button>
              <Button variant="raised" size="large" color="primary" className={classes.button}>
                RESERVATION
              </Button>
              <Button
                variant="raised"
                size="large"
                color="secondary"
                className={classes.button}
                onClick={() => this.openLocationDialog(this.state.device.id)}>
                CHANGE LOCATION
              </Button>
              <Paper className={classes.reservationsRoot}>
                <ReservationsCalendar/>
                <ReservationsTable/>
              </Paper>
            </Grid>
          </Grid>
        </div>
        : this.renderError()
    );
  }
  openLocationDialog(deviceDetailsId) {
    this.props.showLocationModal(deviceDetailsId);
  }
  handler() {
    this.setState({
      device: this.props.device,
    });
  }
}

DeviceDetails.propTypes = {
  classes: PropTypes.object.isRequired,
  getDeviceWithId: PropTypes.func.isRequired,
  showLocationModal: PropTypes.func.isRequired,
  device: PropTypes.shape({
    location: PropTypes.string,
    custody: PropTypes.string,
    available: PropTypes.bool,
    active: PropTypes.bool,
    id: PropTypes.number,
    image: PropTypes.string,
    name: PropTypes.string,
    custody_of: PropTypes.string,
    booked_from: PropTypes.string,
    identification_num: PropTypes.string,
    serial_num: PropTypes.string,
    os: PropTypes.string,
    group: PropTypes.string,
    subgroup: PropTypes.string,
    description: PropTypes.string,
    check_in_due: PropTypes.string,
    purchased: PropTypes.string,
    vendor: PropTypes.string,
    tax_rate: PropTypes.string,
  }),
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  setSelectedDevice: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    device: state.deviceDetails.device,
  };
};

export default withRouter(
  connect(mapStateToProps, {...deviceDetailsActions, ...devicesActions})(
    withStyles(styles)(DeviceDetails)
  )
);
