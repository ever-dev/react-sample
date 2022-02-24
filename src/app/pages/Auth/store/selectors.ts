import { AuthState } from './types';

interface Store {
  auth?: AuthState;
}

// Login
export const getLoginUser = (store: Store) => store.auth?.login?.user || undefined;

export const getLoginError = (store: Store) => store.auth?.login?.error || undefined;

export const getLoginIsLoading = (store: Store) => store.auth?.login?.isLoading || false;

// Request Reset
export const getRequestResetStatus = (store: Store) =>
  store.auth?.requestReset?.status || undefined;

export const getRequestResetError = (store: Store) => store.auth?.requestReset?.error || undefined;

export const getRequestResetIsLoading = (store: Store) =>
  store.auth?.requestReset?.isLoading || false;

// Check Password Breach
export const getCheckBreachHash = (store: Store) => store.auth?.checkBreach?.checkHash || undefined;

export const getCheckBreachError = (store: Store) => store.auth?.checkBreach?.error || undefined;

export const getCheckBreachIsLoading = (store: Store) =>
  store.auth?.checkBreach?.isLoading || false;

// Reset Password
export const getResetPasswordStatus = (store: Store) =>
  store.auth?.resetPassword?.status || undefined;

export const getResetPasswordError = (store: Store) =>
  store.auth?.resetPassword?.error || undefined;

export const getResetPasswordIsLoading = (store: Store) =>
  store.auth?.resetPassword?.isLoading || false;
