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
  Button,
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
  },
  formControl: {
    minWidth: 100,
  },
  input: {
    minWidth: 200,
    marginRight: 20,
    fontSize: 14,
  },
  fontSize: {
    fontSize: 14,
  },
  button: {
    fontSize: 10,
    margin: 10,
  },
  rightMenu: {
    position: 'absolute',
    right: 10,
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

            <Link to='/login'>
              <Button variant="raised" color="primary" className={classes.button}>
                LoginTabs
              </Button>
            </Link>
            <Link to='/main'>
              <Button variant="raised" color="primary" className={classes.button}>
                MainTabs
              </Button>
            </Link>
            <Link to='/profile'>
              <Button variant="raised" color="primary" className={classes.button}>
                Profile
              </Button>
            </Link>
            <Link to='/devices/1'>
              <Button variant="raised" color="primary" className={classes.button}>
                Device id 1
              </Button>
            </Link>
            <Link to='/offices/1'>
              <Button variant="raised" color="primary" className={classes.button}>
                Office id 1
              </Button>
            </Link>

            <div className={classes.rightMenu}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="search" className={classes.fontSize}>Search</InputLabel>
                <Input
                  className={classes.input}
                  inputProps={{
                    name: 'search',
                    id: 'search',
                  }}
                />
              </FormControl>

              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="category-select" className={classes.fontSize}>Category</InputLabel>
                <Select
                  value={this.state.category}
                  autoWidth={true}
                  onChange={this.handleCategoryChange}
                  className={classes.fontSize}
                  inputProps={{
                    name: 'category',
                    id: 'category-select',
                  }}
                >
                  {Categories.map(category => (
                    <MenuItem
                      key={category}
                      value={category}
                      className={classes.fontSize}
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
                <Link to='/profile'>
                  <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                </Link>
                <Divider />
                <MenuItem onClick={this.handleClose}>Logout</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
      </div >
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);