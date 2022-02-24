import * as React from 'react';
import { AppBar, Toolbar, makeStyles, createStyles } from '@material-ui/core';

import NavigationBarBanner from './components/Banner';
import NavigationBarTabs from './components/NavigationTabs';
import NavigationBarAccount from './components/Account';

const useStyles = makeStyles(theme =>
  createStyles({
    navToolbar: {
      backgroundColor: theme.palette.brand.main,
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
    },
  }),
);

const NavigationBar = React.memo(function NavigationBar() {
  const classes = useStyles();
  return (
    <AppBar position={'static'} data-testid={'app-nav-bar'}>
      <Toolbar className={classes.navToolbar}>
        <NavigationBarBanner />
        <NavigationBarTabs />
        <NavigationBarAccount />
      </Toolbar>
    </AppBar>
  );
});

export default NavigationBar;
