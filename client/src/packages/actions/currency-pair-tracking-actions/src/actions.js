/**
 * Action creators for currency pair tracking
 */

import * as actionTypes from './action-types';

/**
 * Creates a OPEN_CURRENCY_PAIR_TRACKING_CONNECTION action object
 * @param {object[]} connectionPairs - An array of objects of
 * the following format:
 * {
 *   fromSymbol: string,
 *   toSymbol: string,
 *   connectionTypeId: number,
 * }
 * @return {object} - OPEN_CURRENCY_PAIR_TRACKING_CONNECTION action object
 */
export const openCurrencyPairTrackingConnection = (connectionPairs) => ({
  type: actionTypes.OPEN_CURRENCY_PAIR_TRACKING_CONNECTION,
  connectionPairs,
});

/**
 * Creates a CLOSE_CURRENCY_PAIR_TRACKING_CONNECTION action object
 * @param {object} pairInfo - Object providing fromSymbol
 * and toSymbol pair information
 * @return {object} - CLOSE_CURRENCY_PAIR_TRACKING_CONNECTION action object 
 */
export const closeCurrencyPairTrackingConnection = (connectionId) => ({
  type: actionTypes.CLOSE_CURRENCY_PAIR_TRACKING_CONNECTION,
  connectionId,
});


/**
 * Creates a CLOSE_CURRENCY_PAIR_TRACKING_CONNECTION_SUCCESS action object
 * @param {string} connectionId - ID of closed connection
 * @return {object} - CLOSE_CURRENCY_PAIR_TRACKING_CONNECTION_SUCCESS action object
 */
export const closeCurrencyPairTrackingConnectionSuccess = (connectionId) => ({
  type: actionTypes.CLOSE_CURRENCY_PAIR_TRACKING_CONNECTION_SUCCESS,
  connectionId,
});

/**
 * Creates a CLOSE_CURRENCY_PAIR_TRACKING_CONNECTION_ERROR action object
 * @param {Error} error - Error object
 * @return {object} CLOSE_CURRENCY_PAIR_TRACKING_CONNECTION_ERROR action object
 */
export const closeCurrencyPairTrackingConnectionError = (error) => ({
  type: actionTypes.CLOSE_CURRENCY_PAIR_TRACKING_CONNECTION_ERROR,
  error
});

/** 
 * Creates a OPEN_CURRENCY_PAIR_TRACKING_CONNECTION_SUCCESS action object
 * @return {object} - OPEN_CURRENCY_PAIR_TRACKING_CONNECTION_SUCCESS
 * action object
 */
export const openCurrencyPairTrackingConnectionSuccess = ({
  connectionId, 
  connectionChannel,
  connectionPairs,
}) => ({
  type: actionTypes.OPEN_CURRENCY_PAIR_TRACKING_CONNECTION_SUCCESS,
  connectionId,
  connectionChannel,
  connectionPairs,
});

export const openCurrencyPairTrackingConnectionError = (error) => ({
  type: actionTypes.OPEN_CURRENCY_PAIR_TRACKING_CONNECTION_ERROR,
  error,
});

/** 
 * Creates a RECEIVED_CURRENCY_PAIR_TRACKING_MESSAGE action object
 * @return {object} - RECEIVED_CURRENCY_PAIR_TRACKING_MESSAGE
 * action object 
 */
export const receivedCurrencyPairTrackingMessage = () => ({
  type: actionTypes.RECEIVED_CURRENCY_PAIR_TRACKING_MESSAGE,
});
