import axios, { AxiosRequestConfig } from 'axios';
import { LoginData } from '../LoginPage/types';
import { ResetPasswordData } from '../ResetPage/types';
import { RequestResetData } from '../RequestResetPage/types';

export async function login(loginData: LoginData) {
  const logInConfig: AxiosRequestConfig = {
    method: 'put',
    url: '/api/v2/user-session/',
    data: loginData,
  };
  return axios(logInConfig);
}

export async function logout(authToken: string) {
  const logoutConfig: AxiosRequestConfig = {
    method: 'delete',
    url: '/api/v2/user-session/',
    headers: { Authorization: `Token ${authToken}` },
  };
  return axios(logoutConfig);
}

export async function getSession() {
  const getSessionConfig: AxiosRequestConfig = {
    method: 'get',
    url: '/api/v2/user-session/',
  };
  return axios(getSessionConfig);
}

export async function requestReset(requestResetData: RequestResetData) {
  const requestResetConfig: AxiosRequestConfig = {
    method: 'post',
    url: '/api/v2/user-password-reset/',
    data: requestResetData,
  };
  return axios(requestResetConfig);
}

export async function resetPassword(resetPasswordData: ResetPasswordData) {
  const resetPasswordConfig: AxiosRequestConfig = {
    method: 'put',
    url: '/api/v2/user-password-reset/',
    data: resetPasswordData,
  };
  return axios(resetPasswordConfig);
}

export async function requestPasswordBreached(password: string) {
  const requestPasswordBreachedConfig: AxiosRequestConfig = {
    method: 'get',
    url: 'https://api.pwnedpasswords.com/range/' + password,
  };
  return axios(requestPasswordBreachedConfig);
}
