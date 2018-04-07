import Immutable from 'immutable';

import { actionTypes } from 'currency-pair-tracking-actions';
import createInitialState from './initial-state';

const initialState = createInitialState();

/**
 * Reducer for keeping track of open currency pair connections
 * @param {Map} state - Current state
 * @param {object} action - Action to process
 */
const currencyPairConnectionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.OPEN_CURRENCY_PAIR_TRACKING_CONNECTION_SUCCESS:
      return handleOpenCurrencyPairTrackingConnectionSuccess(
        state, action
      );
    case actionTypes.CLOSE_CURRENCY_PAIR_TRACKING_CONNECTION_SUCCESS:
      return handleCloseCurrencyPairTrackingConnectionSuccess(
        state, action
      );
    default:
      return state;
  }
}

/**
 * Handles OPEN_CURRENCY_PAIR_TRACKING_CONNECTION_SUCCESS action
 * @param {Map} state - Current state 
 * @param {object} action - OPEN_CURRENCY_PAIR_TRACKING_CONNECTION_SUCCESS
 * action object 
 */
const handleOpenCurrencyPairTrackingConnectionSuccess = (state, action) =>
  state.updateIn(['connections'], connections => 
    connections.merge(
      Immutable.fromJS({
        // take each connection pair that is tracked in the newly added
        // tracking connection and associate each one with the
        // provided connectionId
        ...action.connectionPairs.reduce((current, connectionPair) => ({
          ...current,
          // associate current pair being iterated over with the
          // connectionId of the opened connection
          [`${connectionPair.fromSymbol}/${connectionPair.toSymbol}`]: action.connectionId
        }), {})
      })
    ),
  );

/**
 * Handles CLOSE_CURRENCY_PAIR_TRACKING_CONNECTION_SUCCESS action
 * @param {Map} state - Current state 
 * @param {object} action - CLOSE_CURRENCY_PAIR_TRACKING_CONNECTION_SUCCESS
 * action object 
 */
const handleCloseCurrencyPairTrackingConnectionSuccess = (state, action) =>
  // Remove any pairs that are associated with the provided connectionId.
  // The connectionId represents the connection that was just closed.
  state.updateIn(['connections'], connections =>
    connections.filter(connectionId =>
      connectionId !== action.connectionId
    ),
  );


export default currencyPairConnectionsReducer;