import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Store } from '@reduxjs/toolkit';
import { render, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { configureMockStore } from 'utils/testUtils';
import { ThemeProvider } from 'styles/theme/ThemeProvider';
import * as api from '../../Organizations/store/api';
import { OrganizationSettingsPage } from '../index';

import t from 'locales/en-US/translation.json';
import { mockOrganizationsData } from '../../../../utils/mocks/organizations';

window.history.pushState({}, 'Organization Details', '/');

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: '1',
  }),
}));

const renderOrganizationSettingsPage = (store: Store) =>
  render(
    <Provider store={store}>
      <ThemeProvider>
        <BrowserRouter>
          <OrganizationSettingsPage />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>,
  );

describe('<OrganizationSettingsPage />', () => {
  let store: ReturnType<typeof configureMockStore>;
  let organizationSettingsPage: RenderResult;

  describe('Details tab', () => {
    describe('with error', () => {
      beforeEach(async () => {
        store = await configureMockStore();
        // @ts-ignore
        api.getOrganization = jest.fn(() =>
          Promise.reject({ response: { status: 500, data: {} } }),
        );
        organizationSettingsPage = renderOrganizationSettingsPage(store);
      });

      it('should render error message', () => {
        const errorHeader = organizationSettingsPage.queryByText(t.alert.server_error_header);
        const errorSubheader = organizationSettingsPage.queryByText(t.alert.server_error_subheader);
        expect(errorHeader).toBeInTheDocument();
        expect(errorSubheader).toBeInTheDocument();
      });

      it('should be able to retry on error message', () => {
        const errorRetry = organizationSettingsPage.getByText(t.action.retry);
        userEvent.click(errorRetry);
        expect(api.getOrganization).toHaveBeenCalledTimes(2);
      });
    });

    describe('with data', () => {
      beforeEach(async () => {
        store = await configureMockStore();
        // @ts-ignore
        api.getOrganization = jest.fn(() =>
          Promise.resolve({ status: 200, data: mockOrganizationsData.items[0] }),
        );
        organizationSettingsPage = renderOrganizationSettingsPage(store);
      });

      it('should render organization details page', () => {
        const detailsTab = organizationSettingsPage.queryAllByText(
          t.organizations.details_tabs.details,
        )[0];
        expect(detailsTab).toHaveClass('MuiTab-wrapper');
        const detailsHeader = organizationSettingsPage.queryAllByText(
          t.organizations.details_tabs.details,
        )[1];
        expect(detailsHeader).toHaveClass('MuiTypography-h5');
      });
    });
  });

  describe('Profiles tab', () => {
    describe('with error', () => {
      beforeEach(async () => {
        store = await configureMockStore();
        // @ts-ignore
        api.getOrganization = jest.fn(() =>
          Promise.reject({ response: { status: 500, data: {} } }),
        );
        organizationSettingsPage = renderOrganizationSettingsPage(store);
        window.history.pushState = jest.fn();
        const profilesTab = organizationSettingsPage.getByText(
          t.organizations.details_tabs.profiles,
        );
        userEvent.click(profilesTab);
      });

      it('should render error message', () => {
        const errorHeader = organizationSettingsPage.queryByText(t.alert.server_error_header);
        const errorSubheader = organizationSettingsPage.queryByText(t.alert.server_error_subheader);
        expect(errorHeader).toBeInTheDocument();
        expect(errorSubheader).toBeInTheDocument();
      });

      it('should be able to retry on error message', () => {
        const errorRetry = organizationSettingsPage.getByText(t.action.retry);
        userEvent.click(errorRetry);
        expect(api.getOrganization).toHaveBeenCalledTimes(2);
      });
    });

    describe('with data', () => {
      beforeEach(async () => {
        store = await configureMockStore();
        // @ts-ignore
        api.getOrganization = jest.fn(() =>
          Promise.resolve({ status: 200, data: mockOrganizationsData.items[0] }),
        );
        organizationSettingsPage = renderOrganizationSettingsPage(store);
        window.history.pushState = jest.fn();
        const profilesTab = organizationSettingsPage.getByText(
          t.organizations.details_tabs.profiles,
        );
        userEvent.click(profilesTab);
      });

      it('should render organization profiles page', () => {
        const profilesTab = organizationSettingsPage.queryAllByText(
          t.organizations.details_tabs.profiles,
        )[0];
        expect(profilesTab).toHaveClass('MuiTab-wrapper');
        const profilesHeader = organizationSettingsPage.queryAllByText(
          t.organizations.details_tabs.profiles,
        )[1];
        expect(profilesHeader).toHaveClass('MuiTypography-h5');
      });
    });
  });

  describe('Users tab', () => {
    describe('with data', () => {
      beforeEach(async () => {
        store = await configureMockStore();
        // @ts-ignore
        api.getOrganization = jest.fn(() =>
          Promise.resolve({ status: 200, data: mockOrganizationsData.items[0] }),
        );
        organizationSettingsPage = renderOrganizationSettingsPage(store);
        window.history.pushState = jest.fn();
        const usersTab = organizationSettingsPage.getByText(t.organizations.details_tabs.users);
        userEvent.click(usersTab);
      });

      it('should render organization users page', () => {
        const usersTab = organizationSettingsPage.queryAllByText(
          t.organizations.details_tabs.users,
        )[0];
        expect(usersTab).toHaveClass('MuiTab-wrapper');
        const usersHeader = organizationSettingsPage.queryAllByText(
          t.organizations.details_tabs.users,
        )[1];
        expect(usersHeader).toHaveClass('MuiTypography-h5');
      });
    });
  });

  describe('Airlines tab', () => {
    describe('with data', () => {
      beforeEach(async () => {
        store = await configureMockStore({ addons: ['airlines'] });
        // @ts-ignore
        api.getOrganization = jest.fn(() =>
          Promise.resolve({ status: 200, data: mockOrganizationsData.items[0] }),
        );
        organizationSettingsPage = renderOrganizationSettingsPage(store);
        window.history.pushState = jest.fn();
        const airlinesTab = organizationSettingsPage.getByText(
          t.organizations.details_tabs.airlines,
        );
        userEvent.click(airlinesTab);
      });

      it('should render organization airlines page', () => {
        const airlinesTab = organizationSettingsPage.queryAllByText(
          t.organizations.details_tabs.airlines,
        )[0];
        expect(airlinesTab).toHaveClass('MuiTab-wrapper');
        const airlinesHeader = organizationSettingsPage.queryAllByText(
          t.organizations.details_tabs.airlines,
        )[1];
        expect(airlinesHeader).toHaveClass('MuiTypography-h5');
      });
    });
  });

  describe('Contacts tab', () => {
    describe('with data', () => {
      beforeEach(async () => {
        store = await configureMockStore();
        // @ts-ignore
        api.getOrganization = jest.fn(() =>
          Promise.resolve({ status: 200, data: mockOrganizationsData.items[0] }),
        );
        organizationSettingsPage = renderOrganizationSettingsPage(store);
        window.history.pushState = jest.fn();
        const contactsTab = organizationSettingsPage.getByText(
          t.organizations.details_tabs.contacts,
        );
        userEvent.click(contactsTab);
      });

      it('should render organization contacts page', () => {
        const contactsTab = organizationSettingsPage.queryAllByText(
          t.organizations.details_tabs.contacts,
        )[0];
        expect(contactsTab).toHaveClass('MuiTab-wrapper');
        const contactsHeader = organizationSettingsPage.queryAllByText(
          t.organizations.details_tabs.contacts,
        )[1];
        expect(contactsHeader).toHaveClass('MuiTypography-h5');
      });
    });
  });

  describe('Cartage tab', () => {
    describe('with data', () => {
      beforeEach(async () => {
        store = await configureMockStore();
        // @ts-ignore
        api.getOrganization = jest.fn(() =>
          Promise.resolve({ status: 200, data: mockOrganizationsData.items[0] }),
        );
        organizationSettingsPage = renderOrganizationSettingsPage(store);
        window.history.pushState = jest.fn();
        const cartageTab = organizationSettingsPage.getByText(t.organizations.details_tabs.cartage);
        userEvent.click(cartageTab);
      });

      it('should render organization cartage page', () => {
        const cartageTab = organizationSettingsPage.queryAllByText(
          t.organizations.details_tabs.cartage,
        )[0];
        expect(cartageTab).toHaveClass('MuiTab-wrapper');
        const cartageHeader = organizationSettingsPage.queryAllByText(
          t.organizations.details_tabs.cartage,
        )[1];
        expect(cartageHeader).toHaveClass('MuiTypography-h5');
      });
    });
  });

  describe('Alerts tab', () => {
    describe('with data', () => {
      beforeEach(async () => {
        store = await configureMockStore();
        // @ts-ignore
        api.getOrganization = jest.fn(() =>
          Promise.resolve({ status: 200, data: mockOrganizationsData.items[0] }),
        );
        organizationSettingsPage = renderOrganizationSettingsPage(store);
        window.history.pushState = jest.fn();
        const alertsTab = organizationSettingsPage.getByText(t.organizations.details_tabs.alerts);
        userEvent.click(alertsTab);
      });

      it('should render organization alerts page', () => {
        const alertsTab = organizationSettingsPage.queryAllByText(
          t.organizations.details_tabs.alerts,
        )[0];
        expect(alertsTab).toHaveClass('MuiTab-wrapper');
        const alertsHeader = organizationSettingsPage.queryAllByText(
          t.organizations.details_tabs.alerts,
        )[1];
        expect(alertsHeader).toHaveClass('MuiTypography-h5');
      });
    });
  });
});
