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
    return <Calendar value={this.props.currentDate} 
      onChange={ newValue => this.props.setCurrentDate(newValue)}
      tileClassName={({ date }) => 
        this.props.reservations
          .filter(res => 
            res.from.getDate() === date.getDate() &&
            res.from.getMonth() === date.getMonth() &&
            res.from.getFullYear() === date.getFullYear()).length > 0 ? 
          this.props.classes.coloredTile : ''}/>;
  }
}

ReservationsCalendar.propTypes = {
  currentDate: PropTypes.instanceOf(Date).isRequired,
  setCurrentDate: PropTypes.func.isRequired,
  reservations: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  selectedDevice: PropTypes.number.isRequired,
};
const mapStateToProps = state => ({
  currentDate: state.devices.currentDate,
  reservations: state.devices.reservations,
  selectedDevice: state.devices.selectedDevice,
});
export default connect(mapStateToProps, devicesActions)(withStyles(styles)(ReservationsCalendar));