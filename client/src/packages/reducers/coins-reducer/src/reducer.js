/**
 * Reducer logic for coins collection
 */

import createInitialState from './initial-state';

const initialState = createInitialState();

const coinsReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
}

export default coinsReducer;