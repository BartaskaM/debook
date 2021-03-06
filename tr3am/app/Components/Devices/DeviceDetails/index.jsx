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
import { LinearProgress } from 'material-ui/Progress';

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
import { fetchOffices } from 'ActionCreators/officesActions';
import { reservationStatus } from 'Constants/Enums';
import * as deviceUtils from 'Utils/deviceUtils';
import ConfirmationModal from 'Components/ConfirmationModal';

class DeviceDetails extends React.Component {
  constructor(props) {
    super(props);
    this.openLocationDialog = this.openLocationDialog.bind(this);
    this.openBookDialog = this.openBookDialog.bind(this);
    this.openReserveDialog = this.openReserveDialog.bind(this);
    this.openReservationDetails = this.openReservationDetails.bind(this);
    this.openReturnModal = this.openReturnModal.bind(this);
    this.handleBookClick = this.handleBookClick.bind(this);
    this.getBookButtonValue = this.getBookButtonValue.bind(this);
    this.openOfficeInfo = this.openUserInfo.bind(this);
    this.openUserInfo = this.openUserInfo.bind(this);
    this.deleteDeviceConfirmed = this.deleteDeviceConfirmed.bind(this);
    this.closeConfirmationDialog = this.closeConfirmationDialog.bind(this);

    this.state = {
      bookButtonValue: null,
      showConfirmationDialog: false,
    };
  }

