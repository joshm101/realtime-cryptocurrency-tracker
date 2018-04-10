import { actionTypes } from 'currency-pair-tracking-actions';

import { disconnectAction } from '../../mock-data';
import connectionDisconnectHandler
  from '../../../src/socket-event-handlers/connection-disconnect-handler';

test(
  'Should dispatch a ' +
  `${actionTypes.CURRENCY_PAIR_TRACKING_CONNECTION_DISCONNECT} ` +
  'action when provided an EventChannel disconnect action.',
  () => {
    const activeGenerator = connectionDisconnectHandler(disconnectAction);
    const result = activeGenerator.next().value;
    expect(result.PUT.action.type).toEqual(
      actionTypes.CURRENCY_PAIR_TRACKING_CONNECTION_DISCONNECT
    );
    expect(result.PUT.action.connectionId).toEqual(
      disconnectAction.connectionId
    );
    expect(result.PUT.action.connectionPairs).toMatchObject(
      disconnectAction.connectionPairs
    );
    expect(result.PUT.action.error).toBeInstanceOf(Error);
  }
);
