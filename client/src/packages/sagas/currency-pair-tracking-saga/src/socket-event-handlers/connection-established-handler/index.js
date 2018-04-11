import { put } from 'redux-saga/effects';

import { actions } from 'currency-pair-tracking-actions';

function* connectionEstablishedHandler(action) {
  // retrieve values provided in given action
  const {
    connectionId,
    connectionChannel,
    connectionPairs,
  } = action;

  yield put(
    actions.openCurrencyPairTrackingConnectionSuccess(
      connectionId,
      connectionPairs,
    )
  );  
}

export default connectionEstablishedHandler;
