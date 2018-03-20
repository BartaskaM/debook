import React from 'react';
import PropTypes from 'prop-types';
import {
  Input,
  Typography,
  Button,
} from 'material-ui';
import { InputLabel } from 'material-ui/Input';
import {
  FormControl,
  FormGroup,
} from 'material-ui/Form';
import { withStyles } from 'material-ui/styles';

import Styles from './Styles';

class SignUp extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Typography variant='display3'>
          Welcome!
        </Typography>
        <Typography variant='headline'>
          Please fill in you details in the form below
        </Typography>
        <FormGroup>
          <FormControl className={classes.signUpFormField}>
            <InputLabel className={classes.fontSize}>Email</InputLabel>
            <Input
              inputProps={{
                type: 'email',
                name: 'email',
              }}
            />
          </FormControl>
          <FormControl className={classes.signUpFormField}>
            <InputLabel className={classes.fontSize}>Password</InputLabel>
            <Input
              inputProps={{
                type: 'password',
                name: 'password',
              }}
            />
          </FormControl>
          <FormControl className={classes.signUpFormField}>
            <InputLabel className={classes.fontSize}>Repeat Password</InputLabel>
            <Input
              inputProps={{
                type: 'password',
                name: 'repeatPassword',
              }}
            />
          </FormControl>
          <FormControl className={classes.signUpFormField}>
            <InputLabel className={classes.fontSize}>First name</InputLabel>
            <Input
              inputProps={{
                type: 'text',
                name: 'firstName',
              }}
            />
          </FormControl>
          <FormControl className={classes.signUpFormField}>
            <InputLabel className={classes.fontSize}>Last name</InputLabel>
            <Input
              inputProps={{
                type: 'text',
                name: 'lastName',
              }}
            />
          </FormControl>
          <FormControl className={classes.signUpFormField}>
            <InputLabel className={classes.fontSize}>Office</InputLabel>
            <Input
              inputProps={{
                type: 'select',
                name: 'office',
              }}
            />
          </FormControl>
          <FormControl className={classes.signUpFormField}>
            <InputLabel className={classes.fontSize}>Slack name</InputLabel>
            <Input
              inputProps={{
                type: 'text',
                name: 'slackName',
              }}
            />
          </FormControl>
          <FormControl className={classes.signUpFormField}>
            <Button variant="raised" color="primary" className={classes.signUpButton}>
              SIGN UP
            </Button>
          </FormControl>
        </FormGroup>
      </div>
    );
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(Styles)(SignUp);