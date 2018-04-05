import * as actionTypes from './action-types';

/**
 * GET_CURRENT_AVERAGE action creator
 * @param {string} fromSymbol - From symbol for currency pair 
 * @param {string} toSymbol  - To symbol for currency pair
 * @return {object} - GET_CURRENT_AVERAGE action object
 */
export const getCurrentAverage = (fromSymbol, toSymbol) => ({
  type: actionTypes.GET_CURRENT_AVERAGE,
  fromSymbol,
  toSymbol,
});

/**
 * GET_CURRENT_AVERAGE_SET_SUCCESS action creator
 * @param {object[]} dataArray - Array of currency pair
 * data objects
 * @return {object} - GET_CURRENT_AVERAGE_SET_SUCCESS action object
 */
export const getCurrentAverageSetSuccess = (dataArray) => ({
  type: actionTypes.GET_CURRENT_AVERAGE_SET_SUCCESS,
  dataArray,
});

/**
 * GET_CURRENT_AVERAGE_SUCCESS action creator
 * @param {object} data - Currency pair data object
 * @return {object} - GET_CURRENT_AVERAGE_SUCCESS action object 
 */
export const getCurrentAverageSuccess = (data) => ({
  type: actionTypes.GET_CURRENT_AVERAGE_SUCCESS,
  data,
});

/**
 * GET_CURRENT_AVERAGE_ERROR action creator
 * @param {Error} error - Caught Error object
 * @return {object} - GET_CURRENT_AVERAGE_ERROR action object 
 */
export const getCurrentAverageError = (error) => ({
  type: actionTypes.GET_CURRENT_AVERAGE_ERROR,
  error,
});
