import { call, put } from 'redux-saga/effects';
import { ApiError } from '../store/types';
import { LOG_OUT } from 'app/pages/Auth/store/actionTypes';
import { CLEAR_ALERTS } from 'app/store/actionTypes';

/**
 * Processes api requests
 *
 * @param {string} type - The base action type.
 * @param {function} request - The api function that returns an axios request.
 * @param {any} [payload] - Data to send in the request.
 * @param {string} [parser] - The member of the response object to be stored.
 * @param {boolean} [preserveAlerts] - Whether to clear alerts when the request is made.
 */

export function* processRequest(
  type: string,
  request,
  payload?,
  parser?: 'data' | 'status',
  preserveAlerts?: boolean,
) {
  if (!preserveAlerts) {
    yield put({ type: CLEAR_ALERTS });
  }
  try {
    const response = !!payload ? yield call(request, payload) : yield call(request);
    yield put({
      type: `${type}_SUCCEEDED`,
      payload: parser ? response[parser] : { data: response.data, status: response.status },
    });
  } catch (e) {
    const error: ApiError = {
      status: e.response.status,
      data: e.response.data,
    };
    if (error.status === 401) {
      yield put({ type: LOG_OUT });
    } else {
      yield put({ type: `${type}_FAILED`, payload: error });
    }
  }
}
