import React from 'react';
import PropTypes from 'prop-types';
//import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import Row from './Row';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import { withStyles/*, MuiThemeProvider, createMuiTheme*/ } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import Tooltip from 'material-ui/Tooltip';
import Flag from 'material-ui-icons/Flag';
import NavigateBefore from 'material-ui-icons/NavigateBefore';
import { styles } from './Styles';

/* Ateities planams su teisingoms spalvoms.
const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: blue,
    third: 
    error: red,
  },
});
*/ 

class DeviceDetails extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      image: props.device.image,
      name: props.device.name,
      custody_of: props.device.custody_of,
      booked_from: props.device.booked_from,
      id_num: props.device.identification_num,
      serial_num: props.device.serial_num,
      os: props.device.os,
      group: props.device.group,
      subgroup: props.device.subgroup,
      description: props.device.description,
      check_in_due: props.device.check_in_due,
      purchased: props.device.purchased,
      vendor: props.device.vendor,
      tax_rate: props.device.tax_rate,
      location: props.device.location,
      edit: false,
    };
    //  this.renderWindow = this.renderWindow.bind(this);
    this.changeInfo = this.changeInfo.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
  }
  changeInfo(label, newInfo) {
    this.setState({ [label]: newInfo });
  }
  handleEditClick() {
    //TODO: post changes if needed
    this.setState({ edit: !this.state.edit });
  }
  render(){
    const { classes } = this.props;
    return ( 
      <div className={classes.root}>
        <Link to="/main">
          <Button variant="flat">
            <NavigateBefore />
            <span className={classes.bigFont} >Back to the list</span>
          </Button>
        </Link>
        <Divider className={classes.divider}/>
        <Grid container spacing={8}>
          <Grid item md>
            <img
              className={classes.image}
              src={this.state.image}
            />
          </Grid> 
          <Grid item md={6}>
            <Paper className={classes.table}>
              <Grid container className={classes.table}>
                <Grid item md={11}>
                  <Typography className={classes.title} variant="display3" align="left">
                    {this.state.name} 
                  </Typography>
                </Grid> 
                <Grid item md={11} className={classes.custody}>
                  <Grid container item>
                    <Grid item sm={2} className={classes.label}>Custody of:</Grid>
                    <Grid item sm={9}>{this.state.custody_of}
                      <Tooltip 
                        id="tooltip-bottom" 
                        enterDelay={100}
                        leaveDelay={5000}
                        title="Request custody update"
                        placement="bottom">
                        <Flag style={{color: 'red'}} />
                      </Tooltip>
                    </Grid>
                  </Grid>
                  <Row 
                    label="Booked from" 
                    value={this.state.booked_from} 
                    edit={this.state.edit} 
                    changeInfo={this.changeInfo}/>
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
                  value={this.state.id_num} 
                  edit={this.state.edit} 
                  changeInfo={this.changeInfo}/>
                <Row 
                  label="Serial number" 
                  value={this.state.serial_num} 
                  edit={this.state.edit} 
                  changeInfo={this.changeInfo}/>
                <Row 
                  label="OS" 
                  value={this.state.os} 
                  edit={this.state.edit} 
                  changeInfo={this.changeInfo}/>
                <Row 
                  label="Group" 
                  value={this.state.group} 
                  edit={this.state.edit} 
                  changeInfo={this.changeInfo}/>
                <Row 
                  label="Subgroup" 
                  value={this.state.subgroup} 
                  edit={this.state.edit} 
                  changeInfo={this.changeInfo}/>
                <Row 
                  label="Description" 
                  value={this.state.description} 
                  edit={this.state.edit} 
                  changeInfo={this.changeInfo}/>
                <Row 
                  label="Check-in due" 
                  value={this.state.check_in_due} 
                  edit={this.state.edit} 
                  changeInfo={this.changeInfo}/>
                <Row 
                  label="Location" 
                  value={this.state.location} 
                  edit={this.state.edit} 
                  changeInfo={this.changeInfo}/>
                <Row 
                  label="Purchased on:" 
                  value={this.state.purchased} 
                  edit={this.state.edit} 
                  changeInfo={this.changeInfo}/>
                <Row 
                  label="Vendor" 
                  value={this.state.vendor} 
                  edit={this.state.edit} 
                  changeInfo={this.changeInfo}/>
                <Row 
                  label="Tax rate" 
                  value={this.state.tax_rate} 
                  edit={this.state.edit} 
                  changeInfo={this.changeInfo}/>
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
            <Button variant="raised" size="large"  className={classes.button}>
                BOOK DEVICE
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
    );
  }
}

DeviceDetails.propTypes = {
  classes: PropTypes.object.isRequired,
  //match: PropTypes.object.isRequired,
  device: PropTypes.shape({
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
    location: PropTypes.string.isRequired,
  }),
};

export default withStyles(styles)(DeviceDetails);