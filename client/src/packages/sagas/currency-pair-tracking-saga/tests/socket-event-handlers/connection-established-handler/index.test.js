import { actionTypes } from 'currency-pair-tracking-actions';

import connectionEstablishedHandler
  from '../../../src/socket-event-handlers/connection-established-handler';
import {
  openConnectionSuccessAction
} from '../../mock-data';

test(
  'Should return a ' +
  `${actionTypes.OPEN_CURRENCY_PAIR_TRACKING_CONNECTION_SUCCESS} ` +
  'action when provided a ' +
  'open connection success action from the EventChannel.',
  () => {
    const activeGenerator = connectionEstablishedHandler(
      openConnectionSuccessAction
    );
    const result = activeGenerator.next().value;
    expect(result.PUT.action).toMatchObject(openConnectionSuccessAction);
  }
);
