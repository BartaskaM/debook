import React from 'react';
import {
  Input,
  Button,
} from 'material-ui';
import { InputLabel } from 'material-ui/Input';
import {
  FormControl,
  FormGroup,
} from 'material-ui/Form';
import { withStyles } from 'material-ui/styles';
import Styles from './Styles';

class AddOffice extends React.Component {
  constructor() {
    super();
  }

  render() {
    //const { classes } = this.props;
    return (
      <div>
        <form>
          <FormGroup>
            <FormControl>
              <InputLabel>Country:</InputLabel>
              <Input/>
            </FormControl>
            <FormControl>
              <InputLabel>City:</InputLabel>
              <Input/>
            </FormControl>
            <FormControl>
              <InputLabel>Address:</InputLabel>
              <Input/>
            </FormControl>
            <FormControl>
              <InputLabel>Coordinates:</InputLabel>
              <Input/>
            </FormControl>
            <FormControl>
              <Button
                type='submit'
                variant="raised"
                color="primary"
              >
                SUBMIT
              </Button>
            </FormControl>
          </FormGroup>
        </form>
      </div>
    );
  }
}

export default withStyles(Styles)(AddOffice);