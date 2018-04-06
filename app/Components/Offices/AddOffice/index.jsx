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
import * as officesActions from 'ActionCreators/officesActions';

import Styles from './Styles';

class AddOfficeModal extends React.Component {
  constructor(props) {
    super(props);
  }

  submutOffice()
  {
    this.props.showAddOfficeModal(false);
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Dialog
          open={this.props.showAddOfficeDialog}
          onClose={() => this.props.showAddOfficeModal(false)}
          aria-labelledby="form-dialog-title"
          className={classes.modalWidth}>
          
          <DialogTitle className={classes.title} disableTypography>Add new office</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter all needed data into fields,
            </DialogContentText>
            <form>
              <FormGroup>
                <FormControl>
                  <InputLabel className={classes.fontSize}>Country:</InputLabel>
                  <Input/>
                </FormControl>
                <FormControl>
                  <InputLabel  className={classes.fontSize}>City:</InputLabel>
                  <Input/>
                </FormControl>
                <FormControl>
                  <InputLabel  className={classes.fontSize}>Address:</InputLabel>
                  <Input/>
                </FormControl>
                <FormControl>
                  <InputLabel  className={classes.fontSize}>Coordinates:</InputLabel>
                  <Input/>
                </FormControl>
              </FormGroup>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.submitOffice} color="primary">
              SUBMIT
            </Button>
            <Button onClick={() => this.props.showAddOfficeModal(false)}>
              CANCEL
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
  showAddOfficeDialog: state.offices.showAddOfficeModal,
  user: state.auth.user,
});

export default connect(mapStateToProps, officesActions)(withStyles(Styles)(AddOfficeModal));