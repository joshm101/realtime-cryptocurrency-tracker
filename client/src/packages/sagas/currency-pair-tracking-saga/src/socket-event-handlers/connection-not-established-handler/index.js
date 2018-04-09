import { put } from 'redux-saga/effects';

import { actions, actionTypes } from 'currency-pair-tracking-actions';

/**
 * Generator function which dispatches an action to
 * notify the rest of the application that an error
 * occurred while opening the sockt connection.
 * Once the first action has been dispatched the
 * function will dispatch a close connection action.
 * @param {object} action - Event Channel action object 
 */
function* connectionNotEstablishedHandler(action) {
  const actionToDispatch = getActionToDispatch(action);

  // dispatch action indicating that an error occurred while
  // opening the connection
  yield put(actionToDispatch);

  // close the socket connection so it is no longer
  // being managed by the application. Any reconnect
  // attempts will be done on "fresh"/new connections
  yield put(
    actions.closeCurrencyPairTrackingConnection(
      action.connectionId,
    )
  );
}

/**
 * Determines and returns the redux action to emit.
 * Checks the given action param's type property
 * to figure out the action object to return.
 * @param {object} action - An open connection error action
 * emitted by an EventChannel
 * @return {object} - Redux action to dispatch 
 */
const getActionToDispatch = (action) => {
  const {
    connectionId, 
    connectionPairs,
    type,
  } = action;
  let error;

  switch (type) {
    case actionTypes.OPEN_CURRENCY_PAIR_TRACKING_CONNECTION_TIMEOUT:
      error = new Error(
        `The server has taken too long to respond on connection ${connectionId}. ` +
        'The connection timed out.'
      );
      return actions.openCurrencyPairTrackingConnectionTimeout(
        connectionId,
        connectionPairs,
        error
      );
      
    case actionTypes.OPEN_CURRENCY_PAIR_TRACKING_CONNECTION_ERROR:
      return actions.openCurrencyPairTrackingConnectionError(
        connectionId, connectionPairs, action.error
      );
    default:
      error = new Error(`An unknown error occurred.`);
      return actions.currencyPairTrackingConnectionUnknownError(
        connectionPairs,
        error,
      );
  }
}

export default connectionNotEstablishedHandler;