import { actions, actionTypes } from 'currency-pair-tracking-actions';
import CryptoCompareSocketConnectionService from 'cc-socket-connection-service';

import { connectionPairs } from '../../mock-data';
import createCurrencyPairTrackingEventChannel
  from '../../../src/factories/currency-pair-tracking-event-channel';

import { NO_CONNECTION_PAIRS_SPECIFIED } from '../../../src/misc-errors';

const socketConnectionService = new CryptoCompareSocketConnectionService();

test(
  'Should create an EventChannel when provided connection pairs',
  () => {
    const channel = createCurrencyPairTrackingEventChannel(connectionPairs);
    expect(channel).toHaveProperty('close');
    expect(channel).toHaveProperty('flush');
    expect(channel).toHaveProperty('take');
  }
);

test(
  'Should throw an error if no connection pairs are supplied',
  () => {
    expect(
      () => createCurrencyPairTrackingEventChannel(null)
    ).toThrow(NO_CONNECTION_PAIRS_SPECIFIED);
  }
);

test('EventChannel should respond to socket connect event', (done) => {  
  const channel = createCurrencyPairTrackingEventChannel(connectionPairs);
  expect.assertions(1);
  // channel.close();
  let connectionId;
  channel.take((action) => {
    expect(action.type).toEqual(
      actionTypes.OPEN_CURRENCY_PAIR_TRACKING_CONNECTION_SUCCESS
    );
    done();
  });

// set 1000ms argument to allow channel to resolve and invoke callback
// supplied to channel.take(). This is necessary because we want to
// test the result of take(), which is asynchronous.
}, 1000);

test('EventChannel should respond to disconnect event', (done) => {
  const channel = createCurrencyPairTrackingEventChannel(connectionPairs);
  expect.assertions(1);
  let connectionId;

  // take connection success action
  channel.take((action) => {

    // get connectionId and close corresponding connection.
    connectionId = action.connectionId;
    socketConnectionService.closeConnection(connectionId);

    // next emitted action after closing the connection
    // should be a disconnect action
    channel.take((action) => {
      expect(action.type).toEqual(
        actionTypes.CURRENCY_PAIR_TRACKING_CONNECTION_DISCONNECT
      );
      done();
    })
  });
}, 2000);
