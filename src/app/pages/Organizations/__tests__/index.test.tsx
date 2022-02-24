import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Store } from '@reduxjs/toolkit';
import { fireEvent, render, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { configureAppStore } from '../../../../store/configureStore';
import { configureMockStore } from '../../../../utils/testUtils';
import { ThemeProvider } from '../../../../styles/theme/ThemeProvider';
import { mockOrganizationsData } from '../../../../utils/mocks/organizations';
import * as api from '../store/api';
import * as orgsApi from '../store/api';
import { fetchOrganizations } from '../store/actions';
import { OrganizationsPage } from '../index';

import t from 'locales/en-US/translation.json';

const renderOrganizationsPage = (store: Store) =>
  render(
    <Provider store={store}>
      <ThemeProvider>
        <BrowserRouter>
          <OrganizationsPage />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>,
  );

describe('<OrganizationsPage />', () => {
  let store: ReturnType<typeof configureAppStore>;
  let organizationsPage: RenderResult;
  const searchFields = 'name,contact_name,email,phone';

  describe('with error', () => {
    beforeEach(async () => {
      store = await configureMockStore();
      // @ts-ignore
      orgsApi.getOrganizations = jest.fn(() =>
        Promise.reject({ response: { status: 500, data: {} } }),
      );
      store.dispatch(
        fetchOrganizations({
          status: 'active',
          page_size: 10,
          page_number: 1,
        }),
      );
      organizationsPage = renderOrganizationsPage(store);
    });

    it('should render error message', () => {
      const errorHeader = organizationsPage.queryByText(t.alert.server_error_header);
      const errorSubheader = organizationsPage.queryByText(t.alert.server_error_subheader);
      expect(errorHeader).toBeInTheDocument();
      expect(errorSubheader).toBeInTheDocument();
    });
  });

  describe('with no data', () => {
    beforeEach(async () => {
      store = await configureMockStore();
      // @ts-ignore
      orgsApi.getOrganizations = jest.fn(() =>
        Promise.resolve({
          status: 200,
          data: {
            items: [],
            total_count: 0,
          },
        }),
      );
      store.dispatch(
        fetchOrganizations({
          status: 'active',
          page_size: 10,
          page_number: 1,
          search_text: '',
          search_fields: searchFields,
          sort_field: '',
        }),
      );
      organizationsPage = renderOrganizationsPage(store);
    });

    it('should render no organizations message', () => {
      const noOrgsHeader = organizationsPage.queryByText(t.organizations.no_organizations_header);
      const noOrgsSubheader = organizationsPage.queryByText(
        t.organizations.no_organizations_subheader,
      );
      expect(noOrgsHeader).toBeInTheDocument();
      expect(noOrgsSubheader).toBeInTheDocument();
    });
  });

  describe('with data', () => {
    beforeEach(async () => {
      store = await configureMockStore({ addons: ['organizations'] });
      organizationsPage = renderOrganizationsPage(store);
    });

    describe('<SearchTextField />', () => {
      let searchField: any;

      beforeEach(() => {
        searchField = organizationsPage.getByPlaceholderText(t.label.search_placeholder);
      });

      it('should render', () => {
        expect(searchField).toBeInTheDocument();
      });

      it('should send a search request when it loses focus', () => {
        userEvent.click(searchField);
        userEvent.type(searchField, mockOrganizationsData.items[0].name);
        fireEvent.blur(searchField);
        expect(api.getOrganizations).toHaveBeenCalledWith({
          page_number: 1,
          page_size: 10,
          status: 'active',
          search_fields: searchFields,
          search_text: mockOrganizationsData.items[0].name,
          sort_field: '',
        });
      });
    });

    it('should render a table with the organizations', () => {
      const organization1: any = organizationsPage.queryByText(mockOrganizationsData.items[0].name);
      expect(organization1).toBeInTheDocument();
      const organization2: any = organizationsPage.queryByText(mockOrganizationsData.items[1].name);
      expect(organization2).toBeInTheDocument();
    });

    it('should request new items when page size changes', () => {
      const rowsPerPageInput: any = organizationsPage.getByText(10);
      userEvent.click(rowsPerPageInput);
      userEvent.click(organizationsPage.getByText(15));
      expect(api.getOrganizations).toHaveBeenCalledWith({
        page_number: 1,
        page_size: 15,
        status: 'active',
        search_fields: searchFields,
        search_text: '',
        sort_field: '',
      });
    });
  });
});
