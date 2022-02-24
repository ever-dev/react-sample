import axios, { AxiosRequestConfig } from 'axios';
import {
  Organization as OrganizationSettings,
  ProtoOrganization as ProtoOrganizationSettings,
  OrganizationUser as OrganizationUserSettings,
  ProtoOrganizationUser as ProtoOrganizationUserSettings,
  ProtoAirlineAccountAWB as ProtoAirlineAccountAWBSettings,
  OrganizationsQuery,
  OrganizationUsersQuery,
  AirlineAccountAWBsQuery,
  AirlineAccount,
} from './types';
import { removeNullableValues } from 'utils/common';

export async function getOrganizations(orgQuery: OrganizationsQuery) {
  const getOrganizationsConfig: AxiosRequestConfig = {
    method: 'get',
    url: '/api/v2/organization-list/',
    params: removeNullableValues(orgQuery),
  };
  return axios(getOrganizationsConfig);
}

export async function getOrganization(id: string | number) {
  const getOrganizationConfig: AxiosRequestConfig = {
    method: 'get',
    url: '/api/v2/organization/',
    params: { id },
  };
  return axios(getOrganizationConfig);
}

export async function postOrganization(organizationSettings: ProtoOrganizationSettings) {
  const postOrganizationConfig: AxiosRequestConfig = {
    method: 'post',
    url: '/api/v2/organization/',
    data: organizationSettings,
  };
  return axios(postOrganizationConfig);
}

export async function putOrganization(organizationSettings: OrganizationSettings) {
  const putOrganizationConfig: AxiosRequestConfig = {
    method: 'put',
    url: '/api/v2/organization/',
    params: { id: organizationSettings.id },
    data: organizationSettings,
  };
  return axios(putOrganizationConfig);
}

export async function deleteOrganization(organizationIds: (string | number)[]) {
  const deleteOrganizationConfig: AxiosRequestConfig = {
    method: 'delete',
    url: '/api/v2/organization/',
    params: { id: organizationIds.join() },
  };
  return axios(deleteOrganizationConfig);
}

// Organization Users
export async function getOrganizationUsers(userQuery: OrganizationUsersQuery) {
  const getOrganizationsUsersConfig: AxiosRequestConfig = {
    method: 'get',
    url: '/api/v2/user-list/',
    params: removeNullableValues(userQuery),
  };
  return axios(getOrganizationsUsersConfig);
}

export async function getOrganizationUser(id: string | number) {
  const getOrganizationsUserConfig: AxiosRequestConfig = {
    method: 'get',
    url: '/api/v2/user/',
    params: { id },
  };
  return axios(getOrganizationsUserConfig);
}

export async function postOrganizationUser(orgUserSettings: ProtoOrganizationUserSettings) {
  const postOrganizationUserConfig: AxiosRequestConfig = {
    method: 'post',
    url: '/api/v2/user/',
    data: orgUserSettings,
  };
  return axios(postOrganizationUserConfig);
}

export async function putOrganizationUser(orgUserSettings: OrganizationUserSettings) {
  const putOrganizationUserConfig: AxiosRequestConfig = {
    method: 'put',
    url: '/api/v2/user/',
    params: { id: orgUserSettings.id },
    data: orgUserSettings,
  };
  return axios(putOrganizationUserConfig);
}

export async function deleteOrganizationUsers(orgUserIds: (string | number)[]) {
  const deleteOrganizationUsersConfig: AxiosRequestConfig = {
    method: 'delete',
    url: '/api/v2/user/',
    params: { id: orgUserIds.join() },
  };
  return axios(deleteOrganizationUsersConfig);
}

export async function postUserInvite(id: string | number) {
  const postUserInviteConfig: AxiosRequestConfig = {
    method: 'post',
    url: '/api/v2/user-invite/',
    params: { id },
  };
  return axios(postUserInviteConfig);
}

// Organization Airlines
export async function getOrganizationAirlines(organization: string | number) {
  const getOrganizationAirlinesConfig: AxiosRequestConfig = {
    method: 'get',
    url: '/api/v2/organization-airline-account-list/',
    params: { organization },
  };
  return axios(getOrganizationAirlinesConfig);
}

// Organization Airline Account
export async function getAirlineAccount(id: string | number) {
  const getAirlineAccountConfig: AxiosRequestConfig = {
    method: 'get',
    url: '/api/v2/organization-airline-account/',
    params: { id },
  };
  return axios(getAirlineAccountConfig);
}

export async function putAirlineAccount(airlineAccountSettings: AirlineAccount) {
  const putAirlineAccountConfig: AxiosRequestConfig = {
    method: 'put',
    url: '/api/v2/organization-airline-account/',
    params: { id: airlineAccountSettings.id },
    data: airlineAccountSettings,
  };
  return axios(putAirlineAccountConfig);
}

// Organization Airline Account Air Waybills
export async function postAirlineAccountAWBs(awbList: ProtoAirlineAccountAWBSettings[]) {
  const postAirlineAccountAWBsConfig: AxiosRequestConfig = {
    method: 'post',
    url: '/api/v2/air-waybill-number-list/',
    data: awbList,
  };
  return axios(postAirlineAccountAWBsConfig);
}

export async function getAirlineAccountAWBs(acctQuery: AirlineAccountAWBsQuery) {
  const getAirlineAccountAWBsConfig: AxiosRequestConfig = {
    method: 'get',
    url: '/api/v2/air-waybill-number-list/',
    params: removeNullableValues(acctQuery),
  };
  return axios(getAirlineAccountAWBsConfig);
}

export async function postAirlineAccountAWB(awbSettings: ProtoAirlineAccountAWBSettings) {
  const postAirlineAccountAWBConfig: AxiosRequestConfig = {
    method: 'post',
    url: '/api/v2/air-waybill-number/',
    data: awbSettings,
  };
  return axios(postAirlineAccountAWBConfig);
}

export async function deleteAirlineAccountAWBs(awbIds: (string | number)[]) {
  const deleteAirlineAccountAWBsConfig: AxiosRequestConfig = {
    method: 'delete',
    url: '/api/v2/air-waybill-number/',
    params: { id: awbIds.join() },
  };
  return axios(deleteAirlineAccountAWBsConfig);
}
