import * as api from './api';
import { all, takeEvery } from 'redux-saga/effects';
import authSaga from '../pages/Auth/store/saga';
import settingsSaga from '../pages/Settings/store/saga';
import organizationsSaga from '../pages/Organizations/store/saga';
import { FETCH_COUNTRIES } from './actionTypes';
import { processRequest } from 'utils/reduxUtils';

export function* fetchCountries() {
  yield processRequest(FETCH_COUNTRIES, api.getCountries, undefined, 'data', true);
}

function* countriesSaga() {
  yield takeEvery(FETCH_COUNTRIES, fetchCountries);
}

export default function* rootSaga() {
  yield all([authSaga(), settingsSaga(), organizationsSaga(), countriesSaga()]);
}
