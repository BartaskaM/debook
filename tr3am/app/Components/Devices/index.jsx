import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import Button from 'material-ui/Button';
import DeviceList from './DeviceList';
import DevicesList from 'Constants/Devices';
import * as devicesActions from 'ActionCreators/devicesActions';
import Filters from 'Components/Filters';
// import { withStyles } from 'material-ui/styles';

// import Styles from './Styles';

class Devices extends React.Component {
  componentDidMount() {
    //TODO: Fetch devices
    this.props.setDevices(DevicesList);
  }

  render() {
    // const { classes } = this.props;
    return (
      <div>
        <Filters />
        <DeviceList />
        {/* <Button
          variant="raised"
          color="primary"
          onClick={this.handleAddNewClick}>
              ADD NEW
        </Button> */}
      </div>
    );
  }
}
Devices.propTypes = {
  setDevices: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};
export default connect(null, devicesActions)(Devices);
//export default connect(null, devicesActions)(withStyles(Styles(Devices)));