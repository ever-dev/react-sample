import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Store } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';

import { configureMockStore } from '../../../../utils/testUtils';
import { configureAppStore } from '../../../../store/configureStore';
import { PrivateRoute } from '../index';
import { mockUser } from '../../../../utils/mocks/user';

const renderPrivateRoute = (store: Store) =>
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <PrivateRoute path={'/'} children={<div>Private</div>} />
        </Switch>
      </BrowserRouter>
    </Provider>,
  );

describe('<PrivateRoute />', () => {
  it('should render private routes when user is logged in', async () => {
    const authStore = await configureMockStore();
    Object.defineProperty(window.document, 'cookie', {
      writable: true,
      value: `token=${mockUser.auth_token_key}`,
    });
    const authPrivateRoute = renderPrivateRoute(authStore);
    expect(authPrivateRoute.queryByText('Private')).toBeInTheDocument();
    expect(window.location.pathname).toBe('/');
  });

  it('should send user to login when user is logged out', async () => {
    const unAuthStore = await configureAppStore();
    Object.defineProperty(window.document, 'cookie', {
      writable: true,
      value: `token=`,
    });
    const unAuthPrivateRoute = renderPrivateRoute(unAuthStore);
    expect(unAuthPrivateRoute.queryByText('Private')).not.toBeInTheDocument();
    expect(window.location.pathname).toBe('/login');
  });
});
