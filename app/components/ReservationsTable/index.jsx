import React from 'react';
import PropsTypes from 'prop-types';
import { connect } from 'react-redux';
import List from 'material-ui/List';
import Grid from 'material-ui/Grid';
import Row from './row';
import { withStyles } from 'material-ui/styles';
import Styles from './Styles';
import { dateToValue } from 'Utils/dateUtils';

class ReservationsTable extends React.Component {
  renderRows(){
    const { classes, selectedDevice, reservations } = this.props;
    return reservations.filter(res => res.device == selectedDevice)
      .map((res, i) => {
        const { from, to, user } = res;
        return <Row key={i} first={`${dateToValue(from)} - ${dateToValue(to)}`} 
          second={`User with id ${user}`} 
          styleClass={classes.row}
          addDivider={true}/>;
      }
      );
  }

  render(){
    const { classes, reservations, selectedDevice } = this.props;
    return (
      <Grid container spacing={16}>
        <Grid item xs={12}>
          <List className={classes.officeList}>
            {reservations.filter( res => res.device == selectedDevice) > 0 && 
            <Row first="TIME" second="RESERVED BY" styleClass={classes.topRow}/>}
            {this.renderRows()}
          </List>
        </Grid>
      </Grid>);
  }
}

ReservationsTable.propTypes = {
  classes: PropsTypes.object.isRequired,
  selectedDevice: PropsTypes.number.isRequired,
  reservations: PropsTypes.arrayOf(
    PropsTypes.shape({
      device: PropsTypes.number.isRequired,
      user: PropsTypes.number.isRequired,
      from: PropsTypes.object.isRequired,
      to: PropsTypes.object.isRequired,
    })
  ),
};

const mapStateToProps = state => ({
  selectedDevice: state.devices.selectedDevice,
  reservations: state.devices.reservations,
});

export default connect(mapStateToProps,null)(withStyles(Styles)(ReservationsTable));