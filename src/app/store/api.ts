import axios, { AxiosRequestConfig } from 'axios';

export async function getCountries() {
  const getCountriesConfig: AxiosRequestConfig = {
    method: 'get',
    url: '/api/v2/base-countries/',
  };
  return axios(getCountriesConfig);
}
