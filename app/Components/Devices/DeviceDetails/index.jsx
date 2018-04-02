import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import Row from './Row';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import { withStyles/*, MuiThemeProvider, createMuiTheme*/ } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Plus from 'material-ui-icons/Add';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import Tooltip from 'material-ui/Tooltip';
import Flag from 'material-ui-icons/Flag';
import NavigateBefore from 'material-ui-icons/NavigateBefore';
import { styles } from './Styles';
import DevicesList from 'Constants/Devices';
import * as devicesActions from 'ActionCreators/devicesActions';

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
    props.setDevices(DevicesList);
    super(props);
    this.state = {
      device: {},
    };
    this.handleEditClick = this.handleCheckClick.bind(this);
    this.getParsedDate =  this.getParsedDate.bind(this);
  }
  componentDidMount() {
    //TODO: Fetch devices
    this.props.setDevices(DevicesList);
  }
  static getDerivedStateFromProps(nextProps, prevState){
    const device = nextProps.devices.find(device=>device.id == nextProps.match.params.id);
    if(device != prevState.device){
      return {device};
    }
  }
  getParsedDate(){
    const currentDate = new Date(), 
      currentMonth =  currentDate.getMonth() < 9 ? '-0' + (currentDate.getMonth() + 1) : 
        '-' + (currentDate.getMonth() + 1),
      currentDay = currentDate.getDate() < 10 ? '-0' + currentDate.getDate() : 
        '-' + currentDate.getDate(),
      date = currentDate.getFullYear() + currentMonth + currentDay;
      
    return date;
  }
  handleCheckClick(){
    const device = this.state.device;
    if(device.custody.length === 0){
      this.open(device.id);
    } else {
      //Handle device return
      device.available = !device.available;
      device.custody = 'New guy';
      device.booked_from = this.getParsedDate();
    }
      
    this.setState({device}); 
  }
  render(){
    const { classes } = this.props;
    return ( 
      this.state.device ?     
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
                src={this.state.device.image}
              />
            </Grid> 
            <Grid item md={6} xs={12}>
              <Paper className={classes.table}>
                <Grid container className={classes.table}>
                  <Grid item md={11}>
                    <Typography className={classes.title} variant="display3" align="left">
                      {this.state.device.name} 
                    </Typography>
                  </Grid> 
                  <Grid item md={11} className={classes.custody}>
                    <Grid container item>
                      <Grid item md={2} className={classes.label}>Custody of:</Grid>
                      <Grid item md={9}>{this.state.device.custody}
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
                      value={this.state.device.booked_from} 
                      edit={false} 
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
                    value={this.state.device.identification_num} 
                    edit={false} 
                    changeInfo={this.changeInfo}/>
                  <Row 
                    label="Serial number" 
                    value={this.state.device.serial_num} 
                    edit={false} 
                    changeInfo={this.changeInfo}/>
                  <Row 
                    label="OS" 
                    value={this.state.device.os} 
                    edit={false} 
                    changeInfo={this.changeInfo}/>
                  <Row 
                    label="Group" 
                    value={this.state.device.group} 
                    edit={false} 
                    changeInfo={this.changeInfo}/>
                  <Row 
                    label="Subgroup" 
                    value={this.state.device.subgroup} 
                    edit={false} 
                    changeInfo={this.changeInfo}/>
                  <Row 
                    label="Description" 
                    value={this.state.device.description} 
                    edit={false} 
                    changeInfo={this.changeInfo}/>
                  <Row 
                    label="Check-in due" 
                    value={this.state.device.check_in_due} 
                    edit={false} 
                    changeInfo={this.changeInfo}/>
                  <Row 
                    label="Location" 
                    value={this.state.device.location} 
                    edit={false} 
                    changeInfo={this.changeInfo}/>
                  <Row 
                    label="Purchased on:" 
                    value={this.state.device.purchased} 
                    edit={false} 
                    changeInfo={this.changeInfo}/>
                  <Row 
                    label="Vendor" 
                    value={this.state.device.vendor} 
                    edit={false} 
                    changeInfo={this.changeInfo}/>
                  <Row 
                    label="Tax rate" 
                    value={this.state.device.tax_rate} 
                    edit={false} 
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
              <Button 
                variant='raised'
                size='large'
                disabled={
                  this.state.device.available ? false :  true
                } 
                className={classes.button}
                color={this.state.device.available ? 'primary' : 'secondary'} 
                onClick={()=>this.handleCheckClick()}>
                <Plus/>
                {this.state.device.available ?
                  'Book device' : 
                  'Device is booked'}
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
        : null
    );
  }
}

DeviceDetails.propTypes = {
  setDevices: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  devices: PropTypes.arrayOf(PropTypes.shape({
    location: PropTypes.string.isRequired,
    custody: PropTypes.string.isRequired,
    available: PropTypes.bool.isRequired,
    active: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
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
  })).isRequired,
  match: PropTypes.object.isRequired,
};  
const mapStateToProps = state => {
  return {
    devices: state.devices.devices,
  };
};
export default connect(mapStateToProps, devicesActions)(withStyles(styles)(DeviceDetails));