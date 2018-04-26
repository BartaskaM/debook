import React from 'react';
import {
  Input,
  Typography,
  Button,
  Select,
} from 'material-ui';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import {
  FormControl,
  FormGroup,
} from 'material-ui/Form';
import { withStyles } from 'material-ui/styles';

import Styles from './Styles';

class NewDevice extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      deviceActive: true,
      deviceName: '',
    };

    this.inputHandler = this.inputHandler.bind(this);
  }

  inputHandler(e) {
    console.log('Working something');
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div>
        <form method='POST'>
          <FormGroup>
            <Typography variant='headline'>
          Please fill in you details in the form below
            </Typography>
            <FormControl>
              <InputLabel>Device status</InputLabel>
              <div>
                <Select
                  value={this.state.deviceActive}
                  autoWidth={true}
                  inputProps={{
                    name: 'deviceActive',
                  }}
                  onChange={this.inputHandler}
                >
                  <MenuItem value={true}>Active</MenuItem>
                  <MenuItem value={false}>Non Active</MenuItem>
                </Select>
              </div>
            </FormControl>
            <FormControl>
              <InputLabel>Device name</InputLabel>
              <Input
                value={this.state.deviceName}
                onChange={this.inputHandler}
                inputProps={{
                  name: 'deviceName',
                }}
              />
            </FormControl>
            <FormControl>
              <Button
                type='submit'
                variant="raised"
                color="primary"
              >
                SAVE DEVICE
              </Button>
              <Button
                variant="raised"
                color="primary"
              >
                CANCEL
              </Button>
            </FormControl>
          </FormGroup>
        </form>
      </div>
    );
  }
}

export default withStyles(Styles)(NewDevice);