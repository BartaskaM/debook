import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom';
import { CssBaseline } from 'material-ui';
import { Provider } from 'react-redux';
import store from './store';

import MainContainer from './Components/MainContainer';

const App = document.querySelector('.app');

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <CssBaseline>
        <Route path='/' component={MainContainer} />
      </CssBaseline>
    </Router>
  </Provider>, App
);