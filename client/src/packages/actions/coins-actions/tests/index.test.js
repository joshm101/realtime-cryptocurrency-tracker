/**
 * Tests for coin action creators
 */

import { actions, actionTypes } from '../src';

test('action objects should be properly created', () => {
  const coins = [{}, {}, {}];
  const error = 'An error occurred while fetching coins list.';
  
  expect(
    actions.getCoinList()
  ).toMatchObject(
    {
      type: actionTypes.GET_COIN_LIST
    }
  );
  expect(
    actions.getCoinListSuccess(coins)
  ).toMatchObject(
    {
      type: actionTypes.GET_COIN_LIST_SUCCESS,
      payload: {
        coins
      }
    }
  );
  expect(
    actions.getCoinListError(error)
  ).toMatchObject(
    {
      type: actionTypes.GET_COIN_LIST_ERROR,
      payload: expect.any(Error)
    }
  );
});