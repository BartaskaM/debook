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

import Styles from './Styles';
import Categories from '../../Constants/Categories';
import LinkButton from './LinkButton';

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

  renderNavigationBarLinks() {
    return (
      <span>
        <LinkButton to='/main' title='MainTabs' />
        <LinkButton to='/login' title='LoginTabs' />
        <LinkButton to='/profile' title='Profile' />
        <LinkButton to='/devices/1' title='Device id 1' />
        <LinkButton to='/offices/1' title='Office id 1' />
      </span>
    );
  }

  renderSearchForm() {
    const { classes } = this.props;
    return (
      <span>
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
                key={category.id}
                value={category.title}
                className={classes.fontSize}
              >
                {category.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </span>
    );
  }

  renderProfileMenu() {
    const { classes } = this.props;
    return (
      <span>
        <IconButton
          aria-owns={this.state.userMenuOpen ? 'menu-appbar' : null}
          aria-haspopup="true"
          onClick={this.handleMenu}
          color="inherit"
        >
          <AccountCircle className={classes.menuButton}/>
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
            <MenuItem className={classes.fontSize} onClick={this.handleClose}>Profile</MenuItem>
          </Link>
          <Divider />
          <MenuItem className={classes.fontSize} onClick={this.handleClose}>Logout</MenuItem>
        </Menu>
      </span>
    );
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

            {this.renderNavigationBarLinks()}

            <div className={classes.rightMenu}>
              {this.renderSearchForm()}
              {this.renderProfileMenu()}
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

export default withStyles(Styles)(Header);