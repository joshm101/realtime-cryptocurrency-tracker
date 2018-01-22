/**
 * Coins action creators
 */

import * as actionTypes from './action-types';

export const getCoinsList = () => {
  return {
    type: actionTypes.GET_COINS_LIST
  };
};

export const getCoinsListSuccess = (coins) => {
  return {
    type: actionTypes.GET_COINS_LIST_SUCCESS,
    payload: {
      coins
    }
  };
};

export const getCoinsListError = (error) => {
  return {
    type: actionTypes.GET_COINS_LIST_ERROR,
    payload: new Error(error)
  };
};