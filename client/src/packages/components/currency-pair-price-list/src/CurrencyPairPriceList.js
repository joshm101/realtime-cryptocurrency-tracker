import React from 'react';
import { List, ListSubheader, Card, CardContent } from 'material-ui';

import CurrencyPairPrice from 'currency-pair-price';
import CryptoCompareSocketConnectionEnum 
  from 'cc-socket-connection-enum';

import ListItem from './components/ListItem';
  
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

  /**
   * Derives the change amount in the last 24 hours
   * using the open price for the last 24 hours and
   * the current price.
   * 
   * @param {object} trackedPair - Currency pair to calculate
   * the 24 hour change for
   * @return {object} Change in price and percentage for the
   * last 24 hours.
   */
  calculate24HourChange = (trackedPair) => {
    const open24h = trackedPair.OPEN24HOUR;
    const price = trackedPair.PRICE;
    const change24h = price - open24h;
    return {
      change24h,
      changePercent24h: (change24h / open24h) * 100,
    }
  }

  render() {
    const trackedPairsArray = Object.values(
      this.props.trackedPairs || []
    );
    return (
      <div>
        {trackedPairsArray &&
          trackedPairsArray.map(trackedPair =>
            <div 
              key={`${trackedPair.FROMSYMBOL}/${trackedPair.TOSYMBOL}`}
              className="cppl-list-item-container"
            >
              <ListItem
                fromSymbol={trackedPair.FROMSYMBOL}
                toSymbol={trackedPair.TOSYMBOL}
                fromCurrencySymbol={trackedPair.FROMCURRENCYSYMBOL}
                toCurrencySymbol={trackedPair.TOCURRENCYSYMBOL}
                currentPrice={trackedPair.PRICE}
                change24h={this.calculate24HourChange(trackedPair).change24h}
                changePercent24h={this.calculate24HourChange(trackedPair).changePercent24h}
                volume24hTo={trackedPair.VOLUME24HOURTO}
              />
            </div>
          )
        }
      </div>
    );
  }
}

export default CurrencyPairPriceList;
