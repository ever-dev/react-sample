import * as React from 'react';
import * as appApi from 'app/store/api';
import * as authApi from 'app/pages/Auth/store/api';
import * as orgsApi from 'app/pages/Organizations/store/api';
import { render, RenderResult } from '@testing-library/react';
import { login } from 'app/pages/Auth/store/actions';
import { configureAppStore } from '../store/configureStore';
import { mockUser } from './mocks/user';
import { mockOrganizationsData } from './mocks/organizations';
import {
  fetchOrganizationAirlines,
  fetchOrganizations,
  fetchOrganizationUsers,
} from 'app/pages/Organizations/store/actions';
import { mockOrganizationUsersData } from './mocks/organizationUsers';
import { LicenseInfo } from '@material-ui/x-grid';
import { mockCountriesData } from './mocks/countries';
import { fetchCountries } from 'app/store/actions';
import { mockAirlinesData } from './mocks/airlines';
import { wait } from '@testing-library/user-event/dist/utils';

jest.mock('../app/pages/Auth/store/api');

type MockAddons = 'organizations' | 'users' | 'airlines';

interface MockStoreProps {
  addons?: MockAddons[];
}

export const configureMockStore = (props?: MockStoreProps) => {
  const store = configureAppStore();
  LicenseInfo.setLicenseKey(
    '910442338c3cfc7553591ba3bf89e6e7T1JERVI6MjU5NTgsRVhQSVJZPTE2NTUzMDY3MTUwMDAsS0VZVkVSU0lPTj0x',
  );
  // @ts-ignore
  authApi.login = jest.fn(() =>
    Promise.resolve({
      status: 200,
      data: mockUser,
    }),
  );
  store.dispatch(login({ username: 'username', password: 'password' }));
  // @ts-ignore
  appApi.getCountries = jest.fn(() =>
    Promise.resolve({
      status: 200,
      data: mockCountriesData,
    }),
  );
  store.dispatch(fetchCountries());
  if (props && props.addons) {
    const addons = props.addons;
    if (addons.indexOf('organizations') !== -1) {
      // @ts-ignore
      orgsApi.getOrganizations = jest.fn(() =>
        Promise.resolve({
          status: 200,
          data: mockOrganizationsData,
        }),
      );
      store.dispatch(
        fetchOrganizations({
          status: 'active',
          page_size: 10,
          page_number: 1,
        }),
      );
    }
    if (addons.indexOf('users') !== -1) {
      // @ts-ignore
      orgsApi.getOrganizationUsers = jest.fn(() =>
        Promise.resolve({
          status: 200,
          data: mockOrganizationUsersData,
        }),
      );
      store.dispatch(
        fetchOrganizationUsers({
          organization: 1,
          status: 'active',
          page_size: 10,
          page_number: 1,
        }),
      );
    }
    if (addons.indexOf('airlines') !== -1) {
      // @ts-ignore
      orgsApi.getOrganizationAirlines = jest.fn(() =>
        Promise.resolve({ status: 200, data: mockAirlinesData }),
      );
      store.dispatch(fetchOrganizationAirlines(123));
    }
  }
  return store;
};

export const asyncRender = async (ui: React.ReactElement) => {
  const elem: RenderResult = render(ui);
  await wait(0);
  return elem;
};
