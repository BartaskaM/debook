import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import List from 'material-ui/List';
import Grid from 'material-ui/Grid';
import Row from './row';
import { withStyles } from 'material-ui/styles';
import Styles from './Styles';
import { dateToValue } from 'Utils/dateUtils';

class ReservationsTable extends React.Component {
  renderRows(){
    const { classes, selectedDevice, reservations, currentDate, users } = this.props;
    return reservations.filter(res => res.device == selectedDevice && 
    res.from.getDate() === currentDate.getDate())
      .sort(res => res.from)
      .map((res, i) => {
        const { from, to, user } = res;
        const userInfo = users.find(usr => usr.id == user);
        return <Row key={i} first={`${dateToValue(from)} - ${dateToValue(to)}`} 
          second={`${userInfo.firstName} ${userInfo.lastName}`} 
          styleClass={classes.row}
          addDivider={true}/>;
      }
      );
  }

  render(){
    const { 
      classes, 
      reservations, 
      selectedDevice, 
      currentDate, 
    } = this.props;
    return (
      <Grid container spacing={16}>
        <Grid item xs={12}>
          <List className={classes.officeList}>
            {reservations.filter( res => res.device == selectedDevice &&
            res.from.getDate() === currentDate.getDate()).length > 0 && 
            <Row first="TIME" second="RESERVED BY" styleClass={classes.topRow}/>}
            {this.renderRows()}
          </List>
        </Grid>
      </Grid>);
  }
}

ReservationsTable.propTypes = {
  classes: PropTypes.object.isRequired,
  selectedDevice: PropTypes.number.isRequired,
  reservations: PropTypes.arrayOf(
    PropTypes.shape({
      device: PropTypes.number.isRequired,
      user: PropTypes.number.isRequired,
      from: PropTypes.object.isRequired,
      to: PropTypes.object.isRequired,
    })
  ),
  currentDate: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  selectedDevice: state.devices.selectedDevice,
  reservations: state.devices.reservations,
  currentDate: state.devices.currentDate,
  users: state.users.users,
});

export default connect(mapStateToProps,null)(withStyles(Styles)(ReservationsTable));