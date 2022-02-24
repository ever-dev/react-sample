import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Store } from '@reduxjs/toolkit';
import { RenderResult } from '@testing-library/react';

import { ThemeProvider } from 'styles/theme/ThemeProvider';
import { asyncRender, configureMockStore } from 'utils/testUtils';
import { mockAirlinesData } from 'utils/mocks/airlines';
import * as api from '../../../../Organizations/store/api';
import { fetchOrganizationAirlines } from '../../../../Organizations/store/actions';
import OrganizationAirlinesView from '../index';

import t from 'locales/en-US/translation.json';

const renderOrganizationAirlinesPage = (store: Store) =>
  asyncRender(
    <Provider store={store}>
      <ThemeProvider>
        <BrowserRouter>
          <OrganizationAirlinesView orgId={123} />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>,
  );

describe('<OrganizationAirlinesView />', () => {
  let store: ReturnType<typeof configureMockStore>;
  let organizationAirlinesPage: RenderResult;

  describe('with error', () => {
    beforeEach(async () => {
      store = configureMockStore();
      // @ts-ignore
      api.getOrganizationAirlines = jest.fn(() =>
        Promise.reject({ response: { status: 500, data: {} } }),
      );
      store.dispatch(fetchOrganizationAirlines(123));
      organizationAirlinesPage = await renderOrganizationAirlinesPage(store);
    });

    it('should render error message', () => {
      const errorHeader = organizationAirlinesPage.queryByText(t.alert.server_error_header);
      const errorSubheader = organizationAirlinesPage.queryByText(t.alert.server_error_subheader);
      expect(errorHeader).toBeInTheDocument();
      expect(errorSubheader).toBeInTheDocument();
    });
  });

  describe('with no data', () => {
    beforeEach(async () => {
      store = configureMockStore();
      // @ts-ignore
      api.getOrganizationAirlines = jest.fn(() =>
        Promise.resolve({ status: 200, data: { items: [], total_count: 0 } }),
      );
      store.dispatch(fetchOrganizationAirlines(123));
      organizationAirlinesPage = await renderOrganizationAirlinesPage(store);
    });

    it('should render no airlines message', () => {
      const noAirlinesHeader = organizationAirlinesPage.queryByText(t.airlines.no_airlines_header);
      const noAirlinesSubheader = organizationAirlinesPage.queryByText(
        t.airlines.no_airlines_subheader,
      );
      expect(noAirlinesHeader).toBeInTheDocument();
      expect(noAirlinesSubheader).toBeInTheDocument();
    });
  });

  describe('with data', () => {
    beforeEach(async () => {
      store = configureMockStore({ addons: ['airlines'] });
      organizationAirlinesPage = await renderOrganizationAirlinesPage(store);
    });

    it('should render a table with the organization airlines', () => {
      const airline1: any = organizationAirlinesPage.getByText(
        mockAirlinesData.items[0].airline_name,
      );
      expect(airline1).toBeInTheDocument();
    });
  });
});
