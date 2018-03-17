import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
} from 'material-ui';
import { withStyles } from 'material-ui/styles';
import { MenuItem } from 'material-ui/Menu';
import { AccountCircle } from 'material-ui-icons';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
};

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      anchorEl: null,
      userMenuOpen: false,
    };

    this.handleMenu = this.handleMenu.bind(this);
    this.handleClose = this.handleClose.bind(this);
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

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="title" color="inherit" className={classes.flex}>
              DEVBRIDGE <br /> GROUP
            </Typography>
            <IconButton
              aria-owns={this.state.userMenuOpen ? 'menu-appbar' : null}
              aria-haspopup="true"
              onClick={this.handleMenu}
              className={classes.menuButton}
              color="inherit"
            >
              <AccountCircle />
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
              <MenuItem onClick={this.handleClose}>Profile</MenuItem>
              <MenuItem onClick={this.handleClose}>My account</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        <ul>
          <li><Link to='/login'>LoginTabs</Link></li>
          <li><Link to='/main'>MainTabs</Link></li>
          <li><Link to='/profile'>Profile</Link></li>
          <li><Link to='/devices/1'>Device id 1</Link></li>
          <li><Link to='/offices/1'>Office id 1</Link></li>
        </ul>
      </div >
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);