import Immutable from 'immutable';

import { actionTypes } from 'currency-pair-tracking-actions';
import initialState from './initial-state';

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

const handleOpenCurrencyPairTrackingConnectionSuccess = (state, action) =>
  state.updateIn(['connections'], connections => 
    connections.merge(
      Immutable.fromJS({
        ...action.connectionPairs.reduce((current, connectionPair) => ({
          ...current,
          [`${connectionPair.fromSymbol}/${connectionPair.toSymbol}`]: action.connectionId
        }), {})
      })
    ),
  );

const handleCloseCurrencyPairTrackingConnectionSuccess = (state, action) =>
  state.updateIn(['connections'], connections =>
    connections.filter(connectionId =>
      connectionId !== action.connectionId
    ),
  );


export default currencyPairConnectionsReducer;