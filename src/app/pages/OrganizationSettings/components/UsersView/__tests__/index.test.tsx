import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Store } from '@reduxjs/toolkit';
import { fireEvent, getByLabelText, getByText, render, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { configureAppStore } from 'store/configureStore';
import { configureMockStore } from 'utils/testUtils';
import { ThemeProvider } from 'styles/theme/ThemeProvider';
import { mockOrganizationUsersData } from 'utils/mocks/organizationUsers';
import * as api from '../../../../Organizations/store/api';
import { fetchOrganizationUsers } from '../../../../Organizations/store/actions';
import OrganizationUserView from '../index';

import t from 'locales/en-US/translation.json';

const renderOrganizationUsersPage = (store: Store) =>
  render(
    <Provider store={store}>
      <ThemeProvider>
        <BrowserRouter>
          <OrganizationUserView orgId={1} />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>,
  );

describe('<OrganizationUserView />', () => {
  let store: ReturnType<typeof configureAppStore>;
  let organizationUsersPage: RenderResult;
  const searchFields = 'username,name,email,phone';

  describe('with error', () => {
    beforeEach(async () => {
      store = await configureMockStore();
      // @ts-ignore
      api.getOrganizationUsers = jest.fn(() =>
        Promise.reject({ response: { status: 500, data: {} } }),
      );
      store.dispatch(
        fetchOrganizationUsers({
          organization: 1,
          status: 'active',
          page_size: 10,
          page_number: 1,
        }),
      );
      organizationUsersPage = renderOrganizationUsersPage(store);
    });

    it('should render error message', () => {
      const errorHeader = organizationUsersPage.queryByText(t.alert.server_error_header);
      const errorSubheader = organizationUsersPage.queryByText(t.alert.server_error_subheader);
      expect(errorHeader).toBeInTheDocument();
      expect(errorSubheader).toBeInTheDocument();
    });
  });

  describe('with no data', () => {
    beforeEach(async () => {
      store = await configureMockStore();
      // @ts-ignore
      api.getOrganizationUsers = jest.fn(() =>
        Promise.resolve({
          status: 200,
          data: {
            items: [],
            total_count: 0,
          },
        }),
      );
      store.dispatch(
        fetchOrganizationUsers({
          organization: 1,
          status: 'active',
          page_size: 10,
          page_number: 1,
          search_text: '',
          search_fields: searchFields,
          sort_field: '',
        }),
      );
      organizationUsersPage = renderOrganizationUsersPage(store);
    });

    it('should render no users message', () => {
      const noUsersHeader = organizationUsersPage.queryByText(t.users.no_users_header);
      const noUsersSubheader = organizationUsersPage.queryByText(t.users.no_users_subheader);
      expect(noUsersHeader).toBeInTheDocument();
      expect(noUsersSubheader).toBeInTheDocument();
    });
  });

  describe('with data', () => {
    beforeEach(async () => {
      store = await configureMockStore({ addons: ['users'] });
      // @ts-ignore
      api.deleteOrganizationUsers = jest.fn(() =>
        Promise.resolve({
          status: 200,
          data: {},
        }),
      );
      organizationUsersPage = renderOrganizationUsersPage(store);
    });

    describe('<SearchTextField />', () => {
      let searchField: any;

      beforeEach(() => {
        searchField = organizationUsersPage.getByPlaceholderText(t.label.search_placeholder);
      });

      it('should render', () => {
        expect(searchField).toBeInTheDocument();
      });

      it('should send a search request when it loses focus', () => {
        userEvent.click(searchField);
        userEvent.type(searchField, mockOrganizationUsersData.items[0].name);
        fireEvent.blur(searchField);
        expect(api.getOrganizationUsers).toHaveBeenCalledWith({
          organization: 1,
          page_number: 1,
          page_size: 10,
          status: 'active,invite,lockout',
          search_fields: searchFields,
          search_text: mockOrganizationUsersData.items[0].name,
          sort_field: '',
        });
      });
    });

    it('should render a table with the organization users', () => {
      const organization1: any = organizationUsersPage.queryByText(
        mockOrganizationUsersData.items[0].name,
      );
      expect(organization1).toBeInTheDocument();
    });

    it('should request new items when page size changes', () => {
      const rowsPerPageInput: any = organizationUsersPage.getByText(10);
      userEvent.click(rowsPerPageInput);
      userEvent.click(organizationUsersPage.getByText(15));
      expect(api.getOrganizationUsers).toHaveBeenCalledWith({
        organization: 1,
        page_number: 1,
        page_size: 15,
        status: 'active,invite,lockout',
        search_fields: searchFields,
        search_text: '',
        sort_field: '',
      });
    });

    it('should delete single user', () => {
      const checkbox: any = organizationUsersPage.container.querySelector(
        'div[data-id="1"] input[type="checkbox"]',
      );
      checkbox.style.pointerEvents = 'all';
      userEvent.click(checkbox);
      const deleteButton: any = organizationUsersPage.getByText('Delete');
      userEvent.click(deleteButton);
      const confirmButton: any = document.querySelector('#confirm_delete_from_dialog');
      userEvent.click(confirmButton);
      expect(api.deleteOrganizationUsers).toBeCalledWith([1]);
    });

    it('should delete multiple users', () => {
      for (let i = 1; i < 3; i++) {
        const checkbox: any = organizationUsersPage.container.querySelector(
          `div[data-id="${i}"] input[type="checkbox"]`,
        );
        checkbox.style.pointerEvents = 'all';
        userEvent.click(checkbox);
      }
      const deleteButton: any = organizationUsersPage.getByText('Delete');
      userEvent.click(deleteButton);
      const confirmButton: any = document.querySelector('#confirm_delete_from_dialog');
      userEvent.click(confirmButton);
      expect(api.deleteOrganizationUsers).toBeCalledWith([1, 2]);
    });
  });

  describe('Create User', () => {
    beforeEach(async () => {
      store = await configureMockStore({ addons: ['users'] });
      // @ts-ignore
      api.postOrganizationUser = jest.fn(() =>
        Promise.resolve({
          status: 200,
          data: {},
        }),
      );
      organizationUsersPage = renderOrganizationUsersPage(store);
    });

    it('should create user', () => {
      const createUserBtn: any = organizationUsersPage.container.querySelector(
        '#create_org_user_btn',
      );
      userEvent.click(createUserBtn);

      const drawerContainer: any = document.querySelector('#create_org_user_drawer');
      const usernameField: any = getByLabelText(drawerContainer, 'Username');
      const contactNameField: any = getByLabelText(drawerContainer, 'Contact Name');
      const emailField: any = getByLabelText(drawerContainer, 'Email');
      const submitButton: any = getByText(drawerContainer, 'Create');

      userEvent.type(usernameField, 'username');
      userEvent.type(contactNameField, 'Contact Name');
      userEvent.type(emailField, 'test@test.com');
      userEvent.click(submitButton);

      expect(api.postOrganizationUser).toBeCalledWith({
        organization: 1,
        username: 'username',
        name: 'Contact Name',
        email: 'test@test.com',
        phone: '',
      });
    });
  });
});
