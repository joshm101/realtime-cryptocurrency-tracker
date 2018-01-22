/**
 * Coins action creators
 */

import * as actionTypes from './action-types';

export const getCoinList = () => {
  return {
    type: actionTypes.GET_COIN_LIST
  };
};

export const getCoinListSuccess = (coins) => {
  return {
    type: actionTypes.GET_COIN_LIST_SUCCESS,
    payload: {
      coins
    }
  };
};

export const getCoinListError = (error) => {
  return {
    type: actionTypes.GET_COIN_LIST_ERROR,
    payload: new Error(error)
  };
};