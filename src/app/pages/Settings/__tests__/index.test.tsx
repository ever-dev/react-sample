import * as React from 'react';
import { Provider } from 'react-redux';
import { Store } from '@reduxjs/toolkit';
import { render, RenderResult } from '@testing-library/react';

import { configureAppStore } from '../../../../store/configureStore';
import { configureMockStore } from '../../../../utils/testUtils';
import { ThemeProvider } from '../../../../styles/theme/ThemeProvider';
import { SettingsPage } from '../index';
import { createMemoryHistory } from 'history';

import t from 'locales/en-US/translation.json';
import { Router } from 'react-router-dom';

const renderSettingsPage = (store: Store, history) =>
  render(
    <Provider store={store}>
      <ThemeProvider>
        <Router history={history}>
          <SettingsPage />
        </Router>
      </ThemeProvider>
    </Provider>,
  );

describe('<SettingsPage />', () => {
  let store: ReturnType<typeof configureAppStore>;
  let settingsPage: RenderResult;

  const history = createMemoryHistory();
  const route = '/';
  history.push(route);

  beforeEach(() => {
    store = configureMockStore();
    settingsPage = renderSettingsPage(store, history);
  });

  it('should render basic information form', () => {
    const usernameInput: any = settingsPage.queryByLabelText(t.label.username);
    expect(usernameInput).toBeInTheDocument();
    const nameInput: any = settingsPage.queryByLabelText(t.label.name);
    expect(nameInput).toBeInTheDocument();
    const emailInput: any = settingsPage.queryByLabelText(t.label.email);
    expect(emailInput).toBeInTheDocument();
    const phoneInput: any = settingsPage.queryByLabelText(t.label.phone);
    expect(phoneInput).toBeInTheDocument();
    const updateBtn: any = settingsPage.queryByText(t.action.update);
    expect(updateBtn).toBeInTheDocument();
  });

  it('should render password reset form', () => {
    const currentPInput: any = settingsPage.queryByLabelText(t.label.current_password);
    expect(currentPInput).toBeInTheDocument();
    const newPInput: any = settingsPage.queryByLabelText(t.label.new_password);
    expect(newPInput).toBeInTheDocument();
    const confirmPInput: any = settingsPage.queryByLabelText(t.label.confirm_password);
    expect(confirmPInput).toBeInTheDocument();
    const resetBtn: any = settingsPage.queryByText(t.reset_password.submit_button);
    expect(resetBtn).toBeInTheDocument();
  });
});
