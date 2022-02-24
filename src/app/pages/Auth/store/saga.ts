import { takeEvery, put, call } from 'redux-saga/effects';
import {
  LOG_IN,
  LOG_IN_SUCCEEDED,
  LOG_IN_FAILED,
  LOG_OUT,
  FETCH_SESSION,
  FETCH_SESSION_SUCCEEDED,
  FETCH_SESSION_FAILED,
  REQUEST_RESET,
  REQUEST_RESET_SUCCEEDED,
  REQUEST_RESET_FAILED,
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCEEDED,
  RESET_PASSWORD_FAILED,
  PASSWORD_BREACHED,
  PASSWORD_BREACHED_SUCCEEDED,
  PASSWORD_BREACHED_FAILED,
} from './actionTypes';
import {
  LoginAction,
  LogoutAction,
  RequestPasswordBreachedAction,
  RequestResetAction,
  ResetPasswordAction,
} from './actions';
import * as api from './api';
import { ApiError } from '../../../../store/types';
import { CLEAR_ALERTS } from '../../../store/actionTypes';

export function* login(action: LoginAction) {
  try {
    const loginResponse = yield call(api.login, action.payload);
    yield put({ type: LOG_IN_SUCCEEDED, payload: loginResponse.data });
  } catch (e) {
    const error: ApiError = {
      status: e.response.status,
      data: e.response.data,
    };
    yield put({ type: LOG_IN_FAILED, payload: error });
  }
}

export function* logout(action: LogoutAction) {
  try {
    yield call(api.logout, action.payload);
  } catch (e) {}
}

export function* fetchUserSession() {
  try {
    const userSessionResponse = yield call(api.getSession);
    yield put({ type: FETCH_SESSION_SUCCEEDED, payload: userSessionResponse.data });
  } catch (e) {
    const error: ApiError = {
      status: e.response.status,
      data: e.response.data,
    };
    yield put({ type: FETCH_SESSION_FAILED, payload: error });
  }
}

export function* requestReset(action: RequestResetAction) {
  yield put({ type: CLEAR_ALERTS });
  try {
    const requestResetResponse = yield call(api.requestReset, action.payload);
    yield put({
      type: REQUEST_RESET_SUCCEEDED,
      payload: requestResetResponse.status,
    });
  } catch (e) {
    const error: ApiError = {
      status: e.response.status,
      data: e.response.data,
    };
    yield put({ type: REQUEST_RESET_FAILED, payload: error });
  }
}

export function* resetPassword(action: ResetPasswordAction) {
  try {
    const resetPasswordResponse = yield call(api.resetPassword, action.payload);
    yield put({
      type: RESET_PASSWORD_SUCCEEDED,
      payload: resetPasswordResponse.status,
    });
  } catch (e) {
    const error: ApiError = {
      status: e.response.status,
      data: e.response.data,
    };
    yield put({ type: RESET_PASSWORD_FAILED, payload: error });
  }
}

export function* requestPasswordBreached(action: RequestPasswordBreachedAction) {
  try {
    const passwordBreachResponse = yield call(api.requestPasswordBreached, action.payload);
    yield put({
      type: PASSWORD_BREACHED_SUCCEEDED,
      payload: passwordBreachResponse.data,
    });
  } catch (e) {
    const error: ApiError = {
      status: e.response.status,
      data: e.response.data,
    };
    yield put({ type: PASSWORD_BREACHED_FAILED, payload: error });
  }
}

function* authSaga() {
  yield takeEvery(LOG_IN, login);
  yield takeEvery(LOG_OUT, logout);
  yield takeEvery(FETCH_SESSION, fetchUserSession);
  yield takeEvery(REQUEST_RESET, requestReset);
  yield takeEvery(RESET_PASSWORD, resetPassword);
  yield takeEvery(PASSWORD_BREACHED, requestPasswordBreached);
}

export default authSaga;
