import fetchMock from 'fetch-mock';
import ConfigService from 'config-service';
import MockDataService from 'mock-data-service';

const configService = new ConfigService();
const mockDataService = new MockDataService();

// mock fetch requests to the coin list
// URL and return the mocked coin list 
// data provided by MockDataService
fetchMock.get(
  configService.coinListUrl, 
  mockDataService.coinListData
);