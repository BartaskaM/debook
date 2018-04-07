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
    this.state = {
      country: '',
      city: '',
      address: '',
      LAT: 0,
      LNG: 0,
    };
    this.submitOffice = this.submitOffice.bind(this);
    this.inputHandler = this.inputHandler.bind(this);
  }

  inputHandler(e) {
    console.log(e.target.name);
    console.log(e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  }

  submitOffice()
  {
    const { offices, addOffice } = this.props;
    const testItem = {
      id: offices.length + 1,
      country: this.state.country,
      city: this.state.city,
      address: this.state.address,
      lat: this.state.LAT,
      lng: this.state.LNG,
    };
    console.log(testItem);
    addOffice(testItem);
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
                  <Input
                    inputProps={{
                      name: 'country',
                      maxLength: '255',
                      required: 'required',
                    }}
                    onChange={this.inputHandler} />
                </FormControl>
                <FormControl>
                  <InputLabel className={classes.fontSize}>City:</InputLabel>
                  <Input
                    inputProps={{
                      name: 'city',
                      maxLength: '255',
                      required: 'required',
                    }}
                    onChange={this.inputHandler} />
                </FormControl>
                <FormControl>
                  <InputLabel className={classes.fontSize}>Address:</InputLabel>
                  <Input
                    inputProps={{
                      name: 'address',
                      maxLength: '255',
                      required: 'required',
                    }}
                    onChange={this.inputHandler} />
                </FormControl>
                <FormControl>
                  <InputLabel className={classes.fontSize}>LAT:</InputLabel>
                  <Input
                    inputProps={{
                      name: 'LAT',
                      maxLength: '255',
                      required: 'required',
                    }}
                    onChange={this.inputHandler}
                    type='number'/>
                </FormControl>
                <FormControl>
                  <InputLabel className={classes.fontSize}>LNG:</InputLabel>
                  <Input
                    inputProps={{
                      name: 'LNG',
                      maxLength: '255',
                      required: 'required',
                    }}
                    onChange={this.inputHandler}
                    type='number'/>
                </FormControl>
              </FormGroup>
            </form>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.submitOffice}
              color="primary"
              className={classes.button}>
              SUBMIT
            </Button>
            <Button
              onClick={() => this.props.showAddOfficeModal(false)}
              className={classes.button}>
              CANCEL
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

AddOfficeModal.propTypes = {
  addOffice: PropTypes.func.isRequired,
  showAddOfficeModal: PropTypes.func.isRequired,
  showAddOfficeDialog: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  offices: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    country: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  })).isRequired,
};

const mapStateToProps = (state) => ({
  showAddOfficeDialog: state.offices.showAddOfficeModal,
  offices: state.offices.offices,
  user: state.auth.user,
});

export default connect(mapStateToProps, officesActions)(withStyles(Styles)(AddOfficeModal));