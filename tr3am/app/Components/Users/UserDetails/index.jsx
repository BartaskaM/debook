import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Divider from 'material-ui/Divider';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import NavigateBefore from 'material-ui-icons/NavigateBefore';
import Input from 'material-ui/Input';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import { CircularProgress, LinearProgress } from 'material-ui/Progress';
import {
  FormControl,
  FormGroup,
  FormHelperText,
} from 'material-ui/Form';
import validator from 'email-validator';

import { styles } from './Styles';
import * as userDetailsActions from 'ActionCreators/userDetailsActions';
import * as usersActions from 'ActionCreators/usersActions';
import * as officesActions from 'ActionCreators/officesActions';

class UserDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: props.user,
      edit: false,
      validEmail: true,
      validFirstName: true,
      validLastName: true,
      emailErrorMessage: '',
      oldPassword: '',
      newPassword: '',
      repeatPassword: '',
      validOldPassword: true,
      validNewPassword: true,
      newPasswordMatch: true,
    };

    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.validateFirstName = this.validateFirstName.bind(this);
    this.validateLastName = this.validateLastName.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.validateAllPasswords = this.validateAllPasswords.bind(this);
    this.validateAll = this.validateAll.bind(this);
    this.goBackToInfo = this.goBackToInfo.bind(this);
  }

  static getDerivedStateFromProps(nextProps, previousState){
    if(nextProps.user != previousState.user){
      return { user: {...nextProps.user, office: nextProps.user.office.id }};
    }
    return null;
  }

  componentDidMount() {
    const { setUserDetails, match, fetchUser, currentUser } = this.props;
    const id = match.params.id;
    if (id) {
      // Is in /user/:id
      if(parseInt(id) === currentUser.id)
      {
        setUserDetails(currentUser);
      }
      fetchUser(id);
    }
    else {
      // Is in /profile
      setUserDetails(currentUser);
    }
  }

  validateAll(){
    const {validEmail,
      validFirstName,
      validLastName,
      validOldPassword,
      validNewPassword,
      newPasswordMatch,
    } = this.state;
    
    this.validateFirstName();
    this.validateLastName();
    this.validateEmail();
    this.validateAllPasswords();

    return validEmail && 
    validLastName && 
    validFirstName && 
    validOldPassword && 
    validNewPassword && 
    newPasswordMatch;
  }

  checkIfEmail(string){
    return validator.validate(string);
  }

  validateEmail() {
    const email = this.state.user.email;
    if(!this.checkIfEmail(email)){
      this.setState({
        validEmail: false,
        emailErrorMessage: 'Enter valid e-mail.',
      });
    } else {
      this.setState({
        validEmail: true,
        emailErrorMessage: '',
      });
    }
  }

  shouldChangePassword(){
    const { oldPassword, newPassword, repeatPassword } = this.state;
    return oldPassword.length !== 0 || newPassword.length !== 0 || repeatPassword.length !== 0;
  }

  validateNewPassword(){
    const { newPassword } = this.state;
    if(this.shouldChangePassword())
    {
      if(newPassword.length !== 0){
        this.setState({
          validNewPassword: true,
        }); 
      } else {
        this.setState({
          validNewPassword: false,
        }); 
      }          
    } else {
      this.setState({
        validNewPassword: true,
      });  
    }
  }
  
  validateRepeatPassword(){
    const { repeatPassword, newPassword } = this.state;
    if(this.shouldChangePassword())
    {
      if(newPassword === repeatPassword){
        this.setState({
          newPasswordMatch: true,
        }); 
      } else {
        this.setState({
          newPasswordMatch: false,
        }); 
      }          
    } else {
      this.setState({
        newPasswordMatch: true,
      });  
    }
  }

  validateAllPasswords(){
    this.validateNewPassword();
    this.validateRepeatPassword();
  }

  validateFirstName() {
    if(this.state.user.firstName.length === 0) {
      this.setState({validFirstName: false});
    } else {
      this.setState({validFirstName: true});
    }
  }

  validateLastName() {
    if(this.state.user.lastName.length === 0) {
      this.setState({validLastName: false});
    } else {
      this.setState({validLastName: true});
    }
  }

  handleFormChange(e) {
    this.setState({user: {...this.state.user, [e.target.name]: e.target.value }});
  }

  handlePasswordChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleEditClick() {
    const { 
      fetchOffices,
      updateUser,
      currentUser,
      offices,
    } = this.props;
    if(this.state.edit){
      if(this.validateAll()){
        const { user, newPassword } = this.state;
        const office = offices.find(x => x.id === user.office);
        if(this.shouldChangePassword()){
          updateUser({...user, office, password: newPassword}, this.goBackToInfo, true);
        }
        else {
          if(user.id === currentUser.id){
            updateUser({...user, office}, this.goBackToInfo, true);
          } else {
            updateUser({...user, office}, this.goBackToInfo);
          }
        }     
      }   
    } else {
      fetchOffices();
      this.setState({ edit: true });
    }   
  }

  handleCancelClick(){
    const { user } = this.props;
    this.setState({ edit: false, user: { ...user, office: user.office.id } });
  }

  renderProfileInfo(){
    const { classes, user } = this.props;
    const { firstName, lastName, email, slack, office } = user;
    return (
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={2} className={classes.label}>First name:</Grid>
          <Grid item xs={10}>{firstName}</Grid>
        </Grid>
        <Grid container>
          <Grid item xs={2} className={classes.label}>Last name:</Grid>
          <Grid item xs={10}>{lastName}</Grid>
        </Grid>
        <Grid container>
          <Grid item xs={2} className={classes.label}>Email:</Grid>
          <Grid item xs={10}>{email}</Grid>
        </Grid>
        <Grid container>
          <Grid item xs={2} className={classes.label}>Office</Grid>
          <Grid item xs={10}>{office.city}</Grid>
        </Grid>
        <Grid container>
          <Grid item xs={2} className={classes.label}>Slack</Grid>
          <Grid item xs={10}>{slack}</Grid>
        </Grid>
      </Grid>);
  }

  renderButtons(){
    const { edit } = this.state;
    const { currentUser, user } = this.props;
    return ( (user.id === currentUser.id || currentUser.roles.includes('admin')) &&
      <Grid item xs={12}>
        <Grid container >
          <Grid item xs={8}></Grid>
          <Grid item xs={2}>
            {edit && <Button
              variant="raised"
              color="secondary"
              onClick={this.handleCancelClick}
            >
              <span>Cancel</span>
            </Button>}
          </Grid>
          <Grid item xs={2}>
            <Button
              variant="raised"
              color="primary"
              onClick={this.handleEditClick}
            >
              <span>{edit ? 'Done' : 'Edit'}</span>
            </Button>
          </Grid>
        </Grid>
      </Grid>);
  }

  goBackToInfo(){
    this.setState({
      edit: false,
      validEmail: true,
      validFirstName: true,
      validLastName: true,
      emailErrorMessage: '',
      oldPassword: '',
      newPassword: '',
      repeatPassword: '',
      validOldPassword: true,
      validNewPassword: true,
      newPasswordMatch: true,
    });
  }

  renderProfileEdit(){
    const { 
      classes,
      currentUser,
      offices,
      fetchOfficesLoading,
      updateUserError,
    } = this.props;
    const { 
      validFirstName, 
      validLastName, 
      validEmail, 
      oldPassword, 
      newPassword, 
      repeatPassword,
      user,
      validNewPassword,
      validOldPassword,
      newPasswordMatch,
      emailErrorMessage,
    } = this.state;
    const { 
      email, 
      firstName, 
      lastName, 
      slack, 
      office, 
      id, 
    } = user;
    return (
      <Grid item xs={12}>
        <FormGroup>
          <Grid container>
            <Grid item xs={2} className={classes.label}>First name:</Grid>
            <Grid item xs={10}>
              <FormControl className={classes.signUpFormField}>
                <Input
                  value={firstName}
                  className={classes.fontSize}
                  error={!validFirstName}
                  onChange={this.handleFormChange}
                  onBlur={this.validateFirstName}
                  inputProps={{
                    type: 'text',
                    name: 'firstName',
                    maxLength: '32',
                    required: 'required',
                  }}
                />
                <FormHelperText>
                  {!validFirstName ? 'Fill this field.' : ''}
                </FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={2} className={classes.label}>Last name:</Grid>
            <Grid item xs={10}>
              <FormControl className={classes.signUpFormField}>
                <Input
                  className={classes.fontSize}
                  value={lastName}
                  error={!validLastName}
                  onChange={this.handleFormChange}
                  onBlur={this.validateLastName}
                  inputProps={{
                    type: 'text',
                    name: 'lastName',
                    maxLength: '32',
                    required: 'required',
                  }}
                />
                <FormHelperText>
                  {!validLastName ? 'Fill this field.' : ''}
                </FormHelperText>
              </FormControl>
            </Grid>
          </Grid>   
          <Grid container>
            <Grid item xs={2} className={classes.label}>Email:</Grid>
            <Grid item xs={10}>
              <FormControl className={classes.signUpFormField}>
                <Input
                  value={email}
                  className={classes.fontSize}
                  error={!this.state.validEmail || updateUserError.length > 0}
                  onChange={this.handleFormChange}
                  onBlur={this.validateEmail}
                  inputProps={{
                    type: 'email',
                    name: 'email',
                    maxLength: '64',
                    required: 'required',
                  }}
                />
                <FormHelperText>
                  {!validEmail ? emailErrorMessage : updateUserError}
                </FormHelperText>
              </FormControl>
            </Grid> 
          </Grid>         
          <Grid container>
            <Grid item xs={2} className={classes.label}>Office</Grid>
            <Grid item xs={10}>
              <FormControl className={classes.signUpFormField}>
                <span className={classes.wrapper}>
                  <Select
                    value={office}
                    autoWidth={true}
                    onChange={this.handleFormChange}
                    className={classes.fontSize}
                    inputProps={{
                      name: 'office',
                    }}
                  >
                    {offices.map((office, i) => (
                      <MenuItem
                        key={i}
                        value={office.id}
                        className={classes.menuItemWidth}
                      >
                        {office.city}
                      </MenuItem>
                    ))}
                  </Select>
                  {
                    fetchOfficesLoading && 
                  <CircularProgress size={18} className={classes.buttonProgress}/>
                  }
                </span>
                <FormHelperText/>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={2} className={classes.label}>Slack</Grid>
            <Grid item xs={10}>
              <FormControl className={classes.signUpFormField}>
                <Input
                  className={classes.fontSize}
                  value={slack || ''}
                  onChange={this.handleFormChange}
                  inputProps={{
                    type: 'text',
                    name: 'slack',
                    maxLength: '64',
                  }}
                />
                <FormHelperText/>
              </FormControl>
            </Grid>
          </Grid>
          {currentUser.id === id && <div>
            <Grid container>
              <Grid item xs={2} className={classes.label}>Old password</Grid>
              <Grid item xs={10}>
                <FormControl className={classes.signUpFormField}>
                  <Input
                    value= {oldPassword}
                    className={classes.fontSize}
                    error={!validOldPassword}
                    onChange={this.handlePasswordChange}
                    onBlur={this.validateAllPasswords}
                    inputProps={{
                      type: 'password',
                      name: 'oldPassword',
                    }}
                  />
                  <FormHelperText>
                    {!validOldPassword ? 'Wrong password.' : ''}
                  </FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={2} className={classes.label}>New password</Grid>
              <Grid item xs={10}>
                <FormControl className={classes.signUpFormField}>
                  <Input
                    value= {newPassword}
                    className={classes.fontSize}
                    error={!validNewPassword}
                    onChange={this.handlePasswordChange}
                    onBlur={this.validateAllPasswords}
                    inputProps={{
                      type: 'password',
                      name: 'newPassword',
                    }}
                  />
                  <FormHelperText>
                    {!validNewPassword ? 'Fill this field.' : ''}
                  </FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={2} className={classes.label}>Repeat password</Grid>
              <Grid item xs={10}>
                <FormControl className={classes.signUpFormField}>
                  <Input
                    value= {repeatPassword}
                    className={classes.fontSize}
                    error={!newPasswordMatch}
                    onChange={this.handlePasswordChange}
                    onBlur={this.validateAllPasswords}
                    inputProps={{
                      type: 'password',
                      name: 'repeatPassword',
                    }}
                  />
                  <FormHelperText>
                    {!newPasswordMatch ? 'Passwords must match.' : ''}
                  </FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
          </div>}
        </FormGroup>          
      </Grid>           
    );
  }

  render() {
    const { 
      classes,
      history,
      user,
      currentUser,
      fetchingUser,
      updatingUser,
    } = this.props;
    return (
      <div className={classes.root}>
        <Button variant="flat" onClick={history.goBack}>
          <NavigateBefore />
          <span className={classes.bigFont} >Back</span>
        </Button>
        <Divider className={classes.divider} />
        {!user || fetchingUser ?
          <LinearProgress/> :       
          <div>
            {updatingUser && <LinearProgress/>} 
            <Paper className={classes.paper}>
              <Divider className={classes.divider} />
              {
                <span className={classes.header}>
                  {
                    this.props.match.path === '/profile' ?
                      'Profile' :
                      parseInt(this.props.match.params.id) === currentUser.id ?
                        'Profile' :
                        'User info'
                  }
                </span>
              }

              <Divider className={classes.divider} />
              <Grid container className={classes.table}>
                {this.state.edit ? this.renderProfileEdit() : this.renderProfileInfo()}
                {this.renderButtons()}
              </Grid>
            </Paper>
          </div>
        }
      </div>
    );
  }
}

