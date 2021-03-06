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
export const openCurrencyPairTrackingConnectionSuccess = (
  connectionId, 
  connectionPairs,
) => ({
  type: actionTypes.OPEN_CURRENCY_PAIR_TRACKING_CONNECTION_SUCCESS,
  connectionId,
  connectionPairs,
});

/**
 * Creates an OPEN_CURRENCY_PAIR_TRACKING_CONNECTION_TIMEOUT action object.
 * Socket.IO treats an open connection error and open connection timeout
 * as two discrete events, so we have corresponding action objects
 * created for each event for error handling convenience.
 * @param {string} connectionId - ID of connection that timed out 
 * @param {object[]} connectionPairs - Array of connection pair objects
 * which tells us which currency pairs were associated with the connection
 * that timed-out.
 * @param {Error} - Error object
 * @return {object} - OPEN_CURRENCY_PAIR_TRACKING_CONNECTION_TIMEOUT action object
 */
export const openCurrencyPairTrackingConnectionTimeout = (
  connectionId, connectionPairs, error,
) => ({
  type: actionTypes.OPEN_CURRENCY_PAIR_TRACKING_CONNECTION_TIMEOUT,
  connectionId,
  connectionPairs,
  error,
});

export const openCurrencyPairTrackingConnectionError = (
  connectionId, connectionPairs, error,
) => ({
  type: actionTypes.OPEN_CURRENCY_PAIR_TRACKING_CONNECTION_ERROR,
  connectionId,
  connectionPairs,
  error,
});

/**
 * Creates a CURRENCY_PAIR_TRACKING_CONNECTION_ERROR action object
 * NOTE: null connectionId and connectionPair means consuming code
 * should defer to error.message for error information.
 * @param {string} connectionId - ID of connection where error occurred.
 * @param {object[]} connectionPairs - Array of connection pair objects
 * which tells us which currency pairs were associated with the connection
 * that came across an error.
 * @param {Error} error - Error object.
 * @return {object} CURRENCY_PAIR_TRACKING_CONNECTION_ERROR action object
 */
export const currencyPairTrackingConnectionError = (
  connectionId, connectionPairs, error
) => ({
  type: actionTypes.CURRENCY_PAIR_TRACKING_CONNECTION_ERROR,
  connectionId,
  connectionPairs,
  error,
});

/**
 * Creates a CURRENCY_PAIR_TRACKING_CONNECTION_DISCONNECT action object
 * @param {string} connectionId -  ID of disconnected connection 
 * @param {object[]} connectionPairs - Array of connection pair objects
 * which tells us which currency pairs were associated with the disconnected
 * WebSocket connection.
 * @param {Error} error - Error object
 * @return {object} - CURRENCY_PAIR_TRACKING_CONNECTION_DISCONNECT action object
 */
export const currencyPairTrackingConnectionDisconnect = (
  connectionId, connectionPairs, error
) => ({
  type: actionTypes.CURRENCY_PAIR_TRACKING_CONNECTION_DISCONNECT,
  connectionId,
  connectionPairs,
  error,
});

/**
 * Creates a CURRENCY_PAIR_TRACKING_CONNECTION_UNKNOWN_ERROR action object
 * @param {object[]} connectionPairs - Array of connection pair objects
 * which tells us which currency pairs were associated with the connection
 * that had an unknown error.
 * @param {Error} error - Error object 
 * @return {object} - CURRENCY_PAIR_TRACKING_CONNECTION_UNKNOWN_ERROR action object
 */
export const currencyPairTrackingConnectionUnknownError = (
  connectionPairs, error
) => ({
  type: actionTypes.CURRENCY_PAIR_TRACKING_CONNECTION_UNKNOWN_ERROR,
  connectionPairs,
  error,
});

/** 
 * Creates a RECEIVED_CURRENCY_PAIR_TRACKING_MESSAGE action object
 * @param {object} data - New data from CryptoCompare API for a
 * given currency pair
 * @return {object} - RECEIVED_CURRENCY_PAIR_TRACKING_MESSAGE
 * action object 
 */
export const receivedCurrencyPairTrackingMessage = (data) => ({
  type: actionTypes.RECEIVED_CURRENCY_PAIR_TRACKING_MESSAGE,
  data,
});