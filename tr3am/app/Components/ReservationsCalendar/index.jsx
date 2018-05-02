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
    const { classes } = this.props;
    return <Calendar value={this.props.currentDate}
      className={classes.calendar}
      onChange={ newValue => this.props.setCurrentDate(newValue)}
      tileClassName={({ date }) => 
        this.props.reservations
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
  reservations: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  currentDate: state.devices.currentDate,
  reservations: state.devices.reservations,
});
export default connect(mapStateToProps, devicesActions)(withStyles(styles)(ReservationsCalendar));