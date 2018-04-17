import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
  FormHelperText,
} from 'material-ui/Form';
import { withStyles } from 'material-ui/styles';
import validator from 'email-validator';
import { CircularProgress, LinearProgress } from 'material-ui/Progress';

import Styles from './Styles';
import * as authActions from 'ActionCreators/authActions';
import * as officesActions from 'ActionCreators/officesActions';

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      repeatPassword: '',
      passwordErrorMessage: '',
      emailErrorMessage: '',
      office: props.offices[0] ? props.offices[0].id : null,
      firstName: '',
      lastName: '',
      slackName: '',
    };

    this.submitSignUpForm = this.submitSignUpForm.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
  }

  componentDidMount(){
    this.props.fetchOffices();
  }

  static getDerivedStateFromProps(nextProps, previousState){
    if(nextProps.currentTab === 0){
      return {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        repeatPassword: '',
        slackName: '',
        office: 1,
        passwordErrorMessage: '',
        emailErrorMessage: '',
      };
    }
    return previousState;
  }

  submitSignUpForm(e) {
    e.preventDefault();
    const { 
      email,
      password,
      firstName,
      lastName,
      slackName,
      office,
    } = this.state;
    if (this.validateEmail() && this.validatePassword()) {
      const result = {
        firstName,
        lastName,
        email,
        office,
        slack: slackName,
        password,
      };
      this.props.signUp(result);
    }
  }

  handleFormChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  validateEmail() {
    if (validator.validate(this.state.email)) {
      this.setState({
        emailErrorMessage: '',
      });
      return true;
    }
    this.setState({
      emailErrorMessage: 'This e-mail is not valid',
    });
    return false;
  }

  validatePassword() {
    //call api to check if email is used
    const { password, repeatPassword } = this.state;
    if (password === repeatPassword) {
      this.setState({
        passwordErrorMessage: '',
      });
      return true;
    }
    else if (repeatPassword != '') {
      this.setState({
        passwordErrorMessage: 'Passwords do not match.',
      });
      return false;
    }
    return false;
  }

  render() {
    const { 
      classes, 
      signUpError, 
      fetchingSignUp,
      fetchOfficesError,
      fetchingOffices,
      offices, 
    } = this.props;
    const { 
      email,
      password,
      repeatPassword,
      firstName,
      lastName,
      slackName,
      office,
      emailErrorMessage,
      passwordErrorMessage,
    } = this.state;
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
                value={email}
                className={classes.fontSize}
                error={emailErrorMessage.length > 0}
                onChange={this.handleFormChange}
                onBlur={this.validateEmail}
                inputProps={{
                  type: 'email',
                  name: 'email',
                  maxLength: '64',
                  required: 'required',
                }}
              />
              {emailErrorMessage.length > 0 && <FormHelperText>{emailErrorMessage}</FormHelperText>}
            </FormControl>
            <FormControl className={classes.signUpFormField}>
              <InputLabel className={classes.fontSize}>Password</InputLabel>
              <Input
                className={classes.fontSize}
                value={password}
                error={passwordErrorMessage.length > 0}
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
                value={repeatPassword}
                error={passwordErrorMessage.length > 0}
                onChange={this.handleFormChange}
                onBlur={this.validatePassword}
                inputProps={{
                  type: 'password',
                  name: 'repeatPassword',
                  required: 'required',
                }}
              />
              {
                passwordErrorMessage.length > 0 && 
              <FormHelperText>
                {passwordErrorMessage}
              </FormHelperText>
              }
            </FormControl>
            <FormControl className={classes.signUpFormField}>
              <InputLabel className={classes.fontSize}>First name</InputLabel>
              <Input
                className={classes.fontSize}
                value={firstName}
                onChange={this.handleFormChange}
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
                value={lastName}
                onChange={this.handleFormChange}
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
              <div className={classes.wrapper}>
                <Select
                  value={office}
                  autoWidth={true}
                  onChange={this.handleFormChange}
                  disabled={fetchingOffices}
                  className={classes.select}
                  inputProps={{
                    name: 'office',
                  }}
                >
                  {offices.map((office, i) => (
                    <MenuItem
                      key={i}
                      value={office.id}
                      className={classes.menuItemWidth}
                    >
                      {office.city}
                    </MenuItem>
                  ))}
                </Select>
                {
                  fetchOfficesError.length > 0 && 
                <FormHelperText>{fetchOfficesError}</FormHelperText>
                }
                {
                  fetchingOffices && 
                  <CircularProgress size={24} className={classes.buttonProgress}/>
                }
              </div>
            </FormControl>
            <FormControl className={classes.signUpFormField}>
              <InputLabel className={classes.fontSize}>Slack name</InputLabel>
              <Input
                value={slackName}
                onChange={this.handleFormChange}
                className={classes.fontSize}
                inputProps={{
                  type: 'text',
                  name: 'slackName',
                  maxLength: '64',
                }}
              />
            </FormControl>
            <Typography variant="display1">
              {signUpError}
            </Typography>
            <FormControl className={classes.signUpFormField}>
              {fetchingSignUp && <LinearProgress className={classes.progressBar}/>}
              <Button
                type='submit'
                variant="raised"
                color="primary"
                className={classes.signUpButton}
              >
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
  signUp: PropTypes.func.isRequired,
  signUpError: PropTypes.string.isRequired,
  currentTab: PropTypes.number.isRequired,
  fetchingSignUp: PropTypes.bool.isRequired,
  offices: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    country: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  })).isRequired,
  fetchingOffices: PropTypes.bool.isRequired,
  fetchOfficesError: PropTypes.string.isRequired,
  fetchOffices: PropTypes.func.isRequired,
};

const mapStateToProps = store => ({
  signUpError: store.auth.signUpError,
  currentTab: store.auth.currentTab,
  fetchingSignUp: store.auth.fetchingSignUp,
  offices: store.offices.offices,
  fetchingOffices: store.offices.fetchingOffices,
  fetchOfficesError: store.offices.fetchOfficesError,
});

export default connect(mapStateToProps, {
  ...authActions, 
  ...officesActions,
})(withStyles(Styles)(SignUp));