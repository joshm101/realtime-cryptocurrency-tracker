/**
 * Factory which creates an event channel to track
 * a given currency pair
 */

import { eventChannel, buffers } from 'redux-saga';

import CryptoCompareSocketConnectionService from 'cc-socket-connection-service';

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
        type: 'CONNECTION_OPENED',
        connectionId,
      })
    })

    // Emit latest data from WebSocket connection
    socket.on('m', (message) => {
      emitter({
        type: 'NEW_DATA',
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
