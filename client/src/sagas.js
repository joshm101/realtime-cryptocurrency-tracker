import { fork } from 'redux-saga/effects';

import getCoinListSaga from 'coins-saga';
import currencyPairTrackingSaga from 'currency-pair-tracking-saga';

const sagas = [
  getCoinListSaga,
  currencyPairTrackingSaga,
];

export default function* rootSaga() {
  yield sagas.map(saga => fork(saga));
}