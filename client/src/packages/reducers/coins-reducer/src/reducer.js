/**
 * Reducer logic for coins collection
 */

import Immutable from 'immutable';
import { v4 } from 'uuid';

import createInitialState from './initial-state';
import { actionTypes } from 'coins-actions';

const initialState = createInitialState();

const coinsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_COINS_LIST:
      return handleGetCoinsList(state, action);
    case actionTypes.GET_COINS_LIST_SUCCESS:
      return handleGetCoinsListSuccess(state, action);
    case actionTypes.GET_COINS_LIST_ERROR:
      return handleGetCoinsListError(state, action);
    default:
      return state;
  }
};

/**
 * Handles GET_COINS_LIST action.
 * Sets the fetchingCoins state flag to true.
 * @param {Map} state Current coins reducer state slice
 * @param {any} action GET_COINS_LIST action object
 * @return {Map} Updated state
 */
const handleGetCoinsList = (state, action) => {
  return state.set('fetchingCoins', true);
};

/**
 * Handles GET_COINS_LIST_SUCCESS action
 * Sets the byId
 * @param {Map} state Current coins reducer state slice 
 * @param {any} action GET_COINS_LIST_SUCCESS action object
 * @return {Map} Updated state 
 */
const handleGetCoinsListSuccess = (state, action) => {
  // retrieve coins from action payload
  const { coins } = action.payload;

  // initialize empty ID sort order array
  let sortOrder = [];

  // construct byId lookup Map by converting
  // JS object resulting from reduce() to an
  // Immutable Map with Immutable.fromJS()
  const byId = Immutable.fromJS(
    coins.reduce((current, coin) => {
      // set entry for current coin object
      const uuid = v4();
      current[uuid] = coin;

      // append generated UUID to sortOrder array
      sortOrder = sortOrder.concat(uuid);

      return current;
    }, {})
  );
  
  // convert sortOrder array to a List using fromJS()
  sortOrder = Immutable.fromJS(sortOrder);

  // Return the updated state
  return state.setIn(
    ['coins', 'byId'],
    byId
  ).setIn(
    ['coins', 'sortOrder'],
    sortOrder
  ).set(
    'fetchingCoins', false
  );
}

const handleGetCoinsListError = (state, action) => {
  return state.set('fetchingCoins', false);
}

export default coinsReducer;