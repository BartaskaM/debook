import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Input from 'material-ui/Input';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { InputLabel } from 'material-ui/Input';
import {
  FormControl,
  FormGroup,
} from 'material-ui/Form';
import { withStyles } from 'material-ui/styles';

import Styles from './Styles';
import * as auth from 'ActionCreators/authActions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.submitLogInForm = this.submitLogInForm.bind(this);
    this.inputHandler = this.inputHandler.bind(this);
  }

  static getDerivedStateFromProps(nextProps, previousState){
    if (nextProps.user) {
      nextProps.history.push('/devices');
    }
    return previousState;
  }

  submitLogInForm(e) {
    e.preventDefault();
    const { email, password } = this.state;
    this.props.logIn({ email, password });
  }

  inputHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { classes } = this.props;
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
            <Typography variant='headline' className={classes.errorMessage}>
              {this.props.showError ? 'Incorrect credentials' : ' '}
            </Typography>
            <FormControl className={classes.signUpFormField}>
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
  showError: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  user: state.auth.user,
  showError: state.auth.showError,
});
export default withRouter(connect(mapStateToProps, auth)(withStyles(Styles)(Login)));