import { CountriesState } from './types';

interface Store {
  countries?: CountriesState;
}

export const getCountriesData = (store: Store) => store.countries?.data || undefined;

export const getCountriesDictionary = (store: Store) => store.countries?.dictionary || undefined;

export const getCountriesError = (store: Store) => store.countries?.error || undefined;

export const getCountriesLoading = (store: Store) => store.countries?.isLoading || false;