  componentDidMount() {
    const { match, fetchDeviceWithId, user, history, fetchOffices } = this.props;
    const id = parseInt(match.params.id);
    if (id) {
      fetchDeviceWithId(id, user.id, history);
      fetchOffices();
      this.interval = setInterval(this.getBookButtonValue, 10000);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    this.props.resetDevice();
  }

  static getDerivedStateFromProps(nextProps) {
    const { device, removeReservationFromDevice } = nextProps;
    return {
      bookButtonValue: device ? deviceUtils.getBookButtonValue(
        device,
        removeReservationFromDevice
      ) : null,
    };
  }

  getBookButtonValue() {
    const { device, removeReservationFromDevice } = this.props;
    this.setState({
      bookButtonValue: device ? deviceUtils.getBookButtonValue(
        device,
        removeReservationFromDevice
      ) : null,
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

  openReturnModal(deviceId) {
    this.props.showReturnModal(deviceId);
  }

  deleteDeviceConfirmed() {
    const { match, history, deleteDevice } = this.props;
    const id = parseInt(match.params.id);

    deleteDevice(id, history);
    this.setState({ showConfirmationDialog: false });
  }

  closeConfirmationDialog() {
    this.setState({ showConfirmationDialog: false });
  }

  handleBookClick(device) {
    const { checkIn, user, removeReservationFromDevice } = this.props;
    return device.custody ?
      this.openReturnModal(device.id) :
      deviceUtils.canCheckIn(device.userReservation, () => removeReservationFromDevice(device.id)) ?
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

  openOfficeInfo(officeId) {
    return () => {
      this.props.history.push(`/offices/${officeId}`);
    };
  }

  openUserInfo(userId) {
    return () => {
      this.props.history.push(`/users/${userId}`);
    };
  }

  render() {
    const {
      classes,
      user,
      history,
      device,
      fetchDeviceLoading,
    } = this.props;
    const { bookButtonValue } = this.state;
    return (
      (device && !fetchDeviceLoading) ?
        <div className={classes.root}>
          <Button variant="flat" onClick={history.goBack}>
            <NavigateBefore />
            <span className={classes.bigFont} >Back</span>
          </Button>
          <Divider className={classes.divider} />
          <LocationModal />
          <Grid container>
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
                      {`${device.brand.name} ${device.model.name}`}
                    </Typography>
                  </Grid>
                  <Grid container item xs={12} className={classes.custody} alignItems='center'>
                    <Grid item md={2} className={classes.label}>Custody of:</Grid>
                    <Grid item md={9}
                      onClick={device.custody ? this.openUserInfo(device.custody.id) : undefined}>
                      {device.custody ?
                        `${device.custody.firstName} ${device.custody.lastName}` : '-'}
                      {device.custody && <Tooltip
                        id="tooltip-bottom"
                        enterDelay={100}
                        leaveDelay={5000}
                        title="Request custody update"
                        placement="bottom">
                        <Flag style={{ color: 'red' }} />
                      </Tooltip>}
                    </Grid>
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
                    value={device.identificationNum.toString()} />
                  <Row
                    label="Serial number"
                    value={device.serialNum} />
                  <Row
                    label="OS"
                    value={device.os} />
                  <Row
                    label="Brand"
                    value={device.brand.name} />
                  <Row
                    label="Model"
                    value={device.model.name} />
                  <Row
                    label="Location"
                    value={device.location.city}
                    onClick={this.openOfficeInfo(device.location.id)} />
                  <Row
                    label="Purchased on:"
                    value={
                      `${device.purchased.toLocaleDateString()}, 
                      ${device.purchased.toLocaleTimeString([],
        { hour: '2-digit', minute: '2-digit' })}`
                    } />
                  <Row
                    label="Vendor"
                    value={device.vendor} />
                  <Row
                    label="Tax rate"
                    value={`${device.taxRate} %`} />
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
                  device.available ? false : device.userBooking ? false : true
                }
                className={classes.button}
                color={device.available ? 'primary' : 'secondary'}
                onClick={() => this.handleBookClick(device)}>
                {
                  bookButtonValue === 'Return device' ?
                    <Remove className={classes.leftIcon} /> :
                    bookButtonValue === 'Check-in' ?
                      <Done className={classes.leftIcon} /> :
                      <Add className={classes.leftIcon} />
                }
                {bookButtonValue}
              </Button>
              <Button
                variant="raised"
                size="large"
                className={classes.button}
                onClick={
                  device.userReservation ?
                    () => this.openReservationDetails(device.userReservation, device.id) :
                    () => this.openReserveDialog(device.id)}>
                {
                  device.userReservation ?
                    <Description className={classes.leftIcon} /> :
                    <Clock className={classes.leftIcon} />
                }
                {device.userReservation ? 'Reservation details' : 'Reserve'}
              </Button>
              <Button
                disabled={!device.available}
                variant="raised"
                size="large"
                className={classes.button}
                onClick={this.openLocationDialog}>
                CHANGE LOCATION
              </Button>
              <Divider className={classes.adminButtonDivider} />
              {user.roles.includes('admin') &&
                <div>
                  <Button
                    variant="raised"
                    size="large"
                    className={classes.editButton}
                    onClick={() => history.push(`/editDevice/${device.id}`)}>
                    EDIT
                  </Button>
                  {/* TODO: Implement deletion */}
                  <Button
                    variant="raised"
                    size="large"
                    className={classes.deleteButton}
                    onClick={() => this.setState({ showConfirmationDialog: true })}>
                    DELETE
                  </Button>
                </div>
              }
              <Paper className={classes.reservationsRoot}>
                <Grid container>
                  <Grid item xs={12}>
                    <ReservationsCalendar styles={classes.calendar} />
                  </Grid>
                </Grid>
                <ReservationsTable />
              </Paper>
            </Grid>
          </Grid>
          <BookModal />
          <ReserveModal />
          <ReturnModal />
          <ConfirmationModal 
            showDialog={this.state.showConfirmationDialog}
            headerMessage='Are you sure you want to delete this device?'
            onConfirm={this.deleteDeviceConfirmed}
            onCancel={this.closeConfirmationDialog}
          />
        </div>
        : <LinearProgress />
    );
  }
  openLocationDialog() {
    this.props.showLocationModal();
  }
}

DeviceDetails.propTypes = {
  classes: PropTypes.object.isRequired,
  showLocationModal: PropTypes.func.isRequired,
  deleteDevice: PropTypes.func.isRequired,
  device: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    available: PropTypes.bool.isRequired,
    brand: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    model: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    identificationNum: PropTypes.number.isRequired,
    os: PropTypes.string.isRequired,
    location: PropTypes.shape({
      id: PropTypes.number.isRequired,
      city: PropTypes.string.isRequired,
    }).isRequired,
    custody: PropTypes.shape({
      id: PropTypes.number.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }),
    serialNum: PropTypes.string.isRequired,
    vendor: PropTypes.string.isRequired,
    taxRate: PropTypes.number.isRequired,
    purchased: PropTypes.instanceOf(Date).isRequired,
    userBooking: PropTypes.shape({
      id: PropTypes.number.isRequired,
      from: PropTypes.instanceOf(Date).isRequired,
      to: PropTypes.instanceOf(Date).isRequired,
      status: PropTypes.number.isRequired,
    }),
    userReservation: PropTypes.shape({
      id: PropTypes.number.isRequired,
      from: PropTypes.instanceOf(Date).isRequired,
      to: PropTypes.instanceOf(Date).isRequired,
      status: PropTypes.number.isRequired,
    }),
    reservations: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
      }),
      from: PropTypes.instanceOf(Date).isRequired,
      to: PropTypes.instanceOf(Date).isRequired,
      status: PropTypes.number.isRequired,
    })).isRequired,
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
      city: PropTypes.string.isRequired,
    }).isRequired,
    slack: PropTypes.string,
  }),
  removeReservationFromDevice: PropTypes.func.isRequired,
  fetchDeviceWithId: PropTypes.func.isRequired,
  fetchDeviceLoading: PropTypes.bool.isRequired,
  resetDevice: PropTypes.func.isRequired,
  fetchOffices: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    device: state.deviceDetails.device,
    showLocationModal: state.deviceDetails.showLocationModal,
    user: state.auth.user,
    fetchDeviceLoading: state.deviceDetails.fetchDeviceLoading,
  };
};

export default withRouter(
  connect(mapStateToProps, { ...deviceDetailsActions, ...devicesActions, fetchOffices })(
    withStyles(styles)(DeviceDetails)
  )
);
