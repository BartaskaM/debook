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

class DeviceDetails extends React.Component {
  constructor(props) {
    super(props);
    this.handleEditClick = this.handleCheckClick.bind(this);
    this.getParsedDate = this.getParsedDate.bind(this);
    this.renderError = this.renderError.bind(this);
    this.openLocationDialog = this.openLocationDialog.bind(this);
  }
  componentDidMount() {
    const id = parseInt(this.props.match.params.id);
    if (id) {
      this.props.getDeviceWithId(id);
    }
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
    const { 
      device,
      changeDevice,
    } = this.props;
    if (device.custody.length === 0) {
      this.open(device.id);
    } else {
      //Handle device return
      device.available = !device.available;
      device.custody = 'New guy';
      device.bookedFrom = this.getParsedDate();
      changeDevice(device);
    }
  }

  render() {
    const { classes, history, device } = this.props;
    return (
      device ?
        <div className={classes.root}>
          <Button variant="flat" onClick={history.goBack}>
            <NavigateBefore />
            <span className={classes.bigFont} >Back</span>
          </Button>
          <Divider className={classes.divider} />
          <LocationModal />
          <Grid container spacing={8}>
            <Grid item md>
              <img
                className={classes.image}
                src={device.image}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Paper className={classes.table}>
                <Grid container className={classes.table}>
                  <Grid item md={11}>
                    <Typography className={classes.title} variant="display3" align="left">
                      {device.name}
                    </Typography>
                  </Grid>
                  <Grid item md={11} xs={11} className={classes.custody}>
                    <Grid container item>
                      <Grid item md={2} className={classes.label}>Custody of:</Grid>
                      <Grid item md={9}>{device.custody}
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
                      value={device.bookedFrom} />
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
                    value={device.identificationNum} />
                  <Row
                    label="Serial number"
                    value={device.serialNum} />
                  <Row
                    label="OS"
                    value={device.os} />
                  <Row
                    label="Group"
                    value={device.group} />
                  <Row
                    label="Subgroup"
                    value={device.subgroup} />
                  <Row
                    label="Description"
                    value={device.description} />
                  <Row
                    label="Check-in due"
                    value={device.checkInDue} />
                  <Row
                    label="Location"
                    value={device.location} />
                  <Row
                    label="Purchased on:"
                    value={device.purchased} />
                  <Row
                    label="Vendor"
                    value={device.vendor} />
                  <Row
                    label="Tax rate"
                    value={device.taxRate} />
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
                  device.available ? false : true
                }
                className={classes.button}
                color={device.available ? 'primary' : 'secondary'}
                onClick={() => this.handleCheckClick()}>
                <Plus />
                {device.available ?
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
                onClick={this.openLocationDialog}>
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
  openLocationDialog() {
    this.props.showLocationModal();
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
    custodyOf: PropTypes.string,
    bookedFrom: PropTypes.string,
    identificationNum: PropTypes.string,
    serialNum: PropTypes.string,
    os: PropTypes.string,
    group: PropTypes.string,
    subgroup: PropTypes.string,
    description: PropTypes.string,
    checkInDue: PropTypes.string,
    purchased: PropTypes.string,
    vendor: PropTypes.string,
    taxRate: PropTypes.string,
  }),
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  changeDevice: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    device: state.deviceDetails.device,
    showLocationModal: state.deviceDetails.showLocationModal,
  };
};

export default withRouter(
  connect(mapStateToProps, {...deviceDetailsActions})(
    withStyles(styles)(DeviceDetails)
  )
);
