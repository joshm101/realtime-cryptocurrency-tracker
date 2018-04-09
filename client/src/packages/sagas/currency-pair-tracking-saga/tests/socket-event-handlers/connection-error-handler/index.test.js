import { actionTypes, actions } from 'currency-pair-tracking-actions';

import connectionErrorHandler 
  from '../../../src/socket-event-handlers/connection-error-handler';
import { 
  disconnectAction,
  connectionErrorAction,
  unknownConnectionErrorAction,
  connectionId
} from '../../mock-data';

test(
  'Should return a ' + 
  `${actionTypes.CURRENCY_PAIR_TRACKING_CONNECTION_DISCONNECT} ` + 
  'action followed by a ' +
  `${actionTypes.CLOSE_CURRENCY_PAIR_TRACKING_CONNECTION} ` +
  'action when provided a' +
  `${actionTypes.CURRENCY_PAIR_TRACKING_CONNECTION_DISCONNECT} action.`,
  () => {
    const activeGenerator = connectionErrorHandler(disconnectAction);

    const firstResult = activeGenerator.next().value;
    expect(firstResult.PUT.action).toMatchObject(disconnectAction);

    const secondResult = activeGenerator.next().value;
    expect(secondResult.PUT.action).toMatchObject(
      actions.closeCurrencyPairTrackingConnection(connectionId)
    );
  }
);

test(
  'Should return a ' +
  `${actionTypes.CURRENCY_PAIR_TRACKING_CONNECTION_ERROR} ` +
  'action followed by a ' +
  `${actionTypes.CLOSE_CURRENCY_PAIR_TRACKING_CONNECTION} ` +
  'action when provided a ' +
  `${actionTypes.CURRENCY_PAIR_TRACKING_CONNECTION_ERROR} action.`,
  () => {
    const activeGenerator = connectionErrorHandler(connectionErrorAction)

    const firstResult = activeGenerator.next().value;
    expect(firstResult.PUT.action).toMatchObject(connectionErrorAction);

    const secondResult = activeGenerator.next().value;
    expect(secondResult.PUT.action).toMatchObject(
      actions.closeCurrencyPairTrackingConnection(connectionId)
    );
  }
)

test(
  'Should return a ' +
  `${actionTypes.CURRENCY_PAIR_TRACKING_CONNECTION_UNKNOWN_ERROR} ` +
  'action followed by a ' +
  `${actionTypes.CLOSE_CURRENCY_PAIR_TRACKING_CONNECTION} ` +
  'action when provided a ' +
  `${actionTypes.CURRENCY_PAIR_TRACKING_CONNECTION_UNKNOWN_ERROR} action.`,
  () => {
    const activeGenerator = connectionErrorHandler(unknownConnectionErrorAction);

    const firstResult = activeGenerator.next().value;
    expect(firstResult.PUT.action).toMatchObject(unknownConnectionErrorAction);

    const secondResult = activeGenerator.next().value;
    expect(secondResult.PUT.action).toMatchObject(
      // no connectionId supplied during an unknown error
      actions.closeCurrencyPairTrackingConnection()
    );
  }
)