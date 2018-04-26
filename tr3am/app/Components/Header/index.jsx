import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import Toolbar from 'material-ui/Toolbar';
import AppBar from 'material-ui/AppBar';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import { withStyles } from 'material-ui/styles';
import Menu, { MenuItem } from 'material-ui/Menu';
import { AccountCircle } from 'material-ui-icons';

import Styles from './Styles';
import PathsWithLists from 'Constants/PathsWithLists';
import * as devicesActions from '../../ActionCreators/devicesActions';
import * as authActions from '../../ActionCreators/authActions';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      anchorEl: null,
      userMenuOpen: false,
      category: '',
    };

    this.handleMenu = this.handleMenu.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.renderBranding = this.renderBranding.bind(this);
    this.renderSearchForm = this.renderSearchForm.bind(this);
    this.renderProfileMenu = this.renderProfileMenu.bind(this);
  }

  handleMenu(event) {
    this.setState({
      anchorEl: event.currentTarget,
      userMenuOpen: true,
    });
  }

  handleClose() {
    this.setState({
      anchorEl: null,
      userMenuOpen: false,
    });
  }

  handleCategoryChange(event) {
    this.setState({
      category: event.target.value,
    });
  }

  renderBranding() {
    const { classes } = this.props;
    return (
      <span className={classes.homeButton} onClick={() => this.props.history.push('/devices')}>
        <img
          className={classes.leftMargin}
          src={'http://www.testcon.lt/wp-content/uploads/2015/08/logo-square_400x400.png'}
          height="40px"
          width='40px'
        />
        <Typography variant="title" color="inherit" className={classes.text}>
          DEVBRIDGE
          <br />
          GROUP
        </Typography>
      </span>
    );
  }

  renderSearchForm() {
    const { classes } = this.props;
    return PathsWithLists.includes(this.props.location.pathname) ? (
      <span>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="search" className={classes.fontSize}>Search</InputLabel>
          <Input
            className={classes.input}
            value={this.props.modelFilter}
            onChange={(e) => this.props.setModelFilter(e.target.value)}
            inputProps={{
              name: 'search',
              id: 'search',
            }}
          />
        </FormControl>
      </span>
    ) : '';
  }

  renderProfileMenu() {
    const { classes } = this.props;
    return  this.props.user ? (
      <span>
        <IconButton
          aria-owns={this.state.userMenuOpen ? 'menu-appbar' : null}
          aria-haspopup="true"
          onClick={this.handleMenu}
          color="inherit"
        >
          <AccountCircle className={classes.menuButton} />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={this.state.anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={this.state.userMenuOpen}
          onClose={this.handleClose}
        >
          <MenuItem
            className={classes.fontSize}
            onClick={() => {
              this.handleClose();
              this.props.history.push('/profile');
            }}
          >
            Profile
          </MenuItem>
          <Divider />
          <MenuItem
            className={classes.fontSize}
            onClick={() => {
              this.handleClose();
              this.props.logOutUser();
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </span>
    ) : '';
  }

  render() {
    const { classes } = this.props;
    return (
      <AppBar position="sticky" color='inherit' className={classes.root}>
        <Toolbar>
          {this.renderBranding()}

          <div className={classes.rightMenu}>
            {this.renderSearchForm()}
            {this.renderProfileMenu()}
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  setModelFilter: PropTypes.func.isRequired,
  modelFilter: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  logOutUser: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  user: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    modelFilter: state.devices.modelFilter,
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { ...devicesActions, ...authActions }
  )(withStyles(Styles)(Header))
);