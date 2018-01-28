import { expectSaga } from 'redux-saga-test-plan';

import getCoinListSaga from '../src';
import { actions, actionTypes } from 'coins-actions';
import MockDataService from 'mock-data-service';

const mockDataService = new MockDataService();

test(
  'gets coin list when GET_COIN_LIST action is dispatched',
  () => {
    return expectSaga(
      getCoinListSaga
    ).put(
      actions.getCoinListSuccess(
        Object.values(
          mockDataService.coinListData.Data
        )
      )
    ).dispatch(
      actions.getCoinList()

      // silentRun() used because getCoinListSaga
      // uses takeEvery, an infinite loop.
      // expectSaga cancels ("finishes") a saga
      // by default after 250ms so that the
      // saga result can be tested. The timeout
      // by expectSaga is desired, so the warning
      // thrown by run() is not a valid warning,
      // hence usage of silentRun() to suppress
      // that warning.
    ).silentRun();
  }
)