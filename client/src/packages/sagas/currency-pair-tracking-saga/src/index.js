/**
 * Saga to create & maintain concurrent WebSocket connection
 * EventChannels to obtain aggregate information on currency
 * pair symbols
 */

import { take, takeEvery, put, all } from 'redux-saga/effects';
import { v4 } from 'uuid';

import { actions, actionTypes } from 'currency-pair-tracking-actions';
import { actions as currentAverageActions } from 'currency-pair-actions';
import createCurrencyPairTrackingEventChannel
  from './factories/currency-pair-tracking-event-channel';
import CurrencyPairService from 'currency-pair-service';
import CCC from 'ccc-streamer-utilities';

const currencyPairService = new CurrencyPairService();

/** 
 * { 
 *   [connectionId: string]: {
 *     symbolPairs: {
 *       [currencyPair: string]: boolean
 *     },
 *     connectionChannel: EventChannel
 *   }
 * } 
 */
let eventChannelMapping = {};

/**
 * Handles new information received by an EventChannel from
 * its corresponding WebSocket connection
 * @param {object} action - action object emitted by EventChannel
 */
function* currencyPairSocketResponseHandler(action) {
  switch (action.type) {
    case 'CONNECTION_OPENED':
      // retrieve values provided in given action
      const {
        connectionId,
        connectionChannel,
        connectionPairs
      } = action;

      // adds the provided connectionChannel to the
      // eventChannelMapping object since the
      // connection has been successfully opened.
      addEventChannelMappingEntry(
        connectionPairs, 
        connectionChannel, 
        connectionId
      );

      yield put(
        actions.openCurrencyPairTrackingConnectionSuccess({
          connectionId,
          connectionPairs,
        })
      );
      break;
    case 'NEW_DATA':
      const { message } = action;
      const response = CCC.CURRENT.unpack(message);
      if (response.TYPE === '3') {
        break;
      }
      yield put(
        actions.receivedCurrencyPairTrackingMessage(response)
      );
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

    yield put(
      currentAverageActions.getCurrentAverageSetSuccess(
        initialAverageDataArray
      )
    );

    while (true) {
      let action = yield take(connectionChannel);
      yield currencyPairSocketResponseHandler({
        ...action,
        connectionChannel,
        connectionPairs,
      });
    }
  } catch (e) {
    console.error(e);
    yield put(
      actions.openCurrencyPairTrackingConnectionError(e)
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
    const { connectionChannel } = eventChannelMapping[connectionId];

    // invoke connectionChannel's close
    // function to close the connection.
    connectionChannel.close();

    // remove the entry in the eventChannelMapping 
    // lookup object.
    delete eventChannelMapping[connectionId];

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

/**
 * Adds an entry to the eventChannelMapping for the given
 * EventChannel. Each entry specifies symbol pairs and the
 * actual connectionChannel for the given set of symbol pairs.
 * 
 * @param {object[]} connectionPairs - Array of connection pair objects
 * used to construct an object mapping a symbol pair string to
 * a boolean value
 * @param {object} connectionChannel - EventChannel object
 * @param {string} connectionChannelId - eventChannelMapping lookup
 * ID for the given connectionChannel param to be mapped.
 */
const addEventChannelMappingEntry = (
  connectionPairs, connectionChannel, connectionChannelId
) => {
  // construct a symbol pair lookup object which contains the symbol
  // pairs that are being tracked with the opened connection.
  const symbolPairs = connectionPairs.reduce((current, connectionPair) => ({
    ...current,

    // example: { 'ETH/USD': true }
    [`${connectionPair.fromSymbol}/${connectionPair.toSymbol}`]: true
  }), {});

  // set event channel mapping for newly opened
  // connection referenced by connectionChannelId
  eventChannelMapping[connectionChannelId] = {
    symbolPairs,
    connectionChannel,
  };
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
