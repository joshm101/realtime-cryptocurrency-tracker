/**
 * Defines the intial state for the coins reducer.
 * 
 * This definition is exported as a factory function
 * which generates the specified initial state Map.
 */

import Immutable from 'immutable';

const createInitialState = () => Immutable.fromJS({
  // UUID key: value lookup Map. Each entry maps a
  // UUID key to a coin/cryptocurrency.
  byId: {},
  
  // UUID string sort array. Dictates sort order of
  // coins/cryptocurrencies in byId Map
  sortOrder: [],

  // flag indicating whether the application is currently
  // fetching list of coins
  fetchingCoins: false
});

export default createInitialState;