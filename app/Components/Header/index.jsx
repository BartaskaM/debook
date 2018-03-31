import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Select from 'material-ui/Select';
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
import Categories from '../../Constants/Categories';
import LinkButton from './LinkButton';
import { connect } from 'react-redux';
import * as devicesActions from '../../ActionCreators/devicesActions';

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
        <LinkButton to='/devices' title='Devices' />
        <LinkButton to='/offices' title='Offices' />
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
            value={this.props.modelFilter}
            onChange={(e) => this.props.setModelFilter(e.target.value)}
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
      <AppBar position="sticky" color='inherit' className={classes.root}>
        <Toolbar>
          <img
            className={classes.leftMargin}
            src={'http://www.testcon.lt/wp-content/uploads/2015/08/logo-square_400x400.png'}
            height="40px"
            width='40px'
          />
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
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  setModelFilter: PropTypes.func.isRequired,
  modelFilter: PropTypes.string.isRequired,
};

const mapStateToProps = state => {
  return {
    modelFilter: state.devices.modelFilter,
  };
};
export default connect(mapStateToProps, devicesActions)(withStyles(Styles)(Header));