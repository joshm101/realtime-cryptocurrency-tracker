import { put } from 'redux-saga/effects';

import { actions } from 'currency-pair-tracking-actions';

/**
 * Generator function which dispatches an action to
 * notify the rest of the application that a websocket
 * connection was unexpectedly disconnected.
 * @param {object} action - Event channel action object 
 */
function* connectionDisconnectHandler(action) {
  const {
    connectionId,
    connectionPairs,
    error,
  } = action;
  yield put(
    actions.currencyPairTrackingConnectionDisconnect(
      connectionId,
      connectionPairs,
      error
    ),
  );
}

export default connectionDisconnectHandler;