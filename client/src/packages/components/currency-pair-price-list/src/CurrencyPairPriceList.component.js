import React from 'react';
import { Card, CardContent } from 'material-ui';

import CurrencyPairPrice from 'currency-pair-price';
import CryptoCompareSocketConnectionEnum 
  from 'cc-socket-connection-enum';
  
class CurrencyPairPriceList extends React.Component {
  componentDidMount() {
    this.props.startCurrencyPairTracking([
      {
        connectionTypeId: CryptoCompareSocketConnectionEnum.CURRENTAGG,
        fromSymbol: 'BTC',
        toSymbol: 'USD',
      },
      {
        connectionTypeId: CryptoCompareSocketConnectionEnum.CURRENTAGG,
        fromSymbol: 'ETH',
        toSymbol: 'USD',
      },
      {
        connectionTypeId: CryptoCompareSocketConnectionEnum.CURRENTAGG,
        fromSymbol: 'ICX',
        toSymbol: 'ETH',
      },
    ]);
    this.props.startCurrencyPairTracking([
      {
        connectionTypeId: CryptoCompareSocketConnectionEnum.CURRENTAGG,
        fromSymbol: 'WAN',
        toSymbol: 'ETH',
      },
      {
        connectionTypeId: CryptoCompareSocketConnectionEnum.CURRENTAGG,
        fromSymbol: 'LTC',
        toSymbol: 'USD',
      },
      {
        connectionTypeId: CryptoCompareSocketConnectionEnum.CURRENTAGG,
        fromSymbol: 'ITC',
        toSymbol: 'ETH',
      },
    ]);
  }

  render() {
    const trackedPairsArray = Object.values(
      this.props.trackedPairs || []
    );
    return (
      <div className="currency-pair-list-container">
        {trackedPairsArray &&
          trackedPairsArray.map(trackedPair =>
            <Card
              key={`${trackedPair.FROMSYMBOL}/${trackedPair.TOSYMBOL}`}
              elevation={1}
            >
              <CardContent>
                <CurrencyPairPrice
                  fromSymbol={trackedPair.FROMSYMBOL}
                  toSymbol={trackedPair.TOSYMBOL}
                  fromCurrencySymbol={trackedPair.FROMCURRENCYSYMBOL}
                  toCurrencySymbol={trackedPair.TOCURRENCYSYMBOL}
                  currentPrice={trackedPair.PRICE}
                  open24h={trackedPair.OPEN24HOUR}
                  high24h={trackedPair.HIGH24HOUR}
                  low24h={trackedPair.LOW24HOUR}
                  change24h={trackedPair.CHANGE24HOUR}
                  changePercent24h={trackedPair.CHANGEPCT24HOUR}
                  volume24h={trackedPair.VOLUME24HOUR}
                />
              </CardContent>
            </Card>
          )
        }
      </div>
    );
  }
}

export default CurrencyPairPriceList;