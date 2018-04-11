/**
 * Saga to create & maintain concurrent WebSocket connection
 * EventChannels to obtain aggregate information on currency
 * pair symbols
 */

import { take, takeEvery, put, all } from 'redux-saga/effects';
import { v4 } from 'uuid';

import { actions, actionTypes } from 'currency-pair-tracking-actions';
import { actions as currentAverageActions } from 'currency-pair-actions';
import CurrencyPairService from 'currency-pair-service';
import CryptoCompareSocketConnectionService from 'cc-socket-connection-service';
import CCC from 'ccc-streamer-utilities';

import createCurrencyPairTrackingEventChannel
  from './factories/currency-pair-tracking-event-channel';
import connectionEstablishedHandler
  from './socket-event-handlers/connection-established-handler';
import connectionNotEstablishedHandler
  from './socket-event-handlers/connection-not-established-handler';
import connectionErrorHandler
  from './socket-event-handlers/connection-error-handler';
import connectionDisconnectHandler
  from './socket-event-handlers/connection-disconnect-handler';
import { NO_CONNECTION_PAIRS_SPECIFIED } from './misc-errors';

const socketConnectionService = new CryptoCompareSocketConnectionService();
const currencyPairService = new CurrencyPairService();

/**
 * Handles new information received by an EventChannel from
 * its corresponding WebSocket connection
 * @param {object} action - action object emitted by EventChannel
 */
function* currencyPairSocketResponseHandler(action) {
  switch (action.type) {
    case actionTypes.OPEN_CURRENCY_PAIR_TRACKING_CONNECTION_TIMEOUT:
      yield connectionNotEstablishedHandler(action);
      break;
    case actionTypes.OPEN_CURRENCY_PAIR_TRACKING_CONNECTION_ERROR:
      yield connectionNotEstablishedHandler(action);
      break;
    case actionTypes.OPEN_CURRENCY_PAIR_TRACKING_CONNECTION_SUCCESS:
      yield connectionEstablishedHandler(action);
      break;
    case actionTypes.RECEIVED_CURRENCY_PAIR_TRACKING_MESSAGE:
      const { message } = action;
      const response = CCC.CURRENT.unpack(message);
      if (response.TYPE === '3') {
        break;
      }
      yield put(
        actions.receivedCurrencyPairTrackingMessage(response)
      );
      break;
    case actionTypes.CURRENCY_PAIR_TRACKING_CONNECTION_DISCONNECT:
      yield connectionDisconnectHandler(action);
      break;
    case actionTypes.CURRENCY_PAIR_TRACKING_CONNECTION_ERROR:
      yield connectionErrorHandler(action);
      break;
    default:
      break;
  }
}

/**
 * Generator function which creates an EventChannel to track
 * the currency pair symbols given in the action param object
 * via a WebSocket connection
 * @param {object} action - OPEN_CURRENCY_PAIR_TRACKING_CONNECTION action object 
 */
function* openCurrencyPairTrackingConnectionHandler(action) {
  try {
    const { connectionPairs } = action;
    if (!connectionPairs || (connectionPairs && !connectionPairs.length)) {
      throw new Error(NO_CONNECTION_PAIRS_SPECIFIED);
    }
    const connectionChannel = createCurrencyPairTrackingEventChannel(
      connectionPairs
    );
    const initialAverageDataArray = yield all(
      connectionPairs.map(connectionPair =>
        currencyPairService.getCurrentAverage(
          connectionPair.fromSymbol,
          connectionPair.toSymbol
        )
      )
    );

    // get initial set of latest data for currency pairs
    // being tracked in this connection
    yield put(
      currentAverageActions.getCurrentAverageSetSuccess(
        initialAverageDataArray
      )
    );

    // infinite loop which processes emissions from the
    // event channel
    while (true) {
      try {
        const action = yield take(connectionChannel);
        yield currencyPairSocketResponseHandler({
          ...action,
          connectionChannel,
          connectionPairs,
        });
      } catch (e) {
        // catch any Errors thrown from connectionChannel
        console.error(e);
        yield put(
          actions.currencyPairTrackingConnectionUnknownError(
            connectionPairs, e
          )
        );
      }
    }
  } catch (e) {
    console.error(e);

    if (e.message !== NO_CONNECTION_PAIRS_SPECIFIED) {
      // catches any errors that are not considered "known errors," or
      // where "known errors" are:
      // open connection error, open connection timeout error, 
      // general connection error, connection disconnect error,
      // no connection pairs specified error,
      const { connectionPairs } = action;
      yield put(
        actions.currencyPairTrackingConnectionUnknownError(
          connectionPairs, e
        )
      );
    }

    yield put(
      // null connectionId and connectionPair means consuming code
      // should defer to e.message for error information.
      actions.openCurrencyPairTrackingConnectionError(null, null, e)
    );
  }
}

/**
 * Generator function which closes the EventChannel that is referenced
 * by the given connectionId in the action object parameter.
 * @param {object} action CLOSE_CURRENCY_PAIR_TRACKING_CONNECTION action object 
 */
function* closeCurrencyPairTrackingConnectionHandler(action) {
  try {
    const { connectionId } = action;
    const { connectionChannel } = socketConnectionService.socketConnections[connectionId];

    // invoke connectionChannel's close
    // function to close the connection.
    connectionChannel.close();

    yield put(
      actions.closeCurrencyPairTrackingConnectionSuccess(connectionId)
    );
  } catch (e) {
    console.error(e);
    yield put(
      actions.closeCurrencyPairTrackingConnectionError(e)
    );
  }
}

function* currencyPairTrackingSaga() {
  yield all([
    takeEvery(
      actionTypes.OPEN_CURRENCY_PAIR_TRACKING_CONNECTION,
      openCurrencyPairTrackingConnectionHandler,
    ),
    takeEvery(
      actionTypes.CLOSE_CURRENCY_PAIR_TRACKING_CONNECTION,
      closeCurrencyPairTrackingConnectionHandler,
    )
  ]);
}

export default currencyPairTrackingSaga;
