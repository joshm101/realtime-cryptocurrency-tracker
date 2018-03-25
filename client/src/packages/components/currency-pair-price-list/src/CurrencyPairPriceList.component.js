import React from 'react';

import CurrencyPairPrice from 'currency-pair-price';

class CurrencyPairPriceList extends React.Component {
  render() {
    const trackedPairsArray = Object.values(
      this.props.trackedPairs || []
    );
    return (
      <div className="currency-pair-list-container">
        {trackedPairsArray &&
          trackedPairsArray.map(trackedPair =>
            <div
              key={`${trackedPair.FROMSYMBOL}/${trackedPair.TOSYMBOL}`}
            >
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
            </div>
          )
        }
      </div>
    );
  }
}

export default CurrencyPairPriceList;