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
import {
  FormControl,
  FormGroup,
  FormHelperText,
} from 'material-ui/Form';
import validator from 'email-validator';

import { styles } from './Styles';
import Offices from 'Constants/Offices';
import users from 'Constants/User';
import * as usersActions from 'ActionCreators/usersActions';

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
    } else if (email != this.props.user.email && 
      users.map(user => user.email).includes(this.state.user.email)) {
      this.setState({
        validEmail: false,
        emailErrorMessage: 'This email is in use.',
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

  validateOldPassword(){
    const { oldPassword } = this.state;
    if (this.shouldChangePassword() )
    {
      if (oldPassword !== this.props.currentUser.password) {
        this.setState({validOldPassword: false});
      } else {
        this.setState({validOldPassword: true});
      }
    } else {
      this.setState({
        validOldPassword: true,
      });
    }
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
    this.validateOldPassword();
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
    if(this.state.edit){
      if(this.validateAll()){
        const { user, newPassword } = this.state;
        this.props.setUsers([...this.props.users].map( usr => {
          if(usr.id == user.id){
            if(this.shouldChangePassword()){
              return {...user, password: newPassword};
            }
            else {
              return {...user};
            }           
          } else {
            return usr;
          }
        }));
        
        this.setState({ edit: false });
      }
    } else {
      this.setState({ edit: true });
    }   
  }

  handleCancelClick(){
    this.setState({ edit: false, user: this.props.user });
  }

  renderProfileInfo(){
    const { classes } = this.props;
    const { firstName, lastName, email, slack, office } = this.state.user;
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
          <Grid item xs={10}>{office}</Grid>
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
    return ( (user.id === currentUser.id || currentUser.role === 'admin') &&
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

  renderProfileEdit(){
    const { classes, currentUser } = this.props;
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
                  error={!this.state.validEmail}
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
                  {!validEmail ? emailErrorMessage : ''}
                </FormHelperText>
              </FormControl>
            </Grid> 
          </Grid>         
          <Grid container>
            <Grid item xs={2} className={classes.label}>Office</Grid>
            <Grid item xs={10}>
              <FormControl className={classes.signUpFormField}>
                <Select
                  value={office}
                  autoWidth={true}
                  onChange={this.handleFormChange}
                  className={classes.fontSize}
                  inputProps={{
                    name: 'office',
                  }}
                >
                  {Offices.map(office => (
                    <MenuItem
                      key={office.id}
                      value={office.city}
                      className={classes.menuItemWidth}
                    >
                      {office.city}
                    </MenuItem>
                  ))}
                </Select>
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
                  value={slack}
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
    const { classes, history } = this.props;
    return (
      <div className={classes.root}>
        <Button variant="flat" onClick={history.goBack}>
          <NavigateBefore />
          <span className={classes.bigFont} >Back</span>
        </Button>
        <Divider className={classes.divider} />
        <Paper className={classes.paper}>
          <Divider className={classes.divider} />
          <span className={classes.header}>Profile</span>
          <Divider className={classes.divider} />
          <Grid container className={classes.table}>
            {this.state.edit ? this.renderProfileEdit() : this.renderProfileInfo()}
            {this.renderButtons()}
          </Grid>
        </Paper>
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
    office: PropTypes.string.isRequired,
    slack: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  }).isRequired,
  match: PropTypes.object,
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    admin: PropTypes.bool.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
  users: PropTypes.array.isRequired,
  setUsers: PropTypes.func.isRequired,
};

const mapStateToProps = store => ({
  currentUser: store.auth.user,
  users: store.users.users,
});

export default withRouter(connect(mapStateToProps,usersActions)(withStyles(styles)(UserDetails)));