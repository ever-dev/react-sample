import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useLocation } from 'react-router-dom';

import { makeStyles, createStyles, Tabs, Tab } from '@material-ui/core';
import { appRoutes } from 'app/routes';
import { getBaseUrl } from 'utils/common';
import { lang } from 'locales/translations';

const useStyles = makeStyles(theme =>
  createStyles({
    navTabsWrapper: {
      padding: '0 20px 0 30px',
      flex: 1,
    },
    navTabs: {
      '& .MuiTab-root': {
        textTransform: 'none',
        height: '64px',
        fontSize: '1rem',
        [theme.breakpoints.down('xs')]: {
          height: '60px',
        },
      },
      '& .MuiTabs-indicator': {
        height: '5px',
      },
    },
    navTab: {
      color: theme.palette.primary.contrastText,
    },
  }),
);

const routesToTabs = {
  settings: false,
  organizations: 0,
};

const NavigationBarTabs = React.memo(function NavigationBarTabs() {
  const classes = useStyles();
  const location = useLocation();
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = React.useState<false | number>(0);

  React.useEffect(() => {
    const locationBase = getBaseUrl(location.pathname);
    appRoutes.forEach(route => {
      if (locationBase === getBaseUrl(route.path)) {
        const routeIndex = routesToTabs[locationBase];
        setActiveTab(routeIndex !== undefined ? routeIndex : 0);
      }
    });
  }, [location.pathname]);

  return (
    <div className={classes.navTabsWrapper}>
      <Tabs className={classes.navTabs} value={activeTab} aria-label={'navigation'}>
        <Tab
          component={RouterLink}
          className={classes.navTab}
          label={t(lang.navbar.organizations)}
          to={'/organizations'}
        />
      </Tabs>
    </div>
  );
});

export default NavigationBarTabs;
