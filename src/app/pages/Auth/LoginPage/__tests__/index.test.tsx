import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Store } from '@reduxjs/toolkit';
import { render, RenderResult, fireEvent } from '@testing-library/react';

import { configureAppStore } from '../../../../../store/configureStore';
import * as api from '../../store/api';
import { LoginPage } from '../index';

import t from 'locales/en-US/translation.json';

jest.mock('../../store/api');

const renderLoginPage = (store: Store) =>
  render(
    <Provider store={store}>
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    </Provider>,
  );

describe('<LoginPage />', () => {
  let store: ReturnType<typeof configureAppStore>;
  let loginPage: RenderResult;

  beforeEach(() => {
    store = configureAppStore();
    loginPage = renderLoginPage(store);
  });

  it('should render login form', () => {
    const usernameInput: any = loginPage.queryByLabelText(t.label.username);
    expect(usernameInput).toBeInTheDocument();
    const passwordInput: any = loginPage.queryByLabelText(t.label.password);
    expect(passwordInput).toBeInTheDocument();
    const forgotPasswordLink = loginPage.queryByText(t.login.forgot_password_link);
    expect(forgotPasswordLink).toBeInTheDocument();
    const loginBtn = loginPage.queryByText(t.login.submit_button);
    expect(loginBtn).toBeInTheDocument();
  });

  it('should log in with provided credentials', async () => {
    const testUsername = 'test_user';
    const testPassword = 'test_password';
    // @ts-ignore
    api.login = jest.fn(() =>
      Promise.resolve({
        status: 200,
        data: {
          id: 1,
          name: 'Test User',
        },
      }),
    );

    const usernameInput: any = loginPage.getByLabelText(t.label.username);
    fireEvent.change(usernameInput, {
      target: { value: testUsername },
    });
    expect(usernameInput.value).toBe(testUsername);

    const passwordInput: any = loginPage.getByLabelText(t.label.password);
    fireEvent.change(passwordInput, { target: { value: testPassword } });
    expect(passwordInput.value).toBe(testPassword);

    const loginBtn = loginPage.getByText(t.login.submit_button);
    fireEvent.click(loginBtn);

    expect(api.login).toHaveBeenCalledWith({
      username: testUsername,
      password: testPassword,
    });
  });
});
