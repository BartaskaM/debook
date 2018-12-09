import React from 'react';
import { withRouter } from 'react-router-dom';
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
  DialogTitle,
} from 'material-ui/Dialog';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Typography from 'material-ui/Typography';
import { LinearProgress } from 'material-ui/Progress';
import * as requestDetailsActions from 'ActionCreators/requestDetailsActions';
import Styles from './Styles';

class AddMessageModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };

    this.inputHandler = this.inputHandler.bind(this);
    this.createNewMessage = this.createNewMessage.bind(this);
  }

  componentWillUnmount() {
    this.props.showAddMessageModal(false);
  }

  inputHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  createNewMessage(e) {
    e.preventDefault();

    const newMessage = {
      text: this.state.message,
      requestId: this.props.request.id,
    };

    this.props.createMessage(newMessage, this.props.history);
  }

  render() {
    const { classes, createMessageLoading } = this.props;
    return (
      <div>
        <Dialog
          open={this.props.showAddMessageDialog}
          onClose={() => this.props.showAddMessageModal(false)}
          aria-labelledby="form-dialog-title"
          className={classes.modalWidth}
          modal='true'>
          <div className={classes.dialogBox}>
            <DialogTitle className={classes.title} disableTypography>New response</DialogTitle>
            <DialogContent>
              <form
                onSubmit={this.createNewMessage}
                id="createNewMessageForm">
                <FormGroup>
                  <FormControl className={classes.formField}>
                    <InputLabel className={classes.fontSize}>Response</InputLabel>
                    <Input
                      multiline
                      inputProps={{
                        name: 'message',
                        maxLength: '120',
                        required: 'required',
                      }}
                      onChange={this.inputHandler} />
                  </FormControl>  
                </FormGroup>
              </form>
              {createMessageLoading &&
                <LinearProgress className={classes.createMessageLoadingBar} />
              }
            </DialogContent>
            <Typography variant='headline' className={classes.errorMessage}>
              {this.state.errorMessage}
            </Typography>
            <DialogActions>
              <Button
                onClick={() => this.props.showAddMessageModal(false)}
                className={classes.button}>
                CANCEL
              </Button>
              <Button
                type='submit'
                form='createNewMessageForm'
                color="primary"
                className={classes.button}>
                SUBMIT
              </Button>
            </DialogActions>
          </div>
        </Dialog>
      </div>

    );
  }
}

AddMessageModal.propTypes = {
  createMessage: PropTypes.func.isRequired,
  showAddMessageModal: PropTypes.func.isRequired,
  showAddMessageDialog: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  createMessageLoading: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  request: PropTypes.object,
};

const mapStateToProps = (state) => ({
  showAddMessageDialog: state.requestDetails.showAddMessageModal,
  createMessageLoading: state.requestDetails.createMessageLoading,
  createMessage: state.requestDetails.createMessage,
  user: state.auth.user,
  request: state.requestDetails.request,
});

export default withRouter(connect(mapStateToProps,
  requestDetailsActions)(withStyles(Styles)(AddMessageModal))
);