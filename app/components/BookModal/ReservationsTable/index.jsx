import React from 'react';
import PropsTypes from 'prop-types';
import { connect } from 'react-redux';
import List from 'material-ui/List';
import Grid from 'material-ui/Grid';
import Reservations from 'Constants/Reservations';
import Row from './row';
import { withStyles } from 'material-ui/styles';
import Styles from '../Styles';


class ReservationsTable extends React.Component {
  dateToValue(date){
    return date.toLocaleTimeString().split(':').slice(0,2).join(':');
  }
  renderRows(){
    return Reservations.filter(res => res.device === this.props.selectedDevice)
      .map((res, i) => 
        <Row key={i} first={this.dateToValue(res.from) + ' - ' + this.dateToValue(res.to)} 
          second={'User with id' + res.user} 
          styleClass={this.props.classes.row}
          addDivider={true}/>
      );
  }
  render(){
    const { classes } = this.props;
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
  classes: PropsTypes.object.isRequired,
  selectedDevice: PropsTypes.number.isRequired,
};
const mapStateToProps = state => ({
  selectedDevice: state.devices.selectedDevice,
});

export default connect(mapStateToProps,null)(withStyles(Styles)(ReservationsTable));