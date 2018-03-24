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
    };
    this.submitLogInForm =  this.submitLogInForm.bind(this);
  }

  submitLogInForm(e)
  {
    e.preventDefault();
    console.log('Printing results');
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
                className={classes.fontSize}/> 
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
                className={classes.fontSize}/>
            </FormControl>
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