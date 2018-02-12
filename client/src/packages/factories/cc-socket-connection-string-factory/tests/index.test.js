import CryptoCompareSocketConnectionStringFactory
from '../src';
import CryptoCompareSocketConnectionEnum
from 'cc-socket-connection-enum';

const ccSocketConnectionStringFactory = new CryptoCompareSocketConnectionStringFactory();

test('generate a CryptoCompare WebSocket connection string', () => {
  // only necessary to test one value from enum
  const TRADE = CryptoCompareSocketConnectionEnum.TRADE;

  const fromSymbol = 'BTC';
  const toSymbol = 'USD';

  // format of
  // 1~CCCAGG~BTC~USD
  // 0~Gemini~BTC~ETH
  // 1~Binance~ICX~ETH
  // etc.
  const regex = /[0-9]~[A-Za-z]{4,}~[A-Za-z]{2,7}~[A-Za-z]{2,7}/;

  // test generation of string with proper input
  expect(
    regex.test(
      ccSocketConnectionStringFactory.generateSocketConnectionString(
        TRADE,
        fromSymbol,
        toSymbol
      )
    )
  ).toBeTruthy();


});

test('undefined connection string on bad input', () => {
  // only necessary to test one value from enum
  const TRADE = CryptoCompareSocketConnectionEnum.TRADE;

  const fromSymbol = 'BTC';
  const toSymbol = 'USD';

  // test return of undefined when given bad input
  expect(
    ccSocketConnectionStringFactory.generateSocketConnectionString(
      undefined,
      fromSymbol,
      toSymbol
    )
  ).toBeUndefined();
  expect(
    ccSocketConnectionStringFactory.generateSocketConnectionString(
      TRADE,
      undefined,
      toSymbol
    )
  ).toBeUndefined();
  expect(
    ccSocketConnectionStringFactory.generateSocketConnectionString(
      TRADE,
      fromSymbol,
      undefined
    )
  ).toBeUndefined();
  expect(
    ccSocketConnectionStringFactory.generateSocketConnectionString(
      TRADE,
      undefined,
    )
  ).toBeUndefined();
  expect(
    ccSocketConnectionStringFactory.generateSocketConnectionString(
      undefined
    )
  ).toBeUndefined();
  expect(
    ccSocketConnectionStringFactory.generateSocketConnectionString()
  ).toBeUndefined();
})