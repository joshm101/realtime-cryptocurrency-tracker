import { actions, actionTypes } from 'currency-pair-tracking-actions';

import connectionNotEstablishedHandler
  from '../../../src/socket-event-handlers/connection-not-established-handler';
import {
  connectionId,
  openConnectionTimeoutAction,
  openConnectionErrorAction,
  unknownConnectionErrorAction,
} from '../../mock-data';

test(
  'Should return a ' +
  `${actionTypes.OPEN_CURRENCY_PAIR_TRACKING_CONNECTION_TIMEOUT} ` +
  'action followed by a ' +
  `${actionTypes.CLOSE_CURRENCY_PAIR_TRACKING_CONNECTION} ` +
  'action when provided a ' +
  `${actionTypes.OPEN_CURRENCY_PAIR_TRACKING_CONNECTION_TIMEOUT} action.`,
  () => {
    const activeGenerator = connectionNotEstablishedHandler(openConnectionTimeoutAction);

    const firstResult = activeGenerator.next().value;
    expect(firstResult.PUT.action).toMatchObject(openConnectionTimeoutAction);

    const secondResult = activeGenerator.next().value;
    expect(secondResult.PUT.action).toMatchObject(
      actions.closeCurrencyPairTrackingConnection(connectionId)
    );
  }
);

test(
  'Should return a ' +
  `${actionTypes.CURRENCY_PAIR_TRACKING_CONNECTION_UNKNOWN_ERROR} ` +
  'action followed by a ' +
  `${actionTypes.CLOSE_CURRENCY_PAIR_TRACKING_CONNECTION} ` +
  'action when provided a ' +
  `${actionTypes.CURRENCY_PAIR_TRACKING_CONNECTION_UNKNOWN_ERROR} action.`,
  () => {
    const activeGenerator = connectionNotEstablishedHandler(unknownConnectionErrorAction);

    const firstResult = activeGenerator.next().value;
    expect(firstResult.PUT.action).toMatchObject(unknownConnectionErrorAction);

    const secondResult = activeGenerator.next().value;
    expect(secondResult.PUT.action).toMatchObject(
      // no connectionId supplied during an unknown error
      actions.closeCurrencyPairTrackingConnection()
    );
  }
);