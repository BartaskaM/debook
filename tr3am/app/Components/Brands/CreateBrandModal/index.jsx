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
  FormHelperText,
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
import { LinearProgress } from 'material-ui/Progress';
import * as brandsActions from 'ActionCreators/brandsActions';
import { r_url } from 'Utils/regExUtils';

import Styles from './Styles';

class CreateBrandModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brandName: '',
      logoURL: '',
      logoURLErrorMessage: '',
    };
    this.submitBrand = this.submitBrand.bind(this);
    this.inputHandler = this.inputHandler.bind(this);
    this.createBrand = this.createBrand.bind(this);
    this.validateImage = this.validateImage.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
  }

  inputHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  createBrand() {
    const newBrand = {
      name: this.state.brandName,
      image: this.state.logoURL,
    };
    this.props.createBrand(newBrand);
  }

  validateImage() {
    const regImage = new RegExp(r_url);
    if (regImage.exec(this.state.logoURL)) {
      this.setState({ logoURLErrorMessage: '' });
      return true;
    } else {
      this.setState({
        logoURLErrorMessage:
          'Wrong image URL. Make sure you entered correct URL.',
      });
      return false;
    }
  }

  submitBrand(e) {
    e.preventDefault();
    if (this.validateImage())
      this.createBrand();
  }

  closeDialog()
  {
    this.setState({ logoURLErrorMessage: '' });
    this.props.hideCreateBrandModal();
  }

  render() {
    const { classes,
      createBrandLoading,
      showCreateBrandDialog,
    } = this.props;
    return (
      <div>
        <Dialog
          open={showCreateBrandDialog}
          onClose={this.closeDialog}
          aria-labelledby="form-dialog-title"
          className={classes.modalWidth}
          modal='true'>
          <div className={classes.dialogBox}>
            <DialogTitle className={classes.title} disableTypography>Add new brand</DialogTitle>
            <DialogContent>
              <DialogContentText className={classes.description}>
                Please enter all needed data into fields.
              </DialogContentText>
              <form
                onSubmit={this.submitBrand}
                id="createBrandForm">
                <FormGroup>
                  <FormControl className={classes.formField}>
                    <InputLabel className={classes.fontSize}>Brand name:</InputLabel>
                    <Input
                      inputProps={{
                        name: 'brandName',
                        maxLength: '256',
                        required: 'required',
                      }}
                      onChange={this.inputHandler} />
                  </FormControl>
                  <FormControl className={classes.formField}>
                    <InputLabel className={classes.fontSize}>Logo URL:</InputLabel>
                    <Input
                      inputProps={{
                        name: 'logoURL',
                        maxLength: '256',
                        required: 'required',
                      }}
                      onBlur={this.validateImage}
                      onChange={this.inputHandler} />
                    <FormHelperText className={classes.errorMessage}>
                      {this.state.logoURLErrorMessage}
                    </FormHelperText>
                  </FormControl>
                </FormGroup>
              </form>
              {createBrandLoading &&
                <LinearProgress className={classes.createBrandLoadingBar} />
              }
            </DialogContent>
            <DialogActions>
              <Button
                onClick={this.closeDialog}
                className={classes.button}>
                CANCEL
              </Button>
              <Button
                type='submit'
                form='createBrandForm'
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

CreateBrandModal.propTypes = {
  createBrand: PropTypes.func.isRequired,
  hideCreateBrandModal: PropTypes.func.isRequired,
  showCreateBrandDialog: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  createBrandLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  showCreateBrandDialog: state.brands.showCreateBrandModal,
  createBrandLoading: state.brands.createBrandLoading,
  brands: state.offices.offices,
  user: state.auth.user,
});

export default withRouter(connect(mapStateToProps,
  brandsActions)(withStyles(Styles)(CreateBrandModal))
);