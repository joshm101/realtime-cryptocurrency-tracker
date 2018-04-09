import { actions } from 'currency-pair-tracking-actions';

import { connectionPairs } from '../../mock-data';
import createCurrencyPairTrackingEventChannel
  from '../../../src/factories/currency-pair-tracking-event-channel';

import { NO_CONNECTION_PAIRS_SPECIFIED } from '../../../src/misc-errors';

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
)