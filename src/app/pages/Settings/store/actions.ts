import {
  CLEAR_SETTINGS_CONTEXT,
  UPDATE_SETTINGS,
  CLEAR_USER_PASSWORD_CONTEXT,
  UPDATE_USER_PASSWORD,
} from './actionTypes';
import { UserPassword, UserSettings } from './types';

export interface ClearSettingsContextAction {
  type: 'CLEAR_SETTINGS_CONTEXT';
}

export const clearSettingsContext = () => {
  const clearSettingsContextAction: ClearSettingsContextAction = {
    type: CLEAR_SETTINGS_CONTEXT,
  };
  return clearSettingsContextAction;
};

export interface UpdateSettingsAction {
  type: 'UPDATE_SETTINGS';
  payload: UserSettings;
}

export const updateSettings = (d: UserSettings) => {
  const updateSettingsAction: UpdateSettingsAction = {
    type: UPDATE_SETTINGS,
    payload: d,
  };
  return updateSettingsAction;
};

export interface ClearUserPasswordContextAction {
  type: 'CLEAR_USER_PASSWORD_CONTEXT';
}

export const clearUserPasswordContext = () => {
  const clearUserPasswordContextAction: ClearUserPasswordContextAction = {
    type: CLEAR_USER_PASSWORD_CONTEXT,
  };
  return clearUserPasswordContextAction;
};

export interface UpdateUserPasswordAction {
  type: 'UPDATE_USER_PASSWORD';
  payload: UserPassword;
}

export const updateUserPassword = (d: UserPassword) => {
  const updateUserPasswordAction: UpdateUserPasswordAction = {
    type: UPDATE_USER_PASSWORD,
    payload: d,
  };
  return updateUserPasswordAction;
};
