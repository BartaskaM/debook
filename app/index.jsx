import React from 'react';
import { render } from 'react-dom';
import './styles.css';

render(
  <div className="greeting">
    Hello!
    I am a working app. Consult your mentor if you got this far.
  </div>,
  document.querySelector('.app')
);
