import * as React from 'react';
import { Provider } from 'react-redux';
import { Store } from '@reduxjs/toolkit';
import { render, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { configureAppStore } from 'store/configureStore';
import { configureMockStore } from 'utils/testUtils';
import { ThemeProvider } from 'styles/theme/ThemeProvider';
import OrganizationDetailsView from '../index';
import { createMemoryHistory } from 'history';

import t from 'locales/en-US/translation.json';
import { Router } from 'react-router-dom';
import { mockOrganizationsData } from 'utils/mocks/organizations';

const renderDetailsPage = (store: Store, history, updateDetails) =>
  render(
    <Provider store={store}>
      <ThemeProvider>
        <Router history={history}>
          <OrganizationDetailsView
            organization={mockOrganizationsData.items[0]}
            updateDetails={updateDetails}
          />
        </Router>
      </ThemeProvider>
    </Provider>,
  );

describe('<OrganizationDetailsView />', () => {
  let store: ReturnType<typeof configureAppStore>;
  let detailsPage: RenderResult;

  const history = createMemoryHistory();
  const route = '/organizations/123';
  history.push(route);

  let orgName,
    contactName,
    emailInput,
    phoneInput,
    countryInput,
    addressInput,
    cityInput,
    stateInput,
    zipCodeInput,
    updateBtn,
    updateDetails;

  beforeEach(async () => {
    store = await configureMockStore();
    // @ts-ignore
    updateDetails = jest.fn(() => Promise.resolve({ status: 200, data: {} }));
    detailsPage = renderDetailsPage(store, history, updateDetails);
    orgName = detailsPage.getByLabelText(t.label.org_name);
    contactName = detailsPage.getByLabelText(t.label.contact_name);
    emailInput = detailsPage.getByLabelText(t.label.email);
    phoneInput = detailsPage.getByLabelText(t.label.phone);
    countryInput = detailsPage.getByLabelText(t.label.country);
    addressInput = detailsPage.getByLabelText(t.address.address);
    cityInput = detailsPage.getByLabelText(t.address.city);
    stateInput = detailsPage.getByLabelText(t.address.state);
    zipCodeInput = detailsPage.getByLabelText(t.address.zip_code);
    updateBtn = detailsPage.getByText(t.action.update);
  });

  it('should render basic information form', () => {
    expect(orgName).toBeInTheDocument();
    expect(contactName).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(phoneInput).toBeInTheDocument();
    expect(countryInput).toBeInTheDocument();
    expect(addressInput).toBeInTheDocument();
    expect(cityInput).toBeInTheDocument();
    expect(stateInput).toBeInTheDocument();
    expect(zipCodeInput).toBeInTheDocument();
    expect(updateBtn).toBeInTheDocument();
  });

  describe('with details changed', () => {
    it('should render cancel button', () => {
      userEvent.type(orgName, ' New');
      userEvent.type(contactName, '1');
      userEvent.type(emailInput, '1');
      userEvent.clear(phoneInput);
      userEvent.type(phoneInput, '5741112222');
      userEvent.type(addressInput, '1');
      userEvent.type(cityInput, '1');
      userEvent.click(stateInput);
      const texasBtn = detailsPage.getByText('Texas');
      userEvent.click(texasBtn);
      userEvent.type(zipCodeInput, '1');
      const cancelBtn = detailsPage.getByText(t.action.cancel);
      expect(cancelBtn).toBeInTheDocument();
    });

    it('should cancel changes when cancel button is clicked', () => {
      userEvent.type(orgName, ' New');
      // Establish the text has been changed
      expect(orgName).toHaveValue(`${mockOrganizationsData.items[0].name} New`);
      // Click cancel
      const cancelBtn = detailsPage.getByText(t.action.cancel);
      userEvent.click(cancelBtn);
      // Check that the original values have been restored and cancel is no longer available
      expect(orgName).toHaveValue(mockOrganizationsData.items[0].name);
      expect(cancelBtn).not.toBeInTheDocument();
    });

    it('should clear and adjust address fields when country is changed', () => {
      userEvent.click(countryInput);
      const canadaBtn = detailsPage.getByText('Canada');
      userEvent.click(canadaBtn);
      expect(addressInput).toHaveValue('');
    });

    it('should submit changes when submit button is clicked', () => {
      userEvent.type(orgName, ' New');
      // Establish the text has been changed
      expect(orgName).toHaveValue(`${mockOrganizationsData.items[0].name} New`);
      // Click update
      const updateBtn = detailsPage.getByText(t.action.update);
      userEvent.click(updateBtn);
      expect(updateDetails).toHaveBeenCalledTimes(1);
    });
  });
});
