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
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Typography from 'material-ui/Typography';
import { LinearProgress } from 'material-ui/Progress';
import * as requestsActions from 'ActionCreators/requestsActions';
import Styles from './Styles';
import TextField from 'material-ui/TextField';

class AddRequestModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      expectedDate: '',
    };

    this.inputHandler = this.inputHandler.bind(this);
    this.createNewRequest = this.createNewRequest.bind(this);
  }

  componentWillUnmount() {
    this.props.showAddRequestModal(false);
  }

  inputHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  createNewRequest(e) {
    e.preventDefault();
    const newRequest = {
      message: this.state.message,
      expectedDate: this.state.expectedDate,
    };

    this.props.createRequest(newRequest, this.props.history);
  }

  render() {
    const { classes, createRequestLoading } = this.props;
    return (
      <div>
        <Dialog
          open={this.props.showAddRequestDialog}
          onClose={() => this.props.showAddRequestModal(false)}
          aria-labelledby="form-dialog-title"
          className={classes.modalWidth}
          modal='true'>
          <div className={classes.dialogBox}>
            <DialogTitle className={classes.title} disableTypography>New Request</DialogTitle>
            <DialogContent>
              <DialogContentText className={classes.description}>
                Please enter all needed data into fields,
              </DialogContentText>
              <form
                onSubmit={this.createNewRequest}
                id="createNewRequestForm">
                <FormGroup>
                  <FormControl className={classes.formField}>
                    <InputLabel className={classes.fontSize}>Request:</InputLabel>
                    <Input
                      multiline
                      inputProps={{
                        name: 'message',
                        maxLength: '120',
                        required: 'required',
                      }}
                      onChange={this.inputHandler} />
                    <TextField
                      label="Expected date"
                      type="date"
                      className={classes.inputField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        name: 'expectedDate',
                        required: 'required',
                      }}
                      onChange={this.inputHandler}
                    />
                  </FormControl>  
                </FormGroup>
              </form>
              {createRequestLoading &&
                <LinearProgress className={classes.createOfficeLoadingBar} />
              }
            </DialogContent>
            <Typography variant='headline' className={classes.errorMessage}>
              {this.state.errorMessage}
            </Typography>
            <DialogActions>
              <Button
                onClick={() => this.props.showAddRequestModal(false)}
                className={classes.button}>
                CANCEL
              </Button>
              <Button
                type='submit'
                form='createNewRequestForm'
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

AddRequestModal.propTypes = {
  createRequest: PropTypes.func.isRequired,
  showAddRequestModal: PropTypes.func.isRequired,
  showAddRequestDialog: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  createRequestLoading: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  showAddRequestDialog: state.requests.showAddRequestModal,
  createRequestLoading: state.requests.createRequestLoading,
  user: state.auth.user,
});

export default withRouter(connect(mapStateToProps,
  requestsActions)(withStyles(Styles)(AddRequestModal))
);