
let instance = null;

/**
 * Singleton service used to generate CryptoCompare
 * WebSocket API connection strings
 */
class CryptoCompareSocketConnectionStringFactory {
  constructor() {
    if (!instance) {
      // First instantiation of this service, set
      // single instance variable
      instance = this;
    }

    // Always return single instance variable
    return instance;
  }

  /**
   * Generates a CryptoCompare WebSocket connection
   * string with the given parameters
   * @param {number} connectionTypeId CryptoCompareSocketConnectionEnum
   * value --required--
   * @param {string} fromSymbol --required--
   * @param {string} toSymbol --required--
   * @param {string} exchange Default: 'CCCAGG'
   * @return {string} Connection string or undefined if
   * any of the required parameters are not supplied 
   */
  generateSocketConnectionString(
    connectionTypeId,
    fromSymbol,
    toSymbol,
    exchange = 'CCCAGG'
  ) {
    
    // 0 is a valid connection type ID, so explicitly check
    // for undefined
    if (connectionTypeId === undefined || !fromSymbol || !toSymbol) {
      // at least one required parameter has not been supplied,
      // return undefined
      return undefined;
    }

    // all required parameters supplied, return connection string.
    return `${connectionTypeId}~${exchange}~${fromSymbol}~${toSymbol}`;
  }
}

export default CryptoCompareSocketConnectionStringFactory;