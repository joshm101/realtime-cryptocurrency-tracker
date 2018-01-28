/**
 * Coins reducer tests
 */

import Immutable from 'immutable';
import { isKeyed } from 'immutable';
import { v4 } from 'uuid';

import { reducer } from '../src';
import createInitialState from '../src/initial-state';

import { actions } from 'coins-actions';

test('return the initial state', () => {
  expect(
    reducer(undefined, {})
  ).toEqual(createInitialState());
});

test('handle GET_COINS_LIST action', () => {
  const state = reducer(
    createInitialState(), 
    actions.getCoinList()
  );
  expect(
    state.get('fetchingCoins')
  ).toEqual(
    createInitialState().set(
      'fetchingCoins', 
      true
    ).get('fetchingCoins')
  );
});

test('handle GET_COINS_LIST_SUCCESS action', () => {
  const coins = [
    {symbol: 'BTC'}, 
    {symbol: 'ETH'}, 
    {symbol: 'LTC'}
  ];

  const state = reducer(
    createInitialState(),
    actions.getCoinListSuccess(coins)
  );

  // Expect sortOrder to be a List
  expect(
    state.getIn(['coins', 'sortOrder'])
  ).toBeInstanceOf(Immutable.List);

  // Expect sortOrder to be of length 3
  expect(
    state.getIn(['coins', 'sortOrder']).size
  ).toEqual(3);
  
  // Expect byId to be a Map
  expect(
    state.getIn(['coins', 'byId'])
  ).toBeInstanceOf(Immutable.Map);

  // Expect byId to have 3 entries
  expect(
    state.getIn(['coins', 'byId']).size
  ).toEqual(3);

  // Expect each mapped value in the
  // byId Map to be a Map itself
  expect(
    (() => {
      // get sortOrder ids
      const ids = state.getIn(['coins', 'sortOrder']);

      // lookup each item in byId Map and ensure that
      // eached mapped coin value is an Immutable.Map
      state.getIn(['coins', 'byId']).forEach(coinMap => {
        if (!isKeyed(coinMap)) {
          // an item in the Map was found which itself
          // is not a Map. Failed test, return false.
          return false;
        }
      });

      // All items examined in the byId Map are Maps
      // themselves, test passed, return true
      return true;
    })()
  ).toEqual(true)
});

test('handle GET_COINS_LIST_ERROR action', () => {
  // create initial state by having reducer
  // process GET_COINS_LIST action which
  // would always happen before a 
  // GET_COINS_LIST_ERROR could be
  // dispatched
  const initialState = reducer(
    createInitialState(),
    actions.getCoinList()
  );

  // create resulting state by having reducer
  // process GET_COINS_LIST_ERROR action
  const state = reducer(
    initialState,
    actions.getCoinListError('Error')
  );

  expect(
    state.get('fetchingCoins')
  ).toEqual(false);
});