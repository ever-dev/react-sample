import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Redirect } from 'react-router-dom';
import { Store } from '@reduxjs/toolkit';
import { render, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { configureMockStore } from '../../../../utils/testUtils';
import { ThemeProvider } from '../../../../styles/theme/ThemeProvider';
import { mockUser } from '../../../../utils/mocks/user';
import { appRoutes } from '../../../routes';
import NavigationBar from '../index';

import t from 'locales/en-US/translation.json';

const renderNavigationBar = (store: Store) =>
  render(
    <Provider store={store}>
      <ThemeProvider>
        <BrowserRouter>
          <Redirect to={appRoutes[0].path} />
          <NavigationBar />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>,
  );

describe('<NavigationBar />', () => {
  let store: ReturnType<typeof configureMockStore>;
  let navigationBar: RenderResult;

  beforeEach(() => {
    store = configureMockStore();
    navigationBar = renderNavigationBar(store);
  });

  it('should render App logo', () => {
    const logo: any = navigationBar.getByTitle('App');
    expect(logo).toBeInTheDocument();
  });

  describe('<NavTabsWrapper />', () => {
    it('should render Organizations tab', () => {
      expect(navigationBar.getByText(t.navbar.organizations)).toBeInTheDocument();
    });
  });

  describe('<AccountWrapper />', () => {
    let accountBtn: any;

    beforeEach(() => {
      accountBtn = navigationBar.getByLabelText('account of current user');
    });

    it('should render account button', () => {
      expect(accountBtn).toBeInTheDocument();
    });

    it('should render dropdown menu', () => {
      expect(navigationBar.getByText(mockUser.name)).toBeInTheDocument();
      expect(navigationBar.getByText(mockUser.organization.name)).toBeInTheDocument();
      expect(navigationBar.getByText(t.navbar.settings)).toBeInTheDocument();
      expect(navigationBar.getByText(t.navbar.log_out)).toBeInTheDocument();
    });

    it('should dispatch log out action when user clicks log out button', () => {
      const logoutBtn = navigationBar.getByText(t.navbar.log_out);
      store.dispatch = jest.fn();
      userEvent.click(accountBtn);
      userEvent.click(logoutBtn);
      expect(store.dispatch).toHaveBeenCalledWith({ type: 'LOG_OUT', payload: '' });
    });
  });
});
