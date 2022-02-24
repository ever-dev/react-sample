import * as React from 'react';
import { Provider } from 'react-redux';
import { Store } from '@reduxjs/toolkit';
import { render, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { configureAppStore } from 'store/configureStore';
import { configureMockStore } from 'utils/testUtils';
import { ThemeProvider } from 'styles/theme/ThemeProvider';
import OrganizationProfilesView from '../index';
import { createMemoryHistory } from 'history';

import t from 'locales/en-US/translation.json';
import { Router } from 'react-router-dom';
import { mockOrganizationsData } from 'utils/mocks/organizations';

const renderProfilesPage = (store: Store, history, updateProfiles) =>
  render(
    <Provider store={store}>
      <ThemeProvider>
        <Router history={history}>
          <OrganizationProfilesView
            profiles={mockOrganizationsData.items[0].profiles}
            updateProfiles={updateProfiles}
          />
        </Router>
      </ThemeProvider>
    </Provider>,
  );

describe('<OrganizationProfilesView />', () => {
  let store: ReturnType<typeof configureAppStore>;
  let profilesPage: RenderResult;

  const history = createMemoryHistory();
  const route = '/organizations/123/profiles';
  history.push(route);

  let adminSelect,
    shipperSelect,
    ratePartnerSelect,
    cartageSelect,
    demoSelect,
    updateBtn,
    updateDetails;

  beforeEach(async () => {
    store = await configureMockStore();
    // @ts-ignore
    updateDetails = jest.fn(() => Promise.resolve({ status: 200, data: {} }));
    profilesPage = renderProfilesPage(store, history, updateDetails);
    adminSelect = profilesPage.getByLabelText(t.organizations.profiles.admin);
    shipperSelect = profilesPage.getByLabelText(t.organizations.profiles.shipper);
    ratePartnerSelect = profilesPage.getByLabelText(t.organizations.profiles.ratepartner);
    cartageSelect = profilesPage.getByLabelText(t.organizations.profiles.cartage);
    demoSelect = profilesPage.getByLabelText(t.organizations.profiles.demo);
    updateBtn = profilesPage.queryByText(t.action.update);
  });

  it('should render profiles form', () => {
    expect(adminSelect).toBeInTheDocument();
    expect(shipperSelect).toBeInTheDocument();
    expect(ratePartnerSelect).toBeInTheDocument();
    expect(cartageSelect).toBeInTheDocument();
    expect(demoSelect).toBeInTheDocument();
    expect(updateBtn).toBeInTheDocument();
    const cancelBtn = profilesPage.queryByText(t.action.cancel);
    expect(cancelBtn).not.toBeInTheDocument();
  });

  describe('with details changed', () => {
    it('should render cancel button', () => {
      userEvent.click(adminSelect);
      userEvent.click(shipperSelect);
      userEvent.click(ratePartnerSelect);
      userEvent.click(cartageSelect);
      userEvent.click(demoSelect);
      const cancelBtn = profilesPage.queryByText(t.action.cancel);
      expect(cancelBtn).toBeInTheDocument();
    });

    it('should cancel changes when cancel button is clicked', () => {
      userEvent.click(adminSelect);
      userEvent.click(shipperSelect);
      userEvent.click(ratePartnerSelect);
      userEvent.click(cartageSelect);
      userEvent.click(demoSelect);
      // Click cancel
      const cancelBtn = profilesPage.getByText(t.action.cancel);
      userEvent.click(cancelBtn);
      // Check that the original values have been restored and cancel is no longer available
      expect(adminSelect).not.toBeChecked();
      expect(shipperSelect).not.toBeChecked();
      expect(ratePartnerSelect).not.toBeChecked();
      expect(cartageSelect).not.toBeChecked();
      expect(demoSelect).not.toBeChecked();
      expect(cancelBtn).not.toBeInTheDocument();
    });

    it('should submit changes when submit button is clicked', () => {
      userEvent.click(adminSelect);
      userEvent.click(shipperSelect);
      userEvent.click(ratePartnerSelect);
      userEvent.click(cartageSelect);
      userEvent.click(demoSelect);
      // Click update
      userEvent.click(updateBtn);
      expect(updateDetails).toHaveBeenCalledTimes(1);
    });
  });
});
