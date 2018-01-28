import { call, put, takeEvery } from 'redux-saga/effects';

import CoinsService from 'coins-service';
import { actions, actionTypes } from 'coins-actions';

const coinsService = new CoinsService();

function* getCoinListHandler(action) {
  try {
    // retrieve coin list from the api
    const getCoinListResponse = yield call(
      coinsService.getCoinList.bind(coinsService)
    );

    // API returns a symbol name lookup object in
    // the "Data" property. Call Object.values() on
    // the lookup object to convert to an array of
    // coin objects
    const coins = Object.values(getCoinListResponse.Data)

    // dispatch a GET_COIN_LIST_SUCCESS action object
    yield put(
      actions.getCoinListSuccess(coins)
    );
  } catch (e) {
    // an error occurred during retrieval of
    // coin list, dispatch GET_COIN_LIST_ERROR
    // action
    yield put(
      actions.getCoinListError(e)
    )
  }
}

function* getCoinListSaga() {
  yield takeEvery(
    actionTypes.GET_COIN_LIST, 
    getCoinListHandler
  );
}

export default getCoinListSaga;