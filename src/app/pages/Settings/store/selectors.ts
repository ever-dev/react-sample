import { SettingsState } from './types';

interface Store {
  settings?: SettingsState;
}

export const getSettingsStatus = (store: Store) =>
  store.settings?.userSettings?.status || undefined;

export const getSettingsError = (store: Store) => store.settings?.userSettings?.error || undefined;

export const getSettingsLoading = (store: Store) =>
  store.settings?.userSettings?.isLoading || false;

export const getUserPasswordStatus = (store: Store) =>
  store.settings?.userPassword?.status || undefined;

export const getUserPasswordError = (store: Store) =>
  store.settings?.userPassword?.error || undefined;

export const getUserPasswordLoading = (store: Store) =>
  store.settings?.userPassword?.isLoading || false;
