import Immutable from 'immutable';

import { actions } from 'currency-pair-tracking-actions';

import { reducer } from '../src';
import createInitialState from '../src/initial-state';
import { connectionPairs, connectionId } from './mock-data';

test('return the initial state', () => {
  expect(
    reducer(undefined, {})
  ).toEqual(createInitialState());
});

test('handle the OPEN_CURRENCY_PAIR_TRACKING_CONNECTION_SUCCESS action', () => {
  const state = reducer(
    createInitialState(),
    actions.openCurrencyPairTrackingConnectionSuccess(
      connectionId,
      connectionPairs,
    )
  )
  // Expect connections state property to be a Map
  expect(state.get('connections')).toBeInstanceOf(Immutable.Map);

  // Expect connections state Map to have two entries
  // (based on mock data)
  expect(state.get('connections').size).toEqual(2);

  // Expect each entry of connections state Map to equal
  // their corresponding connectionId
  expect(
    state.get('connections').reduce(
      (current, currentConnectionId) => {
        if(currentConnectionId !== connectionId) {
          current = false;
        }
        return current;
      }, true)
  ).toEqual(true);
});

test('handle CLOSE_CURRENCY_PAIR_TRACKING_CONNECTION_SUCCESS action', () => {
  const state = reducer(
    createInitialState(),
    actions.closeCurrencyPairTrackingConnectionSuccess(connectionId)
  );

  // Expect connections state property to be a Map
  expect(state.get('connections')).toBeInstanceOf(Immutable.Map);

  // none of the mapped connection IDs should match
  // the connectionId from ./mock-data.js after that
  // connection has been successfully closed
  expect(
    state.get('connections').reduce(
      (current, currentConnectionId) => {
        if (currentConnectionId === connectionId) {
          current = false;
        }
        return current;
      }, true)
  ).toEqual(true);
});