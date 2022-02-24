/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { GlobalStyle } from 'styles/global-styles';
import { NotFoundPage } from './pages/NotFoundPage/Loadable';
import { PrivateRoute } from './components/PrivateRoute';
import { appRoutes, authRoutes } from './routes';
import { LicenseInfo } from '@material-ui/x-grid';
import { Layout } from './layout';

export function App() {
  const { i18n } = useTranslation();

  React.useEffect(() => {
    LicenseInfo.setLicenseKey(
      '910442338c3cfc7553591ba3bf89e6e7T1JERVI6MjU5NTgsRVhQSVJZPTE2NTUzMDY3MTUwMDAsS0VZVkVSU0lPTj0x',
    );
  }, []);

  return (
    <BrowserRouter>
      <Helmet
        titleTemplate={'App'}
        defaultTitle={'App'}
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name={'author'} content={'App'} />
      </Helmet>
      <Layout>
        <Switch>
          {authRoutes.map((route, index) => (
            <Route
              key={`auth_main_${index}`}
              path={route.path}
              exact={route.exact}
              children={<route.children />}
            />
          ))}
          {/* PrivateRoute handles authentication redirect */}
          {appRoutes.map((route, index) => (
            <PrivateRoute
              key={`app_main_${index}`}
              path={route.path}
              exact={route.exact}
              children={<route.children />}
            />
          ))}
          {/* Generic route redirect */}
          <Redirect exact path={'/'} to={'/login'} />
          {/* Unknown route handler */}
          <Route component={NotFoundPage} />
        </Switch>
      </Layout>
      <GlobalStyle />
    </BrowserRouter>
  );
}
