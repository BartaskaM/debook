import React from 'react';
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
import PropTypes from 'prop-types';
import UserLoginData from 'Constants/UserLoginData';
import { Redirect } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMessage: '',
      redirect: false,
    };
    this.submitLogInForm = this.submitLogInForm.bind(this);
    this.inputHandler = this.inputHandler.bind(this);
    this.validateLoginData = this.validateLoginData.bind(this);
  }

  submitLogInForm(e) {
    e.preventDefault();
    const results = {
      email: this.state.email,
      password: this.state.password,
    };
    console.log(results);
    this.validateLoginData();
  }

  inputHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  validateLoginData() {
    const userLoginData = (UserLoginData.find(x => x.email === this.state.email));
    if (userLoginData != null) {
      if (userLoginData.password === this.state.password) {
        this.setState({ errorMessage: '' });
        this.setState({ redirect: true });
        return true;
      }
      else {
        this.setState({ errorMessage: 'Check if you entered correct password' });
        return false;
      }
    }
    else {
      this.setState({ errorMessage: 'Check if you entered correct email' });
      return false;
    }
  }

  render() {
    const { classes } = this.props;
    const { redirect } = this.state;
    if (redirect) {
      return (<Redirect to='/main' />);
    }
    return (
      <div>
        <Typography variant='display3' align='center'>
          Welcome!
        </Typography>
        <Typography variant='headline' align='center'>
          Enter your login data
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
                onBlur={this.inputHandler} />
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
                onBlur={this.inputHandler} />
            </FormControl>
            <Typography variant='headline' className={classes.errorMessage}>
              {this.state.errorMessage}
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
};

export default withStyles(Styles)(Login);