import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  Divider,
  Select,
  Input,
} from 'material-ui';
import { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import { withStyles } from 'material-ui/styles';
import { MenuItem } from 'material-ui/Menu';
import { AccountCircle } from 'material-ui-icons';

import Categories from '../Constants/Categories';

const styles = {
  root: {
    flexGrow: 1,
  },
  leftMargin: {
    marginLeft: 50,
  },
  text: {
    marginLeft: 5,
    fontSize: 18,
    flex: 1,
  },
  formControl: {
    minWidth: 70,
  },
  input: {
    minWidth: 200,
    marginRight: 20,
  },
};

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

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Toolbar>
            <img className={classes.leftMargin} src={'http://www.testcon.lt/wp-content/uploads/2015/08/logo-square_400x400.png'} height="40px" width='40px' />
            <Typography variant="title" color="inherit" className={classes.text}>
              DEVBRIDGE <br /> GROUP
            </Typography>

            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="search">Search</InputLabel>
              <Input
                className={classes.input}
                inputProps={{
                  name: 'search',
                  id: 'search',
                }}
              />
            </FormControl>

            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="category-select">Category</InputLabel>
              <Select
                value={this.state.category}
                autoWidth={true}
                onChange={this.handleCategoryChange}
                inputProps={{
                  name: 'category',
                  id: 'category-select',
                }}
              >
                {Categories.map(category => (
                  <MenuItem
                    key={category}
                    value={category}
                  >
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

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
              <Divider />
              <MenuItem onClick={this.handleClose}>Logout</MenuItem>
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