import * as api from './api';
import { takeEvery } from 'redux-saga/effects';
import { UPDATE_SETTINGS, UPDATE_USER_PASSWORD } from './actionTypes';
import { UpdateSettingsAction, UpdateUserPasswordAction } from './actions';
import { processRequest } from 'utils/reduxUtils';

export function* updateSettings(action: UpdateSettingsAction) {
  yield processRequest(UPDATE_SETTINGS, api.putSettings, action.payload);
}

export function* updateUserPassword(action: UpdateUserPasswordAction) {
  yield processRequest(UPDATE_USER_PASSWORD, api.putPassword, action.payload, 'status');
}

function* settingsSaga() {
  yield takeEvery(UPDATE_SETTINGS, updateSettings);
  yield takeEvery(UPDATE_USER_PASSWORD, updateUserPassword);
}

export default settingsSaga;
