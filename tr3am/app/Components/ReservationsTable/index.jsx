import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import List, { ListItem } from 'material-ui/List';
import Grid from 'material-ui/Grid';
import Divider from 'material-ui/Divider';

import Row from './row';
import { withStyles } from 'material-ui/styles';
import Styles from './Styles';
import { dateToHours } from 'Utils/dateUtils';

class ReservationsTable extends React.Component {
  renderRows(){
    const { classes, selectedDeviceReservations, currentDate } = this.props;
    const reservationsForThisDay = selectedDeviceReservations.filter(res => 
      res.from.getDate() === currentDate.getDate() && 
    res.from.getMonth() === currentDate.getMonth() &&
    res.from.getFullYear() === currentDate.getFullYear());
    return reservationsForThisDay.length == 0 ? 
      <Grid item xs={12}>
        <ListItem>
          <Grid container>
            <Grid item xs={12}><Divider /></Grid>
            <Grid item xs={12}>No reservations today.</Grid>
          </Grid>
        </ListItem>
      </Grid> :
      reservationsForThisDay
        .sort(res => res.from)
        .map((res, i) => {
          const { from, to, user } = res;
          return <Row key={i} first={`${dateToHours(from)} - ${dateToHours(to)}`} 
            second={`${user.firstName} ${user.lastName}`} 
            styleClass={classes.row}
            addDivider={true}/>;
        }
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
      device: PropTypes.number.isRequired,
      user: PropTypes.number.isRequired,
      from: PropTypes.object.isRequired,
      to: PropTypes.object.isRequired,
      status: PropTypes.number.isRequired,
    })
  ),
  currentDate: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  currentDate: state.devices.currentDate,
  selectedDeviceReservations: state.devices.selectedDeviceReservations,
});

export default connect(mapStateToProps,null)(withStyles(Styles)(ReservationsTable));