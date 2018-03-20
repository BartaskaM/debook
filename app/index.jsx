import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom';
import { CssBaseline } from 'material-ui';

import MainContainer from './Components/MainContainer';

const App = document.querySelector('.app');

ReactDOM.render(
  <Router>
    <CssBaseline>
      <Route path='/' component={MainContainer} />
    </CssBaseline>
  </Router>, App
);