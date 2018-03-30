import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Row from './Row';
import Divider from 'material-ui/Divider';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import NavigateBefore from 'material-ui-icons/NavigateBefore';

import { styles } from './Styles';

class UserDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: props.user.firstName,
      lastName: props.user.lastName,
      email: props.user.email,
      office: props.user.office,
      slack: props.user.slack,
      edit: false,
    };

    this.changeInfo = this.changeInfo.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
  }

  changeInfo(label, newInfo) {
    this.setState({ [label]: newInfo });
  }

  handleEditClick() {
    //TODO: post changes if needed
    this.setState({ edit: !this.state.edit });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Button variant="flat" onClick={this.props.history.goBack}>
          <NavigateBefore />
          <span className={classes.bigFont} >Back</span>
        </Button>
        <Divider className={classes.divider} />
        <Paper className={classes.paper}>
          <Divider className={classes.divider} />
          <span className={classes.header}>Profile</span>
          <Divider className={classes.divider} />
          <Grid container className={classes.table}>
            <Row
              label="firstname"
              value={this.state.firstName}
              edit={this.state.edit}
              changeInfo={this.changeInfo} />
            <Row
              label="lastname"
              value={this.state.lastName}
              edit={this.state.edit}
              changeInfo={this.changeInfo} />
            <Row
              label="email"
              value={this.state.email}
              edit={this.state.edit}
              changeInfo={this.changeInfo} />
            <Row
              label="office"
              value={this.state.office}
              edit={this.state.edit}
              changeInfo={this.changeInfo} />
            <Row
              label="slack"
              value={this.state.slack}
              edit={this.state.edit}
              changeInfo={this.changeInfo} />
          </Grid>
          <div className={classes.editButtonWrapper}>
            <Button
              variant="raised"
              color="primary"
              className={classes.editButton}
              onClick={this.handleEditClick}
            >
              <span>{this.state.edit ? 'Done' : 'Edit'}</span>
            </Button>
          </div>
        </Paper>
      </div>
    );
  }
}

UserDetails.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    office: PropTypes.string.isRequired,
    slack: PropTypes.string.isRequired,
  }).isRequired,
};

export default withStyles(styles)(withRouter(UserDetails));