/**
 * Tests for coin action creators
 */

import { actions, actionTypes } from '../src';

test('action objects should be properly created', () => {
  const coins = [{}, {}, {}];
  const error = 'An error occurred while fetching coins list.';
  
  expect(
    actions.getCoinsList()
  ).toMatchObject(
    {
      type: actionTypes.GET_COINS_LIST
    }
  );
  expect(
    actions.getCoinsListSuccess(coins)
  ).toMatchObject(
    {
      type: actionTypes.GET_COINS_LIST_SUCCESS,
      payload: {
        coins
      }
    }
  );
  expect(
    actions.getCoinsListError(error)
  ).toMatchObject(
    {
      type: actionTypes.GET_COINS_LIST_ERROR,
      payload: expect.any(Error)
    }
  );
});