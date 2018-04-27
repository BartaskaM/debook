import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import List, { ListItem } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

import Styles from './Styles';

const device = ({ classes, device, users }) => {
  const user = device.available ? null :
    users.find(user => user.id === device.custody);
  return (
    <List className={classes.deviceItem}>
      <ListItem><img className={classes.deviceCardImage} src={device.image} /></ListItem>
      {device.available ?
        <Typography className={classes.availabilityTagAvailable}>Available</Typography>
        :
        <Typography className={classes.availabilityTagUnavailable}>Unavailable</Typography>
      }
      <Typography className={classes.deviceCardTitle}>
        {device.brand}, {device.model}
      </Typography>
      <Typography className={classes.deviceCardMainContent}>
        Identification number: <span className={classes.mainTextColor}> {device.id}</span>
      </Typography>
      <Typography noWrap className={classes.deviceCardMainContent}>
        OS: <span className={classes.mainTextColor}> {device.os}</span>
      </Typography>
      <Typography className={classes.deviceCardMainContent}>
        Location:
        <span className={classes.mainTextColor}> {device.location} </span>
      </Typography>
      {device.available ? 
        <Typography className={classes.deviceCardMainContent}><br></br> </Typography>
        :
        <Typography className={classes.deviceCardMainContent}>
          Custody of:
          <span className={classes.mainTextColor}> {`${user.firstName} ${user.lastName}`} </span>
        </Typography>
      }
    </List>
  );
};

device.propTypes = {
  classes: PropTypes.object.isRequired,
  device: PropTypes.shape({
    image: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
    os: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    custody: PropTypes.number,
    available: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  users: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  users: state.users.users,
});

export default connect(mapStateToProps, null)(withStyles(Styles)(device));