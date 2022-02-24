import { FETCH_COUNTRIES, CLEAR_ALERTS } from './actionTypes';

export interface FetchCountriesAction {
  type: 'FETCH_COUNTRIES';
}

export const fetchCountries = () => {
  const fetchCountriesAction: FetchCountriesAction = {
    type: FETCH_COUNTRIES,
  };
  return fetchCountriesAction;
};

export interface ClearAlertsAction {
  type: 'CLEAR_ALERTS';
}

export const clearAlerts = () => {
  const clearAlertsAction: ClearAlertsAction = {
    type: CLEAR_ALERTS,
  };
  return clearAlertsAction;
};
