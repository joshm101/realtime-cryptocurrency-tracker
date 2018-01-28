import { fork } from 'redux-saga/effects';

import getCoinListSaga from 'coins-saga';

const sagas = [
  getCoinListSaga
];

export default function* rootSaga() {
  yield sagas.map(saga => fork(saga));
}