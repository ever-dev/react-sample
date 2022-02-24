import axios, { AxiosRequestConfig } from 'axios';
import { UserPassword, UserSettings } from './types';

export async function putSettings(userSettings: UserSettings) {
  const settingsConfig: AxiosRequestConfig = {
    method: 'put',
    url: '/api/v2/user/',
    data: userSettings,
  };
  return axios(settingsConfig);
}

export async function putPassword(userSettings: UserPassword) {
  const passwordConfig: AxiosRequestConfig = {
    method: 'put',
    url: '/api/v1/user-change-password/',
    data: userSettings,
  };
  return axios(passwordConfig);
}
