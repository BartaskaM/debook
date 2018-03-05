import React from 'react';
import { render } from 'react-dom';
import Button from 'material-ui/Button';
import './styles.css';

render(
  <div className="greeting">
    Hello! I am a working app. Consult your mentor if you got this far.
    <Button variant="raised" color="primary">
    Hello World
    </Button>
  </div>,
  document.querySelector('.app')
);
