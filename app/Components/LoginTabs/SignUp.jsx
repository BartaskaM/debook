import React from 'react';
import PropTypes from 'prop-types';
import {
  Input,
  Typography,
  Button,
  Select,
} from 'material-ui';
import { MenuItem } from 'material-ui/Menu';
import { InputLabel } from 'material-ui/Input';
import {
  FormControl,
  FormGroup,
} from 'material-ui/Form';
import { withStyles } from 'material-ui/styles';

import Styles from './Styles';
import Offices from '../../Constants/Offices';

class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      emailErrorMessage: '',
      password: '',
      repeatPassword: '',
      passwordErrorMessage: '',
      office: '',
      validEmail: true,
      validPassword: true,
    };

    this.submitSignUpForm = this.submitSignUpForm.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
  }

  submitSignUpForm(event) {
    event.preventDefault();

    if (this.validateEmail() && this.validatePassword()) {
      const result = {
        firstName: event.target.firstName.value,
        lastName: event.target.lastName.value,
        email: event.target.email.value,
        office: event.target.office.value,
        slackName: event.target.slackName.value,
        password: event.target.password.value,
        repeatPassword: event.target.repeatPassword.value,
      };

      console.log(result);

      this.props.changeTab(null, 0);
    }
  }

  handleFormChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  validateEmail() {
    if (this.state.email !== 'email@email.com') {
      this.setState({
        validEmail: true,
        emailErrorMessage: '',
      });
      return true;
    }

    this.setState({
      validEmail: false,
      emailErrorMessage: 'Email is already in use.',
    });
    return false;
  }

  validatePassword() {
    if (this.state.password === this.state.repeatPassword) {
      this.setState({
        validPassword: true,
        passwordErrorMessage: '',
      });
      return true;
    }
    else if (this.state.repeatPassword != '') {
      this.setState({
        validPassword: false,
        passwordErrorMessage: 'Passwords do not match.',
      });
      return false;
    }
    return false;
  }

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
        <form method='POST' onSubmit={this.submitSignUpForm} >
          <FormGroup>
            <FormControl className={classes.signUpFormField}>
              <InputLabel className={classes.fontSize}>Email</InputLabel>
              <Input
                className={classes.fontSize}
                error={!this.state.validEmail}
                onChange={this.handleFormChange}
                onBlur={this.validateEmail}
                inputProps={{
                  type: 'email',
                  name: 'email',
                  maxLength: '64',
                  required: 'required',
                }}
              />
              <Typography variant='headline' className={classes.errorMessage}>{this.state.emailErrorMessage}</Typography>
            </FormControl>
            <FormControl className={classes.signUpFormField}>
              <InputLabel className={classes.fontSize}>Password</InputLabel>
              <Input
                className={classes.fontSize}
                error={!this.state.validPassword}
                onChange={this.handleFormChange}
                onBlur={this.validatePassword}
                inputProps={{
                  type: 'password',
                  name: 'password',
                  required: 'required',
                }}
              />
            </FormControl>
            <FormControl className={classes.signUpFormField}>
              <InputLabel className={classes.fontSize}>Repeat Password</InputLabel>
              <Input
                className={classes.fontSize}
                error={!this.state.validPassword}
                onChange={this.handleFormChange}
                onBlur={this.validatePassword}
                inputProps={{
                  type: 'password',
                  name: 'repeatPassword',
                  required: 'required',
                }}
              />
              <Typography variant='headline' className={classes.errorMessage}>{this.state.passwordErrorMessage}</Typography>
            </FormControl>
            <FormControl className={classes.signUpFormField}>
              <InputLabel className={classes.fontSize}>First name</InputLabel>
              <Input
                className={classes.fontSize}
                inputProps={{
                  type: 'text',
                  name: 'firstName',
                  maxLength: '32',
                  required: 'required',
                }}
              />
            </FormControl>
            <FormControl className={classes.signUpFormField}>
              <InputLabel className={classes.fontSize}>Last name</InputLabel>
              <Input
                className={classes.fontSize}
                inputProps={{
                  type: 'text',
                  name: 'lastName',
                  maxLength: '32',
                  required: 'required',
                }}
              />
            </FormControl>
            <FormControl className={classes.signUpFormField}>
              <InputLabel className={classes.fontSize}>Office</InputLabel>
              <Select
                value={this.state.office}
                autoWidth={true}
                onChange={this.handleFormChange}
                className={classes.fontSize}
                inputProps={{
                  name: 'office',
                }}
              >
                {Offices.map(office => (
                  <MenuItem
                    key={office.id}
                    value={office.city}
                    className={classes.menuItemWidth}
                  >
                    {office.city}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className={classes.signUpFormField}>
              <InputLabel className={classes.fontSize}>Slack name</InputLabel>
              <Input
                className={classes.fontSize}
                inputProps={{
                  type: 'text',
                  name: 'slackName',
                  maxLength: '64',
                }}
              />
            </FormControl>
            <FormControl className={classes.signUpFormField}>
              <Button type='submit' variant="raised" color="primary" className={classes.signUpButton}>
                SIGN UP
              </Button>
            </FormControl>
          </FormGroup>
        </form>
      </div>
    );
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
  changeTab: PropTypes.func.isRequired,
};

export default withStyles(Styles)(SignUp);