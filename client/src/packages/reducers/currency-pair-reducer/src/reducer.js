import Immutable from 'immutable';

import { actionTypes as currencyPairActionTypes }
  from 'currency-pair-actions';
import { actionTypes as currencyPairTrackingActionTypes }
  from 'currency-pair-tracking-actions';

import initialState from './initial-state';

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

const handleReceivedCurrencyPairTrackingMessage = (state, action) => {
  const { data } = action;
  const fromSymbol = data.FROMSYMBOL;
  const toSymbol = data.TOSYMBOL;
  return state.mergeIn(
    [`${fromSymbol}/${toSymbol}`],
    Immutable.fromJS(data)
  );
}

const handleGetCurrentAverageSetSuccess = (state, action) => {
  const { dataArray } = action;
  const newState = dataArray.reduce((current, data) => {
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