UserDetails.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    office: PropTypes.shape({
      id: PropTypes.number.isRequired,
      city: PropTypes.string.isRequired,
    }).isRequired,
    slack: PropTypes.string,
    roles: PropTypes.arrayOf(PropTypes.string),
  }),
  match: PropTypes.object,
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    roles: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  setUserDetails: PropTypes.func.isRequired,
  fetchUser: PropTypes.func.isRequired,
  fetchingUser: PropTypes.bool.isRequired,
  offices: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    city: PropTypes.string.isRequired,
  })).isRequired,
  fetchOffices: PropTypes.func.isRequired,
  fetchOfficesLoading: PropTypes.bool,
  updateUser: PropTypes.func.isRequired,
  updatingUser: PropTypes.bool.isRequired,
  updateUserError: PropTypes.string.isRequired,
};

const mapStateToProps = store => ({
  currentUser: store.auth.user,
  user: store.userDetails.userDetails,
  users: store.users.users,
  fetchingUser: store.userDetails.fetchingUser,
  offices: store.offices.offices,
  fetchOfficesLoading: store.offices.fetchOfficesLoading,
  updatingUser: store.userDetails.updatingUser,
  updateUserError: store.userDetails.updateUserError,
});

export default withRouter(connect(mapStateToProps, {
  ...userDetailsActions,
  ...usersActions,
  ...officesActions,
})(withStyles(styles)(UserDetails)));