import React from 'react';
import {
  Input,
  Typography,
  Button,
  FormControl,
  FormGroup,
  InputLabel,
} from 'material-ui';

class LogIn extends React.Component {


  render() {
    return (
      <div>
        <Typography variant='display3'>
          Welcome!
        </Typography>
        <Typography variant='headline'>
          Enter your login data
        </Typography>
        <form method='POST'>
          <FormGroup>
            <FormControl>
              <InputLabel>Email</InputLabel>
              <Input/>
              <Typography variant='headline'></Typography>
            </FormControl>
            <FormControl>
              <InputLabel>Password</InputLabel>
              <Input/>
              </FormControl>
            <FormControl>
              <Button>
                LOG IN
              </Button>
            </FormControl>
          </FormGroup>
        </form>
      </div>
    );
  }
}

export default LogIn;