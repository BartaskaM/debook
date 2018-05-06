import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Input from 'material-ui/Input';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { InputLabel } from 'material-ui/Input';
import { LinearProgress } from 'material-ui/Progress';
import {
  FormControl,
  FormGroup,
  FormControlLabel,
} from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import { withStyles } from 'material-ui/styles';

import Styles from './Styles';
import * as auth from 'ActionCreators/authActions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      rememberMe: false,
    };
    this.submitLogInForm = this.submitLogInForm.bind(this);
    this.inputHandler = this.inputHandler.bind(this);
  }

  componentDidMount() {
    const { user, history } = this.props;
    if (user) {
      history.push('/devices');
    }
  }

  submitLogInForm(e) {
    e.preventDefault();
    const { email, password } = this.state;
    const { logIn, history } = this.props;
    logIn({ email, password }, history);
  }

  inputHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { classes, logInError, logInLoading } = this.props;
    return (
      <div>
        <Typography variant='display3'>
          Welcome!
        </Typography>
        <Typography variant='headline'>
          Enter your details below to access your account
        </Typography>
        <form onSubmit={this.submitLogInForm}>
          <FormGroup>
            <FormControl className={classes.signUpFormField}>
              <InputLabel className={classes.fontSize}>Email</InputLabel>
              <Input
                inputProps={{
                  type: 'email',
                  name: 'email',
                  maxLength: '64',
                  required: 'required',
                }}
                className={classes.fontSize}
                onChange={this.inputHandler} />
              <Typography variant='headline'></Typography>
            </FormControl>
            <FormControl className={classes.signUpFormField}>
              <InputLabel className={classes.fontSize}>Password</InputLabel>
              <Input
                inputProps={{
                  type: 'password',
                  name: 'password',
                  required: 'required',
                }}
                className={classes.fontSize}
                onChange={this.inputHandler} />
            </FormControl>
            <FormControl className={classes.signUpFormField}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.rememberMe}
                    onChange={() => this.setState({ rememberMe: !this.state.rememberMe })}
                    value="rememberMe"
                    color="primary"
                  />
                }
                label="Remember me"
                classes={{label: classes.fontSize}}
              />
            </FormControl>
            <Typography variant='headline' className={classes.errorMessage}>
              {logInError ? 'Incorrect credentials' : ' '}
            </Typography>
            <FormControl className={classes.signUpFormField}>
              {logInLoading && <LinearProgress className={classes.progressBar} />}
              <Button
                type='submit'
                variant='raised'
                color='primary'
                className={classes.signUpButton}>
                LOG IN
              </Button>
            </FormControl>
          </FormGroup>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  logIn: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  user: PropTypes.object,
  logInError: PropTypes.bool.isRequired,
  logInLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  user: state.auth.user,
  logInError: state.auth.logInError,
  logInLoading: state.auth.logInLoading,
});
export default withRouter(connect(mapStateToProps, auth)(withStyles(Styles)(Login)));