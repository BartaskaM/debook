import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import List, { ListItem } from 'material-ui/List';
import Grid from 'material-ui/Grid';
import Divider from 'material-ui/Divider';
import { LinearProgress } from 'material-ui/Progress';

import Row from './row';
import { withStyles } from 'material-ui/styles';
import Styles from './Styles';
import { dateToHours } from 'Utils/dateUtils';

class ReservationsTable extends React.Component {
  renderRows(){
    const {
      classes,
      selectedDeviceReservations,
      currentDate,
      fetchingDeviceReservations,
    } = this.props;
    const reservationsForThisDay = selectedDeviceReservations.filter(res => 
      res.from.getDate() === currentDate.getDate() && 
    res.from.getMonth() === currentDate.getMonth() &&
    res.from.getFullYear() === currentDate.getFullYear());
    return fetchingDeviceReservations ?
      this.renderLoadingBar() :
      reservationsForThisDay.length == 0 ? 
        this.renderNoReservations() :
        reservationsForThisDay
          .sort((a, b) => a.from.getTime() - b.from.getTime())
          .map((res, i) => {
            const { from, to, user } = res;
            return <Row key={i} first={`${dateToHours(from)} - ${dateToHours(to)}`} 
              second={`${user.firstName} ${user.lastName}`} 
              styleClass={classes.row}
              addDivider={true}/>;
          }
          );
  }

  renderNoReservations(){
    return (
      <Grid item xs={12}>
        <ListItem>
          <Grid container>
            <Grid item xs={12}><Divider /></Grid>
            <Grid item xs={12}>No reservations today.</Grid>
          </Grid>
        </ListItem>
      </Grid>
    );
  }

  renderLoadingBar(){
    return (
      <Grid item xs={12}>
        <LinearProgress/>
      </Grid>
    );
  }

  render(){
    const { 
      classes, 
    } = this.props;
    return (
      <Grid container spacing={16}>
        <Grid item xs={12}>
          <List className={classes.officeList}>
            <Row first="TIME" second="RESERVED BY" styleClass={classes.topRow}/>
            {this.renderRows()}
          </List>
        </Grid>
      </Grid>);
  }
}

ReservationsTable.propTypes = {
  classes: PropTypes.object.isRequired,
  selectedDeviceReservations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      deviceId: PropTypes.number.isRequired,
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
  currentDate: PropTypes.instanceOf(Date).isRequired,
  fetchingDeviceReservations: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  currentDate: state.devices.currentDate,
  selectedDeviceReservations: state.devices.selectedDeviceReservations,
  fetchingDeviceReservations: state.devices.fetchingDeviceReservations,
});

export default connect(mapStateToProps,null)(withStyles(Styles)(ReservationsTable));