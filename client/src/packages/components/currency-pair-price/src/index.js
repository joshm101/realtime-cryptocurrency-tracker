import React from 'react';
import ArrowDropUp from 'material-ui-icons/ArrowDropUp';
import ArrowDropDown from 'material-ui-icons/ArrowDropDown';

import UpdatedPrice from 'updated-price';

import TradeInfo from './components/trade-info';

class CurrencyPairPrice extends React.Component {
  render() {
    const {
      fromSymbol,
      toSymbol,
      fromCurrencySymbol,
      toCurrencySymbol,
      currentPrice,
      open24h,
      high24h,
      low24h,
      change24h,
      changePercent24h,
      volume24h,
      currencySymbol
    } = this.props;
  
    return (
      <div>
        <h2>
          {fromSymbol || 'ETH'} / {toSymbol || 'USD'}
        </h2>
        <UpdatedPrice 
          price={currentPrice}
          toCurrencySymbol={toCurrencySymbol}
        />
        <div className="cpp-trade-info-container">
          <TradeInfo
            fromCurrencySymbol={fromCurrencySymbol}
            toCurrencySymbol={toCurrencySymbol}
            change24h={change24h}
            open24h={open24h}
            high24h={high24h}
            low24h={low24h}
            volume24h={volume24h}
            changePercent24h={changePercent24h}
          />
        </div>
      </div>
    );
  }
}

export default CurrencyPairPrice;