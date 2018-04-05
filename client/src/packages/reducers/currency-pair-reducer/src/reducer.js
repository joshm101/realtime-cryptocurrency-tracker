import Immutable from 'immutable';

import { actionTypes as currencyPairActionTypes }
  from 'currency-pair-actions';
import { actionTypes as currencyPairTrackingActionTypes }
  from 'currency-pair-tracking-actions';

import initialState from './initial-state';

/**
 * Reducer for managing currency pair data
 * @param {Map} state - Current state 
 * @param {object} action - Action object to process 
 */
const currencyPairReducer = (state = initialState, action) => {
  switch (action.type) {
    case currencyPairActionTypes.GET_CURRENT_AVERAGE_SET_SUCCESS:
      return handleGetCurrentAverageSetSuccess(state, action);
    case currencyPairTrackingActionTypes.RECEIVED_CURRENCY_PAIR_TRACKING_MESSAGE:
      return handleReceivedCurrencyPairTrackingMessage(state, action);
    default:
      return state;
  }
}

/**
 * Handles RECEIVED_CURRENCY_PAIR_TRACKING_MESSAGE action
 * @param {Map} state - Current state 
 * @param {object} action - RECEIVED_CURRENCY_PAIR_TRACKING_MESSAGE
 * action object
 * @return {Map} - Updated state 
 */
const handleReceivedCurrencyPairTrackingMessage = (state, action) => {
  const { data } = action;
  const fromSymbol = data.FROMSYMBOL;
  const toSymbol = data.TOSYMBOL;
  // update data for fromSymbol/toSymbol currency pair
  return state.mergeIn(
    [`${fromSymbol}/${toSymbol}`],
    Immutable.fromJS(data)
  );
}

/**
 * Handles GET_CURRENT_AVERAGE_SET_SUCCESS action
 * @param {Map} state - Current state 
 * @param {object} action - GET_CURRENT_AVERAGE_SET_SUCCESS
 * action object
 * @return {Map} - Updated state 
 */
const handleGetCurrentAverageSetSuccess = (state, action) => {
  const { dataArray } = action;
  const newState = dataArray.reduce((current, data) => {
    // consolidate data from RAW and DISPLAY into one
    // set of data to store in reducer.
    const fromSymbol = data.RAW.FROMSYMBOL
    const toSymbol = data.RAW.TOSYMBOL;
    const fromCurrencySymbol = data.DISPLAY.FROMSYMBOL;
    const toCurrencySymbol = data.DISPLAY.TOSYMBOL;
    data.RAW.FROMCURRENCYSYMBOL = fromCurrencySymbol;
    data.RAW.TOCURRENCYSYMBOL = toCurrencySymbol;
    current[`${fromSymbol}/${toSymbol}`] = data.RAW;
    return current;
  }, {});
  return state.merge(
    Immutable.fromJS(newState)
  );
}

export default currencyPairReducer;
