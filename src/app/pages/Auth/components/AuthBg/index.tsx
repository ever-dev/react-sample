import * as React from 'react';
import { createStyles, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    authBg: {
      position: 'fixed',
      top: '0',
      left: '0',
      height: '100vh',
      width: '100vw',
      background: 'radial-gradient(circle at bottom right, #3a95d6, #0a1c35 75%)',
    },
  }),
);

export function AuthBg() {
  const classes = useStyles();
  return <div data-testid={'auth-bg'} className={classes.authBg} />;
}
