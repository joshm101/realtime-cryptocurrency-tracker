import io from 'socket.io-client';

import CryptoCompareSocketConnectionService from '../src';
import CryptoCompareSocketConnectionEnum from 'cc-socket-connection-enum';

const cryptoCompareSocketConnectionService = new CryptoCompareSocketConnectionService();
const TRADE = CryptoCompareSocketConnectionEnum.TRADE;
const fromSymbol = 'BTC';
const toSymbol = 'USD';
const connectionPairs = [
  {
    connectionTypeId: TRADE,
    fromSymbol,
    toSymbol
  }
];

// format of
// 1~CCCAGG~BTC~USD
// 0~Gemini~BTC~ETH
// 1~Binance~ICX~ETH
// etc.
const regex = /[0-9]~[A-Za-z]{4,}~[A-Za-z]{2,7}~[A-Za-z]{2,7}/;

test('Opens a WebSocket connection with CryptoCompare API', () => {
  expect(
    cryptoCompareSocketConnectionService.openConnection(
      connectionPairs
    ).socket
  ).toBeInstanceOf(io.Socket)
});

test('Generates a connection string', () => {
  const connectionPairObject = connectionPairs[0];
  expect(
    regex.test(
      cryptoCompareSocketConnectionService.generateConnectionString(
        connectionPairObject
      )
    )
  ).toBeTruthy();

  // test output when supplied bad input
  expect(
    cryptoCompareSocketConnectionService.generateConnectionString(
      undefined
    )
  ).toBeUndefined();
  expect(
    cryptoCompareSocketConnectionService.generateConnectionString({
      TRADE,
      undefined 
    })
  ).toBeUndefined();
});


test('Closes a WebSocket connection', () => {
  const connectionId = cryptoCompareSocketConnectionService.openConnection(
    connectionPairs
  ).connectionId;

  expect(
    cryptoCompareSocketConnectionService.closeConnection(connectionId)
  ).toBeTruthy();
});

test('Closes all WebSocket connections', () => {
  const connectionId = cryptoCompareSocketConnectionService.openConnection(
    connectionPairs
  ).connectionId;

  // Expect connection entry to have been created
  expect(
    cryptoCompareSocketConnectionService.socketConnections
  ).toHaveProperty(connectionId);

  // close all connections
  cryptoCompareSocketConnectionService.closeAllConnections();

  // expect object of socket connections to be empty after
  // invoking closeAllConnections()
  expect (
    cryptoCompareSocketConnectionService.socketConnections
  ).toMatchObject({});
});