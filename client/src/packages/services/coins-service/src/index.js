import ApiService from 'api-service';
import ConfigService from 'config-service';

let instance = null;

/**
 * Singleton class which is primarily tasked
 * with retrieving cryptocurrencies for the
 * application
 */
class CoinsService {
  constructor() {
    if (!instance) {
      // first instantiation of this class,
      // set instance variable to this
      instance = this;
    }
    this.apiService = new ApiService();
    this.configService = new ConfigService();
    this.coinListUrl = this.configService.coinListUrl;

    // return the single/only instance
    // of this class
    return instance;
  }

  /**
   * Retrieves all coins from the API
   * 
   * @return {Promise<any>} Coin list endpoint response
   */
  getCoinList() {
    return this.apiService.get(
      this.coinListUrl
    );
  }

}

export default CoinsService;