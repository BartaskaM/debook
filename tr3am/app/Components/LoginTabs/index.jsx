import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';
import {
  AppBar,
  Paper,
  Tabs,
  Grid,
} from 'material-ui';
import { withStyles } from 'material-ui/styles';
import { Tab } from 'material-ui/Tabs';

import Styles from './Styles';
import TabContainer from './TabContainer';
import SignUp from './SignUp';
import Login from './Login';
import * as authActions from 'ActionCreators/authActions';

class LoginTabs extends React.Component {
  constructor(props) {
    super(props);
    this.handleTabChange = this.handleTabChange.bind(this);
  }

  handleTabChange(event, value) {
    this.props.setCurrentTab(value);
  }

  render() {
    const { classes, theme, currentTab } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={16} justify='center'>
          <Grid item xs={3} />
          <Grid item xs={6}>
            <AppBar position="static" color="inherit">
              <Tabs
                value={currentTab}
                onChange={this.handleTabChange}
                indicatorColor='primary'
                textColor='primary'
                centered
              >
                <Tab label='LOG IN' classes={{label: classes.fontSize}}/>
                <Tab label='SIGN UP' classes={{label: classes.fontSize}}/>
              </Tabs>
            </AppBar>
          </Grid>
          <Grid item xs={3} />

          <Grid item xs={6}>
            <Paper>
              <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={currentTab}
                onChangeIndex={this.handleTabChange}
              >
                <TabContainer dir={theme.direction}>
                  <Login/>
                </TabContainer>
                <TabContainer dir={theme.direction}>
                  <SignUp changeTab={this.handleTabChange} />
                </TabContainer>
              </SwipeableViews>
            </Paper>
          </Grid>
        </Grid>
      </div >
    );
  }
}

LoginTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  setCurrentTab: PropTypes.func.isRequired,
  currentTab: PropTypes.number.isRequired,
};

const mapStateToProps = store => ({
  currentTab: store.auth.currentTab,
});

export default connect(mapStateToProps, authActions)(withStyles(
  Styles, 
  { withTheme: true }
)(LoginTabs));