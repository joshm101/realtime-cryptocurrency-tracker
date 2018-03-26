import ApiService from 'api-service';

const baseApiUrl = 'https://min-api.cryptocompare.com/data';

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
    const url = `${baseApiUrl}/generateAvg?` +
                `fsym=${fromSymbol}&` +
                `tsym=${toSymbol}&` +
                `e=CCCAGG`; 
    return this.apiService.get(url);
  }
}

export default CurrencyPairService;