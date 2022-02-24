import * as api from './api';
import { takeEvery } from 'redux-saga/effects';
import {
  FETCH_ORGANIZATIONS,
  FETCH_ORGANIZATION,
  CREATE_ORGANIZATION,
  UPDATE_ORGANIZATION,
  REMOVE_ORGANIZATION,
  FETCH_ORGANIZATION_USERS,
  FETCH_ORGANIZATION_USER,
  CREATE_ORGANIZATION_USER,
  UPDATE_ORGANIZATION_USER,
  REMOVE_ORGANIZATION_USER,
  FETCH_ORGANIZATION_AIRLINES,
  FETCH_AIRLINE_ACCOUNT,
  UPDATE_AIRLINE_ACCOUNT,
  CREATE_AIRLINE_ACCOUNT_AWBS,
  FETCH_AIRLINE_ACCOUNT_AWBS,
  CREATE_AIRLINE_ACCOUNT_AWB,
  REMOVE_AIRLINE_ACCOUNT_AWB,
  SEND_ORGANIZATION_USER_INVITE,
} from './actionTypes';
import {
  FetchOrganizationAction,
  FetchOrganizationsAction,
  CreateOrganizationAction,
  UpdateOrganizationAction,
  RemoveOrganizationAction,
  FetchOrganizationUsersAction,
  FetchOrganizationUserAction,
  CreateOrganizationUserAction,
  UpdateOrganizationUserAction,
  RemoveOrganizationUserAction,
  SendUserInviteAction,
  FetchOrganizationAirlinesAction,
  FetchAirlineAccountAction,
  FetchAirlineAccountAWBsAction,
  UpdateAirlineAccountAction,
  CreateAirlineAccountAWBAction,
  RemoveAirlineAccountAWBAction,
  CreateAirlineAccountAWBsAction,
} from './actions';
import { processRequest } from 'utils/reduxUtils';

export function* fetchOrganizations(action: FetchOrganizationsAction) {
  yield processRequest(FETCH_ORGANIZATIONS, api.getOrganizations, action.payload, 'data', true);
}

export function* fetchOrganization(action: FetchOrganizationAction) {
  yield processRequest(FETCH_ORGANIZATION, api.getOrganization, action.payload, 'data');
}

export function* createOrganization(action: CreateOrganizationAction) {
  yield processRequest(CREATE_ORGANIZATION, api.postOrganization, action.payload, 'status');
}

export function* updateOrganization(action: UpdateOrganizationAction) {
  yield processRequest(UPDATE_ORGANIZATION, api.putOrganization, action.payload);
}

export function* removeOrganization(action: RemoveOrganizationAction) {
  yield processRequest(REMOVE_ORGANIZATION, api.deleteOrganization, action.payload, 'status');
}

export function* fetchOrganizationUsers(action: FetchOrganizationUsersAction) {
  yield processRequest(
    FETCH_ORGANIZATION_USERS,
    api.getOrganizationUsers,
    action.payload,
    'data',
    true,
  );
}

export function* fetchOrganizationUser(action: FetchOrganizationUserAction) {
  yield processRequest(FETCH_ORGANIZATION_USER, api.getOrganizationUser, action.payload, 'data');
}

export function* createOrganizationUser(action: CreateOrganizationUserAction) {
  yield processRequest(
    CREATE_ORGANIZATION_USER,
    api.postOrganizationUser,
    action.payload,
    'status',
  );
}

export function* updateOrganizationUser(action: UpdateOrganizationUserAction) {
  yield processRequest(UPDATE_ORGANIZATION_USER, api.putOrganizationUser, action.payload);
}

export function* removeOrganizationUser(action: RemoveOrganizationUserAction) {
  yield processRequest(
    REMOVE_ORGANIZATION_USER,
    api.deleteOrganizationUsers,
    action.payload,
    'status',
  );
}

export function* sendOrganizationUserInvite(action: SendUserInviteAction) {
  yield processRequest(SEND_ORGANIZATION_USER_INVITE, api.postUserInvite, action.payload, 'status');
}

export function* fetchOrganizationAirlines(action: FetchOrganizationAirlinesAction) {
  yield processRequest(
    FETCH_ORGANIZATION_AIRLINES,
    api.getOrganizationAirlines,
    action.payload,
    'data',
  );
}

export function* fetchAirlineAccount(action: FetchAirlineAccountAction) {
  yield processRequest(FETCH_AIRLINE_ACCOUNT, api.getAirlineAccount, action.payload, 'data');
}

export function* updateAirlineAccount(action: UpdateAirlineAccountAction) {
  yield processRequest(UPDATE_AIRLINE_ACCOUNT, api.putAirlineAccount, action.payload);
}

export function* createAirlineAccountAWBs(action: CreateAirlineAccountAWBsAction) {
  yield processRequest(
    CREATE_AIRLINE_ACCOUNT_AWBS,
    api.postAirlineAccountAWBs,
    action.payload,
    'data',
  );
}

export function* fetchAirlineAccountAWBs(action: FetchAirlineAccountAWBsAction) {
  yield processRequest(
    FETCH_AIRLINE_ACCOUNT_AWBS,
    api.getAirlineAccountAWBs,
    action.payload,
    'data',
    true,
  );
}

export function* createAirlineAccountAWB(action: CreateAirlineAccountAWBAction) {
  yield processRequest(
    CREATE_AIRLINE_ACCOUNT_AWB,
    api.postAirlineAccountAWB,
    action.payload,
    'status',
  );
}

export function* removeAirlineAccountAWB(action: RemoveAirlineAccountAWBAction) {
  yield processRequest(
    REMOVE_AIRLINE_ACCOUNT_AWB,
    api.deleteAirlineAccountAWBs,
    action.payload,
    'status',
  );
}

function* organizationsSaga() {
  yield takeEvery(FETCH_ORGANIZATIONS, fetchOrganizations);
  yield takeEvery(FETCH_ORGANIZATION, fetchOrganization);
  yield takeEvery(CREATE_ORGANIZATION, createOrganization);
  yield takeEvery(UPDATE_ORGANIZATION, updateOrganization);
  yield takeEvery(REMOVE_ORGANIZATION, removeOrganization);
  yield takeEvery(FETCH_ORGANIZATION_USERS, fetchOrganizationUsers);
  yield takeEvery(FETCH_ORGANIZATION_USER, fetchOrganizationUser);
  yield takeEvery(CREATE_ORGANIZATION_USER, createOrganizationUser);
  yield takeEvery(UPDATE_ORGANIZATION_USER, updateOrganizationUser);
  yield takeEvery(REMOVE_ORGANIZATION_USER, removeOrganizationUser);
  yield takeEvery(SEND_ORGANIZATION_USER_INVITE, sendOrganizationUserInvite);
  yield takeEvery(FETCH_ORGANIZATION_AIRLINES, fetchOrganizationAirlines);
  yield takeEvery(FETCH_AIRLINE_ACCOUNT, fetchAirlineAccount);
  yield takeEvery(UPDATE_AIRLINE_ACCOUNT, updateAirlineAccount);
  yield takeEvery(CREATE_AIRLINE_ACCOUNT_AWBS, createAirlineAccountAWBs);
  yield takeEvery(FETCH_AIRLINE_ACCOUNT_AWBS, fetchAirlineAccountAWBs);
  yield takeEvery(CREATE_AIRLINE_ACCOUNT_AWB, createAirlineAccountAWB);
  yield takeEvery(REMOVE_AIRLINE_ACCOUNT_AWB, removeAirlineAccountAWB);
}

export default organizationsSaga;
