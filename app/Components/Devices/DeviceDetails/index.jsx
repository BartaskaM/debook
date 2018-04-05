import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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

import Row from './Row';
import { styles } from './Styles';
//import DeviceDetailsList from 'Constants/DeviceDetails';
import * as deviceDetailsActions from 'ActionCreators/deviceDetailsActions';

class DeviceDetails extends React.Component {

  constructor(props) {
    //  props.setDevices(DevicesList);
    super(props);
    this.state = {
      device: null,
    };
    this.handleEditClick = this.handleCheckClick.bind(this);
    this.getParsedDate = this.getParsedDate.bind(this);
    this.renderError = this.renderError.bind(this);
  }
  componentDidMount() {
    //this.props.setDeviceDetails(DeviceDetailsList);

    if (this.props.match.params.id) {
      this.props.getDeviceWithId(this.props.match.params.id);
    }
    else {
      this.setState({
        device: null,
      });
    }
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    const device = this.props.getDeviceWithId(this.nextProps.match.params.id);
    if (device != prevState.device) {
      return { device };
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
    const { classes } = this.props;
    return (
      this.state.device ?
        <div className={classes.root}>
          <Link to="/main">
            <Button variant="flat">
              <NavigateBefore />
              <span className={classes.bigFont} >Back to the list</span>
            </Button>
          </Link>
          <Divider className={classes.divider} />
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
                  <Grid item md={11} className={classes.custody}>
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
                  <Grid item md={11}>
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
            <Grid item md
              container
              className={classes.table}
              alignItems='stretch'
              direction='column'
              justify='top'
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
              <Button variant="raised" size="large" color="secondary" className={classes.button}>
                CHANGE LOCATION
              </Button>

            </Grid>
          </Grid>
        </div>
        : this.renderError()
    );
  }
}

DeviceDetails.propTypes = {
  // setDeviceDetails: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  getDeviceWithId: PropTypes.func.isRequired,
  device: PropTypes.arrayOf(PropTypes.shape({
    location: PropTypes.string.isRequired,
    custody: PropTypes.string.isRequired,
    available: PropTypes.bool.isRequired,
    active: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    custody_of: PropTypes.string.isRequired,
    booked_from: PropTypes.string.isRequired,
    identification_num: PropTypes.string.isRequired,
    serial_num: PropTypes.string.isRequired,
    os: PropTypes.string.isRequired,
    group: PropTypes.string.isRequired,
    subgroup: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    check_in_due: PropTypes.string.isRequired,
    purchased: PropTypes.string.isRequired,
    vendor: PropTypes.string.isRequired,
    tax_rate: PropTypes.string.isRequired,
  })).isRequired,
  match: PropTypes.object.isRequired,
};
const mapStateToProps = state => {
  return {
    device: state.deviceDetails.device,
  };
};
export default connect(mapStateToProps, deviceDetailsActions)(withStyles(styles)(DeviceDetails));