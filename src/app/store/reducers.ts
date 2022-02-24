import { combineReducers } from '@reduxjs/toolkit';
import authReducers from '../pages/Auth/store/reducers';
import settingsReducer from '../pages/Settings/store/reducers';
import organizationsReducer from '../pages/Organizations/store/reducers';
import { CountriesState, Country, ProtoCountry } from './types';
import { FETCH_COUNTRIES, FETCH_COUNTRIES_FAILED, FETCH_COUNTRIES_SUCCEEDED } from './actionTypes';

const initialState = {
  isLoading: false,
};

export function countriesReducer(state: CountriesState = initialState, action) {
  switch (action.type) {
    case FETCH_COUNTRIES: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case FETCH_COUNTRIES_SUCCEEDED: {
      const countries: Country[] = action.payload.countries;
      const dictionary = {};
      const data: ProtoCountry[] = [];
      countries.forEach((country: Country) => {
        dictionary[country.value] = {
          name: country.name,
          fields: country.fields.map(countryField => {
            return {
              field: countryField.field,
              display: countryField.display.toLowerCase().replaceAll(' ', '_').replaceAll('/', '_'),
              values: countryField.values,
            };
          }),
        };
        data.push({ name: country.name, value: country.value });
      });
      return {
        data,
        dictionary,
        error: undefined,
        isLoading: false,
      };
    }
    case FETCH_COUNTRIES_FAILED: {
      return {
        data: undefined,
        dictionary: undefined,
        error: action.payload,
        isLoading: false,
      };
    }
    default:
      return state;
  }
}

export default combineReducers({
  auth: authReducers,
  settings: settingsReducer,
  organizations: organizationsReducer,
  countries: countriesReducer,
});
