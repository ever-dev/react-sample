import {
  CLEAR_ORGANIZATIONS_CONTEXT,
  FETCH_ORGANIZATIONS,
  CLEAR_ORGANIZATION_CONTEXT,
  FETCH_ORGANIZATION,
  CREATE_ORGANIZATION,
  UPDATE_ORGANIZATION,
  REMOVE_ORGANIZATION,
  CLEAR_ORGANIZATION_USERS_CONTEXT,
  CLEAR_ORGANIZATION_USER_CONTEXT,
  FETCH_ORGANIZATION_USERS,
  FETCH_ORGANIZATION_USER,
  CREATE_ORGANIZATION_USER,
  UPDATE_ORGANIZATION_USER,
  REMOVE_ORGANIZATION_USER,
  SEND_ORGANIZATION_USER_INVITE,
  FETCH_ORGANIZATION_AIRLINES,
  CLEAR_AIRLINE_CONTEXT,
  FETCH_AIRLINE_ACCOUNT,
  UPDATE_AIRLINE_ACCOUNT,
  FETCH_AIRLINE_ACCOUNT_AWBS,
  CREATE_AIRLINE_ACCOUNT_AWB,
  REMOVE_AIRLINE_ACCOUNT_AWB,
  CREATE_AIRLINE_ACCOUNT_AWBS,
} from './actionTypes';
import {
  Organization,
  ProtoOrganization,
  OrganizationsQuery,
  OrganizationUser,
  ProtoOrganizationUser,
  OrganizationUsersQuery,
  AirlineAccountAWBsQuery,
  AirlineAccount,
  ProtoAirlineAccountAWB,
} from './types';

export interface ClearOrganizationsContextAction {
  type: 'CLEAR_ORGANIZATIONS_CONTEXT';
}

export const clearOrganizationsContext = () => {
  const clearOrganizationsContextAction: ClearOrganizationsContextAction = {
    type: CLEAR_ORGANIZATIONS_CONTEXT,
  };
  return clearOrganizationsContextAction;
};

export interface FetchOrganizationsAction {
  type: 'FETCH_ORGANIZATIONS';
  payload: OrganizationsQuery;
}

export const fetchOrganizations = (d: OrganizationsQuery) => {
  const fetchOrganizationsAction: FetchOrganizationsAction = {
    type: FETCH_ORGANIZATIONS,
    payload: d,
  };
  return fetchOrganizationsAction;
};

export interface ClearOrganizationContextAction {
  type: 'CLEAR_ORGANIZATION_CONTEXT';
}

export const clearOrganizationContext = () => {
  const clearOrganizationContextAction: ClearOrganizationContextAction = {
    type: CLEAR_ORGANIZATION_CONTEXT,
  };
  return clearOrganizationContextAction;
};

export interface FetchOrganizationAction {
  type: 'FETCH_ORGANIZATION';
  payload: string | number;
}

export const fetchOrganization = (d: string | number) => {
  const fetchOrganizationAction: FetchOrganizationAction = {
    type: FETCH_ORGANIZATION,
    payload: d,
  };
  return fetchOrganizationAction;
};

export interface CreateOrganizationAction {
  type: 'CREATE_ORGANIZATION';
  payload: ProtoOrganization;
}

export const createOrganization = (d: ProtoOrganization) => {
  const createOrganizationAction: CreateOrganizationAction = {
    type: CREATE_ORGANIZATION,
    payload: d,
  };
  return createOrganizationAction;
};

export interface UpdateOrganizationAction {
  type: 'UPDATE_ORGANIZATION';
  payload: Organization;
}

export const updateOrganization = (d: Organization) => {
  const updateOrganizationAction: UpdateOrganizationAction = {
    type: UPDATE_ORGANIZATION,
    payload: d,
  };
  return updateOrganizationAction;
};

export interface RemoveOrganizationAction {
  type: 'REMOVE_ORGANIZATION';
  payload: (string | number)[];
}

export const removeOrganization = (d: (string | number)[]) => {
  const removeOrganizationAction: RemoveOrganizationAction = {
    type: REMOVE_ORGANIZATION,
    payload: d,
  };
  return removeOrganizationAction;
};

// Organization Users
export interface ClearOrganizationUsersContextAction {
  type: 'CLEAR_ORGANIZATION_USERS_CONTEXT';
}

export const clearOrganizationUsers = () => {
  return {
    type: CLEAR_ORGANIZATION_USERS_CONTEXT,
  };
};

export interface ClearOrganizationUserContextAction {
  type: 'CLEAR_ORGANIZATION_USER_CONTEXT';
}

export const clearOrganizationUserContext = () => {
  return {
    type: CLEAR_ORGANIZATION_USER_CONTEXT,
  };
};

export interface FetchOrganizationUsersAction {
  type: 'FETCH_ORGANIZATION_USERS';
  payload: OrganizationUsersQuery;
}

export const fetchOrganizationUsers = (d: OrganizationUsersQuery) => {
  const fetchOrganizationUsersAction: FetchOrganizationUsersAction = {
    type: FETCH_ORGANIZATION_USERS,
    payload: d,
  };
  return fetchOrganizationUsersAction;
};

export interface FetchOrganizationUserAction {
  type: 'FETCH_ORGANIZATION_USER';
  payload: string | number;
}

export const fetchOrganizationUser = (d: string | number) => {
  const fetchOrganizationUserAction: FetchOrganizationUserAction = {
    type: FETCH_ORGANIZATION_USER,
    payload: d,
  };
  return fetchOrganizationUserAction;
};

