import CurrencyPairService from '../src';
import MockDataService from 'mock-data-service';

const currencyPairService = new CurrencyPairService();
const mockDataService = new MockDataService();

test('get currency pair average', () => {
  expect.assertions(1);
  return currencyPairService.getCurrentAverage(
    'WAN', 'ICX',
  ).then(response =>
    expect(response).toMatchObject(
      mockDataService.currentAverageData
    )
  );
});