import React from 'react';
import PropTypes from 'prop-types';
import Row from './Row';
import { Link } from 'react-router-dom';

import Divider from 'material-ui/Divider';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import NavigateBefore from 'material-ui-icons/NavigateBefore';

const styles = {
  root:{
    margin:'50px 75px',
  },
  paper: {
    padding: 20,
    margin: 20,
  },
  divider: {
    margin: '5px 0',
  },
  bigFont: {
    fontSize: 18,
  },
  header:
  {
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft:10,
  },
  table:{
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 10,
  },
  editButtonWrapper:{
    textAlign: 'right',
  },
  editButton:{
    display: 'inline-block',
  },
};

class Profile extends React.Component {
  constructor(props){
    super(props);
    this.state={
      name:props.user.name,
      email:props.user.email,
      office:props.user.office,
      slack:props.user.slack,
      edit:false,
    };
    this.changeInfo=this.changeInfo.bind(this);
    this.handleEditClick=this.handleEditClick.bind(this);
  }
  changeInfo(label, newInfo){
    const newState={};
    newState[label]=newInfo;
    this.setState(newState);
  }
  handleEditClick(){
    //TODO: post changes if needed
    this.setState({edit:!this.state.edit});
  }
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Link to="/main">
          <Button variant="flat">        
            <NavigateBefore />
            <span className={classes.bigFont} >Back</span>
          </Button>
        </Link>
        <Divider className={classes.divider}/>
        <Paper className={classes.paper}>
          <Divider className={classes.divider}/>
          <span className={classes.header}>Profile</span>
          <Divider className={classes.divider}/>
          <Grid container className={classes.table}>
            <Row label="name" value={this.state.name} edit={this.state.edit} changeInfo={this.changeInfo}/>
            <Row label="email" value={this.state.email} edit={this.state.edit} changeInfo={this.changeInfo}/>
            <Row label="office" value={this.state.office} edit={this.state.edit} changeInfo={this.changeInfo}/>
            <Row label="slack" value={this.state.slack} edit={this.state.edit} changeInfo={this.changeInfo}/>
          </Grid>
          <div className={classes.editButtonWrapper}>
            <Button variant="raised" color="primary" className={classes.editButton} onClick={this.handleEditClick}>        
              <span>{this.state.edit?'Done':'Edit'}</span>
            </Button>
          </div>
        </Paper>
      </div>
    );
  }
}

Profile.propTypes={
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profile);