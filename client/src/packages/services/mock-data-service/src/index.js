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

  get currentAverageData() {
    return {
      "RAW":{
        "MARKET":"CUSTOMAGG",
        "FROMSYMBOL":"WAN",
        "TOSYMBOL":"ETH",
        "FLAGS":0,
        "PRICE":0.008215,
        "LASTUPDATE":1522956958,
        "LASTVOLUME":4,
        "LASTVOLUMETO":0.03285832,
        "LASTTRADEID":"222465",
        "VOLUME24HOUR":447449,
        "VOLUME24HOURTO":3647.3179821900007,
        "OPEN24HOUR":0.008221,
        "HIGH24HOUR":0.008333,
        "LOW24HOUR":0.00801,
        "LASTMARKET":"CCCAGG",
        "CHANGE24HOUR":-0.000005999999999999062,
        "CHANGEPCT24HOUR":-0.07298382191946311,
        "CHANGEDAY":0,
        "CHANGEPCTDAY":0
      },
      "DISPLAY":{
        "FROMSYMBOL":"WAN",
        "TOSYMBOL":"Ξ",
        "MARKET":"CUSTOMAGG",
        "PRICE":"Ξ 0.008215",
        "LASTUPDATE":"1 min ago",
        "LASTVOLUME":"WAN 4.00",
        "LASTVOLUMETO":"Ξ 0.03286",
        "LASTTRADEID":"222465",
        "VOLUME24HOUR":"WAN 447,449.0",
        "VOLUME24HOURTO":"Ξ 3,647.32",
        "OPEN24HOUR":"Ξ 0.008221",
        "HIGH24HOUR":"Ξ 0.008333",
        "LOW24HOUR":"Ξ 0.008010",
        "LASTMARKET":"CCCAGG",
        "CHANGE24HOUR":"Ξ -0.0000060",
        "CHANGEPCT24HOUR":"-0.07",
        "CHANGEDAY":"Ξ 0",
        "CHANGEPCTDAY":"0"
      }
    };
  }
}

export default MockDataService;