export interface CreateOrganizationUserAction {
  type: 'CREATE_ORGANIZATION_USER';
  payload: ProtoOrganizationUser;
}

export const createOrganizationUser = (d: ProtoOrganizationUser) => {
  const createOrganizationUserAction: CreateOrganizationUserAction = {
    type: CREATE_ORGANIZATION_USER,
    payload: d,
  };
  return createOrganizationUserAction;
};

export interface UpdateOrganizationUserAction {
  type: 'UPDATE_ORGANIZATION_USER';
  payload: OrganizationUser;
}

export const updateOrganizationUser = (d: OrganizationUser) => {
  const updateOrganizationUserAction: UpdateOrganizationUserAction = {
    type: UPDATE_ORGANIZATION_USER,
    payload: d,
  };
  return updateOrganizationUserAction;
};

export interface RemoveOrganizationUserAction {
  type: 'REMOVE_ORGANIZATION_USER';
  payload: (string | number)[];
}

export const removeOrganizationUser = (d: (string | number)[]) => {
  const removeOrganizationUserAction: RemoveOrganizationUserAction = {
    type: REMOVE_ORGANIZATION_USER,
    payload: d,
  };
  return removeOrganizationUserAction;
};

export interface SendUserInviteAction {
  type: 'SEND_ORGANIZATION_USER_INVITE';
  payload: string | number;
}

export const sendUserInvite = (d: string | number) => {
  const sendUserInviteAction: SendUserInviteAction = {
    type: SEND_ORGANIZATION_USER_INVITE,
    payload: d,
  };
  return sendUserInviteAction;
};

// Organization Airlines
export interface FetchOrganizationAirlinesAction {
  type: 'FETCH_ORGANIZATION_AIRLINES';
  payload: string | number;
}

export const fetchOrganizationAirlines = (d: string | number) => {
  const fetchOrganizationAirlinesAction: FetchOrganizationAirlinesAction = {
    type: FETCH_ORGANIZATION_AIRLINES,
    payload: d,
  };
  return fetchOrganizationAirlinesAction;
};

// Organization Airline Account
export interface ClearAirlineAccountContextAction {
  type: 'CLEAR_AIRLINE_CONTEXT';
}

export const clearAirlineAccountContext = () => {
  const clearAirlineAccountContextAction: ClearAirlineAccountContextAction = {
    type: CLEAR_AIRLINE_CONTEXT,
  };
  return clearAirlineAccountContextAction;
};

export interface FetchAirlineAccountAction {
  type: 'FETCH_AIRLINE_ACCOUNT';
  payload: string | number;
}

export const fetchAirlineAccount = (d: string | number) => {
  const fetchAirlineAccountAction: FetchAirlineAccountAction = {
    type: FETCH_AIRLINE_ACCOUNT,
    payload: d,
  };
  return fetchAirlineAccountAction;
};

export interface UpdateAirlineAccountAction {
  type: 'UPDATE_AIRLINE_ACCOUNT';
  payload: AirlineAccount;
}

export const updateAirlineAccount = (d: AirlineAccount) => {
  const updateAirlineAccountAction: UpdateAirlineAccountAction = {
    type: UPDATE_AIRLINE_ACCOUNT,
    payload: d,
  };
  return updateAirlineAccountAction;
};

// Organization Airline Account Air Waybills
export interface CreateAirlineAccountAWBsAction {
  type: 'CREATE_AIRLINE_ACCOUNT_AWBS';
  payload: ProtoAirlineAccountAWB[];
}

export const createAirlineAccountAWBs = (d: ProtoAirlineAccountAWB[]) => {
  const createAirlineAccountAWBsAction: CreateAirlineAccountAWBsAction = {
    type: CREATE_AIRLINE_ACCOUNT_AWBS,
    payload: d,
  };
  return createAirlineAccountAWBsAction;
};

export interface FetchAirlineAccountAWBsAction {
  type: 'FETCH_AIRLINE_ACCOUNT_AWBS';
  payload: AirlineAccountAWBsQuery;
}

export const fetchAirlineAccountAWBs = (d: AirlineAccountAWBsQuery) => {
  const fetchAirlineAccountAWBsAction: FetchAirlineAccountAWBsAction = {
    type: FETCH_AIRLINE_ACCOUNT_AWBS,
    payload: d,
  };
  return fetchAirlineAccountAWBsAction;
};

export interface CreateAirlineAccountAWBAction {
  type: 'CREATE_AIRLINE_ACCOUNT_AWB';
  payload: ProtoAirlineAccountAWB;
}

export const createAirlineAccountAWB = (d: ProtoAirlineAccountAWB) => {
  const createAirlineAccountAWBAction: CreateAirlineAccountAWBAction = {
    type: CREATE_AIRLINE_ACCOUNT_AWB,
    payload: d,
  };
  return createAirlineAccountAWBAction;
};

export interface RemoveAirlineAccountAWBAction {
  type: 'REMOVE_AIRLINE_ACCOUNT_AWB';
  payload: (string | number)[];
}

export const removeAirlineAccountAWB = (d: (string | number)[]) => {
  const removeAirlineAccountAWBAction: RemoveAirlineAccountAWBAction = {
    type: REMOVE_AIRLINE_ACCOUNT_AWB,
    payload: d,
  };
  return removeAirlineAccountAWBAction;
};
