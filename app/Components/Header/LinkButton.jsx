import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import { Button } from 'material-ui';

import Styles from './Styles';

const render = Props => {
  const { classes } = Props;
  return (
    <Link to={Props.to}>
      <Button variant="raised" className={classes.button}>
        {Props.title}
      </Button>
    </Link>
  );
};

export default withStyles(Styles)(render);