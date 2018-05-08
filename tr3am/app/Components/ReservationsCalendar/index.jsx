import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import Calendar from 'react-calendar';
import * as devicesActions from 'ActionCreators/devicesActions';
import styles from './Styles';

class ReservationsCalendar extends React.Component {
  constructor(props){
    super(props);
  }
  
  render(){
    const { classes, selectedDeviceReservations, fetchDeviceLoading } = this.props;
    const reservations = (selectedDeviceReservations && !fetchDeviceLoading) ? 
      selectedDeviceReservations : [];
    return <Calendar value={this.props.currentDate}
      className={classes.calendar}
      onChange={ newValue => this.props.setCurrentDate(newValue)}
      locale="en"
      tileClassName={({ date }) => 
        reservations
          .filter(res => 
            res.from.getDate() === date.getDate() &&
            res.from.getMonth() === date.getMonth() &&
            res.from.getFullYear() === date.getFullYear()).length > 0 ? 
          classes.coloredTile : ''}/>;
  }
}

ReservationsCalendar.propTypes = {
  currentDate: PropTypes.instanceOf(Date).isRequired,
  setCurrentDate: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  selectedDeviceReservations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
      }).isRequired,
      from: PropTypes.object.isRequired,
      to: PropTypes.object.isRequired,
      status: PropTypes.number.isRequired,
    })
  ),
  fetchDeviceLoading: PropTypes.bool.isRequired,
};
const mapStateToProps = state => ({
  currentDate: state.devices.currentDate,
  selectedDeviceReservations: state.devices.selectedDeviceReservations,
  fetchDeviceLoading: state.deviceDetails.fetchDeviceLoading,
});
export default connect(mapStateToProps, devicesActions)(withStyles(styles)(ReservationsCalendar));