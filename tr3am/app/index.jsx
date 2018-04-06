import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom';
import { CssBaseline } from 'material-ui';
import { Provider } from 'react-redux';
import store from './store';
import { MuiThemeProvider } from 'material-ui/styles';

import MainContainer from './Components/MainContainer';
import theme from 'Theme/theme';

const App = document.querySelector('.app');

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <Router>
        <CssBaseline>
          <Route path='/' component={MainContainer} />
        </CssBaseline>
      </Router>
    </Provider>
  </MuiThemeProvider>, App
);