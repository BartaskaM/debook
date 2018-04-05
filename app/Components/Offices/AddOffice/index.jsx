// Todo: fix deviceActions Action Creator

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
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as devicesActions from 'ActionCreators/devicesActions';

import Styles from './Styles';

class AddOfficeModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    
    //const { classes } = this.props;
    return (
      <div>
        <Dialog
          open={this.props.showAddOfficeDialog}
          onClose={() => this.props.showAddOfficeModal(false)}>
          <DialogTitle>Test</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Blah
            </DialogContentText>
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
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.props.showAddOfficeModal(false)}>
              SUBMIT
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

AddOfficeModal.propTypes = {
  showAddOfficeModal: PropTypes.func.isRequired,
  showAddOfficeDialog: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  showAddOfficeDialog: state.devices.showAddOfficeModal,
  user: state.auth.user,
});

export default connect(mapStateToProps, devicesActions)(withStyles(Styles)(AddOfficeModal));