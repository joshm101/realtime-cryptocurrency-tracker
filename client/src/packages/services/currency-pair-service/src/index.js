import ApiService from 'api-service';
import ConfigService from 'config-service';

const configService = new ConfigService();
const generateAverageUrl = configService.generateAverageUrl;

let instance = null;

/**
 * Singleton service which is used to retrieve
 * currency pair data.
 */
class CurrencyPairService {
  constructor() {
    if (!instance) {
      // first instantiation, set singleton
      // instance variable
      instance = this;
    }
    this.apiService = new ApiService();
    return instance;
  }

  getCurrentAverage(fromSymbol, toSymbol) {
    const url = `${generateAverageUrl}?` +
                `fsym=${fromSymbol}&` +
                `tsym=${toSymbol}&` +
                `e=CCCAGG`; 
    return this.apiService.get(url);
  }
}

export default CurrencyPairService;