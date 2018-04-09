import { put } from 'redux-saga/effects';

import { actions, actionTypes } from 'currency-pair-tracking-actions';

/**
 * Generator function which dispatches an action
 * to notify the rest of the application that an
 * error occurred on a given socket connection.
 * Once the first action has been dispatched,
 * the function will dispatch a close connection
 * action.
 * @param {object} action - Event Channel action object 
 */
function* connectionErrorHandler(action) {
  const actionToDispatch = getActionToDispatch(action);

  // Dispatch action indicating that an error occurred
  // on an already open connection.
  yield put(actionToDispatch);

  // Close the socket connection so it is no longer
  // being managed by the application. Any reconnect
  // attempts will be done on "fresh"/new connections.
  yield put(
    actions.closeCurrencyPairTrackingConnection(
      action.connectionId,
    )
  )
}

/**
 * Determines and returns the redux action to emit.
 * Checks the given action param's type property
 * to figure out the action object to return
 * @param {object} action - A connection error action
 * emitted by an EventChannel
 * @return {object} - Redux action to dispatch 
 */
const getActionToDispatch = (action) => {
  const { 
    connectionId,
    connectionPairs,
    error,
    type,
  } = action;
  
  switch (type) {
    case actionTypes.CURRENCY_PAIR_TRACKING_CONNECTION_DISCONNECT:
      return actions.currencyPairTrackingConnectionDisconnect(
        connectionId,
        connectionPairs,
        error,
      );
    case actionTypes.CURRENCY_PAIR_TRACKING_CONNECTION_ERROR:
      return actions.currencyPairTrackingConnectionError(
        connectionId,
        connectionPairs,
        error,
      );
    default:
      return actions.currencyPairTrackingConnectionUnknownError(
        connectionPairs,
        new Error('An unknown error occurred.'),
      )
  }
}

export default connectionErrorHandler;