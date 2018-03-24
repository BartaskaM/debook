import React from 'react';
import {
  Input,
  Typography,
  Button,
  FormControl,
  FormGroup,
  InputLabel,
  withStyles,
} from 'material-ui';
import Styles from './Styles';
import PropTypes from 'prop-types';
import UserLoginData from '../../Constants/UserLoginData';

class LogIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errorMessage: '',
    };
    this.submitLogInForm =  this.submitLogInForm.bind(this);
    this.inputHandler = this.inputHandler.bind(this);
    this.validateLoginData = this.validateLoginData.bind(this);
  }

  submitLogInForm(e)
  {
    e.preventDefault();
    const results = {
      email: this.state.email,
      password: this.state.password,
    };
    console.log(results);
    this.validateLoginData();
  }

  inputHandler(e)
  {
    //console.log(e.target.name);
    //console.log(e.target.value);
    this.setState({ [e.target.name]: e.target.value });
    //console.log(this.state.email);
    //console.log(this.state.password);
  }

  validateLoginData() {
    for (let i = 0; i < UserLoginData.length; i++) {
      console.log(this.state.email);
      console.log(this.state.password);
      if (this.state.email === UserLoginData[i].email && this.state.password === UserLoginData[i].password) {
        console.log('True');
        this.setState({errorMessage: ''});
        return;
      }
    }
    this.setState({errorMessage: 'Check if you entered correct email and password'});
    console.log(this.state.errorMessage);
    console.log('False');
    //return false;
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
              <InputLabel  className={classes.fontSize}>Email</InputLabel>
              <Input
                inputProps={{
                  type: 'email',
                  name: 'email',
                  maxLength: '64',
                  required: 'required',
                }}
                className={classes.fontSize}
                onBlur={this.inputHandler}/> 
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
                onBlur={this.inputHandler}/>
            </FormControl>
            <Typography variant='headline' className={classes.errorMessage}>
              Blah blah blah
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
LogIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(Styles)(LogIn);