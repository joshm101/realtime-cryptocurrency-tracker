import { actions } from 'currency-pair-tracking-actions';

const connectionId = 'some_id';
const connectionPairs = [
  {
    fromSymbol: 'BTC',
    toSymbol: 'USD',
  },
  {
    fromSymbol: 'ETH',
    toSymbol: 'USD',
  },
];

const openConnectionTimeoutAction = actions.openCurrencyPairTrackingConnectionTimeout(
  connectionId,
  connectionPairs,
  new Error('Open currency pair tracking connection timeout error test.'),
);

const openConnectionErrorAction = actions.openCurrencyPairTrackingConnectionError(
  connectionId,
  connectionPairs,
  new Error('Open currency pair tracking connection error test.'),
);

const disconnectAction = actions.currencyPairTrackingConnectionDisconnect(
  connectionId,
  connectionPairs,
  new Error('Disconnect error test'),
);

const connectionErrorAction = actions.currencyPairTrackingConnectionError(
  connectionId,
  connectionPairs,
  new Error('Active connection error test'),
);

const unknownConnectionErrorAction = actions.currencyPairTrackingConnectionUnknownError(
  connectionPairs,
  new Error('Unknown error test.'),
);


export {
  connectionId,
  connectionPairs,
  openConnectionTimeoutAction,
  openConnectionErrorAction,
  disconnectAction,
  connectionErrorAction,
  unknownConnectionErrorAction,
}
