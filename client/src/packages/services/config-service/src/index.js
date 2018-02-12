let instance = null;

/**
 * Singleton service that provides various configuration
 * data to other areas of the application.
 */
class ConfigService {
  constructor() {
    if (!instance) {
      // null instance means that this is the
      // first time the service is being
      // instantiated. Set the instance variable
      instance = this;
    }

    // Always return the instance variable that is
    // set on first instantiation to ensure
    // this service is a singleton.
    return instance;
  }

  get coinListUrl() {
    return 'https://min-api.cryptocompare.com/data/all/coinlist';
  }

  get cryptoCompareSocketUrl() {
    return 'wss://streamer.cryptocompare.com/';
  }
}

export default ConfigService;