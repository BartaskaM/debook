import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
} from 'material-ui';
import { withStyles } from 'material-ui/styles';
import Dialog, {
  DialogActions,
  DialogTitle,
} from 'material-ui/Dialog';

import Styles from './Styles';

class ConfirmationModal extends React.Component {
  render() {
    const { classes, headerMessage, showDialog, onConfirm, onCancel } = this.props;
    return (
      <div>
        <Dialog
          open={showDialog}
          aria-labelledby="form-dialog-title"
          className={classes.modalWidth}
          modal='true'>
          <div className={classes.dialogBox}>
            <DialogTitle className={classes.title} disableTypography>{headerMessage}</DialogTitle>
            <DialogActions>
              <Button
                onClick={onCancel}
                className={classes.button}>
                CANCEL
              </Button>
              <Button
                type='submit'
                form='createBrandForm'
                color="primary"
                onClick={onConfirm}
                className={classes.button}>
                CONFIRM
              </Button>
            </DialogActions>
          </div>
        </Dialog>
      </div>
    );
  }
}

ConfirmationModal.propTypes = {
  classes: PropTypes.object.isRequired,
  headerMessage: PropTypes.string.isRequired,
  showDialog: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default withStyles(Styles)(ConfirmationModal);