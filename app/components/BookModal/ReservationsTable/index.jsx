import React from 'react';
import PropsTypes from 'prop-types';
import { connect } from 'react-redux';
import List from 'material-ui/List';
import Grid from 'material-ui/Grid';
import Reservations from 'Constants/Reservations';
import Row from './row';
import { withStyles } from 'material-ui/styles';
import Styles from '../Styles';
import dateToValue from '../dateConvert';

class ReservationsTable extends React.Component {
  renderRows(){
    return Reservations.filter(res => res.device === this.props.selectedDevice)
      .map((res, i) => {
        const { from, to, user } = res;
        return <Row key={i} first={`${dateToValue(from)} - ${dateToValue(to)}`} 
          second={`User with id' ${user}`} 
          styleClass={this.props.classes.row}
          addDivider={true}/>;
      }
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