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
import UserLoginData from 'Constants/User';
import * as auth from 'ActionCreators/authActions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMessage: '',
    };
    this.submitLogInForm = this.submitLogInForm.bind(this);
    this.inputHandler = this.inputHandler.bind(this);
    this.validateLoginData = this.validateLoginData.bind(this);
  }
  
  componentWillMount(){
    if(Object.keys(this.props.user).length !== 0){
      this.props.history.push('/devices');
    }
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
        this.props.setUserInfo(userLoginData);
        this.props.history.push('/main');
      }
      else {
        this.setState({ errorMessage: 'Check your credentials!' });
      }
    }
    else {
      this.setState({ errorMessage: 'Check your credentials!' });
    }
  }

  render() {
    const { classes } = this.props;
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
  setUserInfo: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.auth.user,
});
export default withRouter(connect(mapStateToProps,auth)(withStyles(Styles)(Login)));