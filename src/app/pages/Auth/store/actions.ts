import {
  CLEAR_AUTH_CONTEXT,
  LOG_IN,
  LOG_OUT,
  FETCH_SESSION,
  REQUEST_RESET,
  PASSWORD_BREACHED,
  RESET_PASSWORD,
} from './actionTypes';
import { LoginData } from '../LoginPage/types';
import { ResetPasswordData } from '../ResetPage/types';
import { RequestResetData } from '../RequestResetPage/types';

export interface ClearAuthContextAction {
  type: 'CLEAR_AUTH_CONTEXT';
}

export const clearAuthContext = () => {
  const clearAuthContextAction: ClearAuthContextAction = {
    type: CLEAR_AUTH_CONTEXT,
  };
  return clearAuthContextAction;
};

export interface LoginAction {
  type: 'LOG_IN';
  payload: LoginData;
}

export const login = (d: LoginData) => {
  const loginAction: LoginAction = {
    type: LOG_IN,
    payload: d,
  };
  return loginAction;
};

export interface LogoutAction {
  type: 'LOG_OUT';
  payload: string;
}

export const logout = (d: string) => {
  const logoutAction: LogoutAction = {
    type: LOG_OUT,
    payload: d,
  };
  return logoutAction;
};

export interface RequestResetAction {
  type: 'REQUEST_RESET';
  payload: RequestResetData;
}

export const requestReset = (d: RequestResetData) => {
  const requestResetAction: RequestResetAction = {
    type: REQUEST_RESET,
    payload: d,
  };
  return requestResetAction;
};

export interface ResetPasswordAction {
  type: 'RESET_PASSWORD';
  payload: ResetPasswordData;
}

export const resetPassword = (d: ResetPasswordData) => {
  const resetPasswordAction: ResetPasswordAction = {
    type: RESET_PASSWORD,
    payload: d,
  };
  return resetPasswordAction;
};

export interface RequestPasswordBreachedAction {
  type: 'PASSWORD_BREACHED';
  payload: string;
}

export const requestPasswordBreached = (password: string) => {
  const requestPasswordBreachedAction: RequestPasswordBreachedAction = {
    type: PASSWORD_BREACHED,
    payload: password,
  };
  return requestPasswordBreachedAction;
};

export interface FetchUserSessionAction {
  type: 'FETCH_SESSION';
}

export const fetchUserSession = () => {
  const fetchSessionAction: FetchUserSessionAction = {
    type: FETCH_SESSION,
  };
  return fetchSessionAction;
};
