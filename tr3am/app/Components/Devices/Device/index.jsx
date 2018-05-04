import React from 'react';
import PropTypes from 'prop-types';
import List, { ListItem } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

import Styles from './Styles';

const device = (props) => {
  const { openOfficeInfo, device, classes, openUserInfo } = props;
  const user = device.available ? null : device.custody;
  return (
    <List className={classes.deviceItem}>
      <ListItem><img className={classes.deviceCardImage} src={device.image} /></ListItem>
      {device.available ?
        <Typography className={classes.availabilityTagAvailable}>Available</Typography>
        :
        <Typography className={classes.availabilityTagUnavailable}>Unavailable</Typography>
      }
      <Typography className={classes.deviceCardTitle}>
        {device.brand.name}, {device.model.name}
      </Typography>
      <Typography className={classes.deviceCardMainContent}>
        Identification number: 
        <span className={classes.mainTextColor}> 
          {device.identificationNum}
        </span>
      </Typography>
      <Typography noWrap className={classes.deviceCardMainContent}>
        OS: <span className={classes.mainTextColor}> {device.os}</span>
      </Typography>
      <Typography className={classes.deviceCardMainContent} onClick={openOfficeInfo}>
        Location:
        <span className={classes.mainTextColor}> {device.location.city} </span>
      </Typography>
      {device.available ? 
        <Typography className={classes.deviceCardMainContent}></Typography>
        :
        <Typography className={classes.deviceCardMainContent} onClick={openUserInfo}>
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
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    available: PropTypes.bool.isRequired,
    brand: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    model: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    identificationNum: PropTypes.number.isRequired,
    os: PropTypes.string.isRequired,
    location: PropTypes.shape({
      id: PropTypes.number.isRequired,
      city: PropTypes.string.isRequired,
    }).isRequired,
    custody: PropTypes.shape({
      id: PropTypes.number.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }),
    userBooking: PropTypes.shape({
      id: PropTypes.number.isRequired,
      from: PropTypes.instanceOf(Date).isRequired,
      to: PropTypes.instanceOf(Date).isRequired,
      status: PropTypes.number.isRequired,
    }),
    userReservation: PropTypes.shape({
      id: PropTypes.number.isRequired,
      from: PropTypes.instanceOf(Date).isRequired,
      to: PropTypes.instanceOf(Date).isRequired,
      status: PropTypes.number.isRequired,
    }),
  }).isRequired,
  openOfficeInfo: PropTypes.func.isRequired,
  openUserInfo: PropTypes.func, 
};

export default withStyles(Styles)(device);