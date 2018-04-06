import React from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { CssBaseline } from 'material-ui';
import { Provider } from 'react-redux';
import store from './Store';
import { MuiThemeProvider } from 'material-ui/styles';

import MainContainer from 'Containers/MainContainer';
import theme from 'Theme/theme';

const App = () => (
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <Router>
        <CssBaseline>
          <Route path='/' component={MainContainer} />
        </CssBaseline>
      </Router>
    </Provider>
  </MuiThemeProvider>
);

export default hot(module)(App);