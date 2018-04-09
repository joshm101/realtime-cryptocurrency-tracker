/**
 * Factory which creates an event channel to track
 * a given currency pair
 */

import { eventChannel, buffers } from 'redux-saga';

import CryptoCompareSocketConnectionService from 'cc-socket-connection-service';
import { actionTypes } from 'currency-pair-tracking-actions';

import { NO_CONNECTION_PAIRS_SPECIFIED } from '../../misc-errors';

const socketConnectionService = new CryptoCompareSocketConnectionService();


/**
 * Creates an event channel to track a given set of currency pairs
 * @param {object[]} connectionPairs - An array consisting of 
 * objects of the following format:
 * {
 *   connectionTypeId: string,
 *   fromSymbol: string,
 *   toSymbol: string,
 * }
 * @return () => void - A function that allows consumer to close
 * the created eventChannel
 */
const createCurrencyPairTrackingEventChannel = (connectionPairs) => {
  if (!connectionPairs || (connectionPairs && !connectionPairs.length)) {
    throw new Error(NO_CONNECTION_PAIRS_SPECIFIED);
  }
  return eventChannel((emitter => {
    // Open a WebSocket connection via socketConnectionService.
    // The function openConnection accepts an array of connection pair
    // objects. 
    const { 
      socket, 
      connectionId,
    } = socketConnectionService.openConnection(connectionPairs);

    socket.on('connect', () => {
      emitter({
        type: actionTypes.OPEN_CURRENCY_PAIR_TRACKING_CONNECTION_SUCCESS,
        connectionId,
      })
    });

    socket.on('connect_timeout', () => {
      emitter({
        type: actionTypes.OPEN_CURRENCY_PAIR_TRACKING_CONNECTION_TIMEOUT,
        connectionId,
      })
    })

    socket.on('connect_error', (error) => {
      emitter({
        type: actionTypes.OPEN_CURRENCY_PAIR_TRACKING_CONNECTION_ERROR,
        connectionId,
        error,
      });
    });

    socket.on('disconnect', (reason) => {
      emitter({
        type: actionTypes.CURRENCY_PAIR_TRACKING_CONNECTION_DISCONNECT,
        connectionId,
        error: new Error(reason),
      });
    });

    socket.on('error', (error) => {
      emitter({
        type: actionTypes.CURRENCY_PAIR_TRACKING_CONNECTION_ERROR,
        connectionId,
        error,
      });
    });

    // Emit latest data from WebSocket connection
    socket.on('m', (message) => {
      emitter({
        type: actionTypes.RECEIVED_CURRENCY_PAIR_TRACKING_MESSAGE,
        connectionId,
        message,
      });
    });
    
    // Return a function that allows consumer to close
    // this event channel.
    return () => socketConnectionService.closeConnection(
      connectionId
    );
  }), buffers.expanding(5));
};

export default createCurrencyPairTrackingEventChannel;
