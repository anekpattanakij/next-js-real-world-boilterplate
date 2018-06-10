/* global fetch */
/* 
import { delay } from 'redux-saga';
import { all, call, put, take, takeLatest } from 'redux-saga/effects';
import es6promise from 'es6-promise';
import 'isomorphic-unfetch';

import { actionTypes, failure, loadDataSuccess, tickClock } from './actions';

const DEFAULT_DELAY_TIMER: number = 1000;

es6promise.polyfill();

function* runClockSaga() {
  yield take(actionTypes.START_CLOCK);
  while (true) {
    // yield put(tickClock(false));
    yield call(delay, DEFAULT_DELAY_TIMER);
  }
}

function* loadDataSaga() {
  try {
    const res = yield fetch('https://jsonplaceholder.typicode.com/users');
    const data = yield res.json();
    // yield put(loadDataSuccess(data));
  } catch (err) {
    yield put(failure(err));
  }
}

function* rootSaga() {
  yield all([
    call(runClockSaga),
    takeLatest(actionTypes.LOAD_DATA, loadDataSaga),
  ]);
}

export default rootSaga;
*/
