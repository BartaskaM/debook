import React from 'react';
import PropTypes from 'prop-types';
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

class LoginTabs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tabIndex: 0,
    };

    this.handleTabChange = this.handleTabChange.bind(this);
  }

  handleTabChange(event, value) {
    this.setState({
      tabIndex: value,
    });
  }

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={16} justify='center'>
          <Grid item xs={3} />
          <Grid item xs={6}>
            <AppBar position="static" color="inherit">
              <Tabs
                value={this.state.tabIndex}
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
                index={this.state.tabIndex}
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
  tabIndex: PropTypes.number,
};

export default withStyles(Styles, { withTheme: true })(LoginTabs);