import * as actionTypes from './actionTypes';

export const getCurrentAverage = (fromSymbol, toSymbol) => ({
  type: actionTypes.GET_CURRENT_AVERAGE,
  fromSymbol,
  toSymbol,
});

export const getCurrentAverageSetSuccess = (dataArray) => ({
  type: actionTypes.GET_CURRENT_AVERAGE_SET_SUCCESS,
  dataArray,
});

export const getCurrentAverageSuccess = (data) => ({
  type: actionTypes.GET_CURRENT_AVERAGE_SUCCESS,
  data,
});

export const getCurrentAverageError = (error) => ({
  type: actionTypes.GET_CURRENT_AVERAGE_ERROR,
  error,
});
