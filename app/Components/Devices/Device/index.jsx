import React from 'react';
import PropTypes from 'prop-types';
import List, { ListItem} from 'material-ui/List';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

import Styles from './Styles';

const device = ({classes, device}) => {
  return (
    <List className={classes.root}>
      <ListItem><img className={classes.device_card_image} src={device.image}/></ListItem> 
      {device.available ?
        <Typography className={classes.availability_tag_available}>Available</Typography>
        :
        <Typography className={classes.availability_tag_unavailable}>Unavailable</Typography>
      }
      <Typography className={classes.device_card_title}>{device.brand}, {device.model} </Typography>
      <Typography className={classes.device_card_main_content}>
        Identification number: <span className={classes.main_text_color}> {device.id}</span> 
      </Typography>  
      <Typography className={classes.device_card_main_content}>
         OS: <span className={classes.main_text_color}> {device.os}</span> 
      </Typography>
      <Typography className={classes.device_card_main_content}>
        Location: 
        <span className={classes.main_text_color}><a href="#nolink"> {device.location} </a></span> 
      </Typography>
      {device.available ? <Typography><br></br> </Typography>
        :
        <Typography className={classes.device_card_main_content}>
          Custody of: 
          <span className={classes.main_text_color}><a href="#nolink"> {device.custody} </a></span>
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
    custody: PropTypes.string.isRequired,
    available: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired, 
    modelCount: PropTypes.number.isRequired,
  }).isRequired,
};

export default withStyles(Styles)(device);