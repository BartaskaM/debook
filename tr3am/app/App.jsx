import React from 'react';
import { hot } from 'react-hot-loader';
import { Router, Route } from 'react-router-dom';
import { CssBaseline } from 'material-ui';
import { Provider } from 'react-redux';
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import store from './Store';
import { MuiThemeProvider } from 'material-ui/styles';

import MainContainer from 'Containers/MainContainer';
import theme from 'Theme/theme';
import history from 'history';

const App = () => (
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <Router history={history}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <CssBaseline>
            <Route path='/' component={MainContainer} />
          </CssBaseline>
        </MuiPickersUtilsProvider>
      </Router>
    </Provider>
  </MuiThemeProvider>
);

export default hot(module)(App);