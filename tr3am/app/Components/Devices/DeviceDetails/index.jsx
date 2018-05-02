import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import Tooltip from 'material-ui/Tooltip';
import Flag from 'material-ui-icons/Flag';
import NavigateBefore from 'material-ui-icons/NavigateBefore';
import Add from 'material-ui-icons/Add';
import Remove from 'material-ui-icons/Remove';
import Done from 'material-ui-icons/Done';
import Clock from 'material-ui-icons/Schedule';
import Description from 'material-ui-icons/Description';

import ReservationsTable from 'Components/ReservationsTable';
import ReservationsCalendar from 'Components/ReservationsCalendar';
import ReserveModal from 'Components/ReserveModal';
import ReturnModal from 'Components/ReturnModal';
import BookModal from 'Components/BookModal';
import Row from './Row';
import { styles } from './Styles';
import LocationModal from 'Components/LocationModal';
import * as deviceDetailsActions from 'ActionCreators/deviceDetailsActions';
import * as devicesActions from 'ActionCreators/devicesActions';
import { reservationStatus } from 'Constants/Enums';
import * as deviceUtils from 'Utils/deviceUtils';

class DeviceDetails extends React.Component {
  constructor(props) {
    super(props);
    this.openLocationDialog = this.openLocationDialog.bind(this);
    this.openBookDialog = this.openBookDialog.bind(this);
    this.openReserveDialog = this.openReserveDialog.bind(this);
    this.openReservationDetails = this.openReservationDetails.bind(this);
    this.openReturnModal = this.openReturnModal.bind(this);
    this.handleBookClick = this.handleBookClick.bind(this);
    this.getBookButtonValues = this.getBookButtonValues.bind(this);

    this.state = {
      bookButtonValues: [],
    };
  }

  componentDidMount() {
    const id = parseInt(this.props.match.params.id);
    if (id) {
      this.props.getDeviceWithId(id);
      this.interval = setInterval(this.getBookButtonValues, 10000);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  static getDerivedStateFromProps(nextProps) {
    const { device } = nextProps;
    return { bookButtonValues: deviceUtils.formBookButtonValuesArray([device]) };
  }

  getBookButtonValues() {
    const { device } = this.props;
    this.setState({
      bookButtonValues: deviceUtils.formBookButtonValuesArray([device]),
    });
  }

  renderError() {
    return <div><h1>Something went WRONG. Please try again. </h1></div>;
  }

  openBookDialog(deviceId) {
    this.props.showBookModal(deviceId);
  }

  openReserveDialog(deviceId) {
    this.props.showReserveModal(deviceId);
  }

  openReservationDetails(reservation, deviceId) {
    const { from, to } = reservation;
    this.props.showReservationDetails(from, to, deviceId);
  }

  openReturnModal(deviceId){
    this.props.showReturnModal(deviceId);
  }

  handleBookClick(device) {
    const { checkIn, user } = this.props;
    return device.custody ?
      this.openReturnModal(device.id) :
      deviceUtils.canCheckIn(device.userReservation) ?
        checkIn({
          id: device.userReservation.id,
          userId: user.id,
          deviceId: device.id,
          from: device.userReservation.from,
          to: device.userReservation.to,
          status: reservationStatus.checkedIn,
        }, {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        }) :
        this.openBookDialog(device.id);
  }

  render() {
    const { classes, history, device } = this.props;
    const { bookButtonValues } = this.state;
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
                onClick={() => this.handleBookClick(device)}>
                {
                  bookButtonValues[device.id] === 'Return device' ?
                    <Remove className={classes.leftIcon} /> :
                    bookButtonValues[device.id] === 'Check-in' ?
                      <Done className={classes.leftIcon} /> :
                      <Add className={classes.leftIcon} />
                }
                {bookButtonValues[device.id]}
              </Button>
              <Button 
                variant="raised" 
                size="large" 
                color="primary" 
                className={classes.button}
                onClick={
                  device.userReservation ?
                    () => this.openReservationDetails(device.userReservation, device.id) :
                    () => this.openReserveDialog(device.id)}>
                {
                  device.userReservation ?
                    <Description className={classes.leftIcon}/> :
                    <Clock className={classes.leftIcon}/>
                }
                {device.userReservation ? 'Reservation details' : 'Reserve'}
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
          <BookModal/>
          <ReserveModal/>
          <ReturnModal/>
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
  showBookModal: PropTypes.func.isRequired,
  showReserveModal: PropTypes.func.isRequired,
  showReservationDetails: PropTypes.func.isRequired,
  showReturnModal: PropTypes.func.isRequired,
  checkIn: PropTypes.func.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    office: PropTypes.shape({
      id: PropTypes.number.isRequired,
      country: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
      address: PropTypes.string.isRequired,
    }).isRequired,
    slack: PropTypes.string,
  }),
};

const mapStateToProps = state => {
  return {
    device: state.deviceDetails.device,
    showLocationModal: state.deviceDetails.showLocationModal,
    user: state.auth.user,
  };
};

export default withRouter(
  connect(mapStateToProps, {...deviceDetailsActions, ...devicesActions})(
    withStyles(styles)(DeviceDetails)
  )
);
