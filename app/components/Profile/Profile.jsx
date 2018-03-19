import React from 'react';
import PropTypes from 'prop-types';
import Row from './Row';

import Divider from 'material-ui/Divider';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import NavigateBefore from 'material-ui-icons/NavigateBefore';

const styles = {
  root:{
    margin:'50px 75px',
  },
  paper: {
    padding: 20,
    margin: 20,
  },
  divider: {
    margin: '5px 0',
  },
  bigFont: {
    fontSize: 18,
  },
  header:
  {
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft:10,
  },
  table:{
    marginTop: 10,
    marginLeft: 10,
  },
};

class Profile extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Button variant="flat">        
          <NavigateBefore />
          <span className={classes.bigFont} >Back</span>
        </Button>
        <Divider className={classes.divider}/>
        <Paper className={classes.paper}>
          <Divider className={classes.divider}/>
          <span className={classes.header}>Profile</span>
          <Divider className={classes.divider}/>
          <Grid container className={classes.table}>
            <Row label="Name:" value="Matas" />
            <Row label="Email:" value="mail@mail.mail" />
            <Row label="Office:" value="Kaunas" />
            <Row label="Slack name:" value="Matassss" />
          </Grid>
        </Paper>
      </div>
    );
  }
}

Profile.propTypes={
  classes: PropTypes.object,
};

export default withStyles(styles)(Profile);