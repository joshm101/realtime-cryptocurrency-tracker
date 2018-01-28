import CoinsService from '../src';
import MockDataService from 'mock-data-service';

const coinsService = new CoinsService();
const mockDataService = new MockDataService();


test('get coin list', () => {
  expect.assertions(1);
  return coinsService.getCoinList().then(response =>
    expect(response).toMatchObject(mockDataService.coinListData)
  );
});