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
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Provider store={store}>
        <Router history={history}>
          <CssBaseline>
            <Route path='/' component={MainContainer} />
          </CssBaseline>
        </Router>
      </Provider>
    </MuiPickersUtilsProvider>
  </MuiThemeProvider>
);

export default hot(module)(App);