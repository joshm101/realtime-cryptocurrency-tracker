let instance = null;

/**
 * Singleton service which provides mock
 * data to other areas of the application
 */
class MockDataService {
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

  get coinListData() {
    return {
      "BaseImageUrl": "https://www.cryptocompare.com",
      "BaseLinkUrl": 'https://www.cryptocompare.com',
      "Response": "Success",
      "Type": 100,
      "Message": "Coin list successfully returned!",
      "Data": { 
        "BTC": {
          "Algorithm": "SHA256",
          "CoinName": "Bitcoin",
          "FullName": "Bitcoin (BTC)",
          "FullyPremined": "0",
          "Id": "1182",
          "ImageUrl": "/media/19633/btc.png",
          "Name": "BTC",
          "PreMinedValue": "N/A",
          "ProofType": "PoW",
          "SortOrder": "1",
          "Sponsored": false,
          "Symbol": "BTC",
          "TotalCoinSupply": "21000000",
          "TotalCoinsFreeFloat": "N/A",
          "Url": "/coins/btc/overview",      
        },
        "ETH": {
          "Id": "7605",
          "Url": "/coins/eth/overview",
          "ImageUrl": "/media/20646/eth_logo.png",
          "Name": "ETH",
          "Symbol": "ETH",
          "CoinName": "Ethereum",
          "FullName": "Ethereum (ETH)",
          "Algorithm": "Ethash",
          "ProofType": "PoW",
          "FullyPremined": "0",
          "TotalCoinSupply": "0",
          "PreMinedValue": "N/A",
          "TotalCoinsFreeFloat": "N/A",
          "SortOrder": "2",
          "Sponsored": false
        },
        "LTC": {
          "Id": "3808",
          "Url": "/coins/ltc/overview",
          "ImageUrl": "/media/19782/litecoin-logo.png",
          "Name": "LTC",
          "Symbol": "LTC",
          "CoinName": "Litecoin",
          "FullName": "Litecoin (LTC)",
          "Algorithm": "Scrypt",
          "ProofType": "PoW",
          "FullyPremined": "0",
          "TotalCoinSupply": "84000000",
          "PreMinedValue": "N/A",
          "TotalCoinsFreeFloat": "N/A",
          "SortOrder": "3",
          "Sponsored": false
        },
        "ICX": {
          "Id": "324068",
          "Url": "/coins/icx/overview",
          "ImageUrl": "/media/12318192/icx.png",
          "Name": "ICX",
          "Symbol": "ICX",
          "CoinName": "ICON Project",
          "FullName": "ICON Project (ICX)",
          "Algorithm": "N/A",
          "ProofType": "LFT",
          "FullyPremined": "0",
          "TotalCoinSupply": "400230000",
          "PreMinedValue": "N/A",
          "TotalCoinsFreeFloat": "N/A",
          "SortOrder": "1642",
          "Sponsored": false
        }
      }
    };
  }
}

export default MockDataService;