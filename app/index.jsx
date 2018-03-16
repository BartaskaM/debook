import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom';

import MainContainer from './Components/MainContainer';

const App = document.querySelector('.app');

ReactDOM.render(
  <Router>
    <Route path='/' component={MainContainer}/>
  </Router>, App
);