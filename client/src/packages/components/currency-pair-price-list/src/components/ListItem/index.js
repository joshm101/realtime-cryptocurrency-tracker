import React from 'react';

import UpdatedPrice from 'updated-price';

import QuickInfo from './components/QuickInfo';

const ListItem = ({
  fromSymbol,
  toSymbol,
  fromCurrencySymbol,
  toCurrencySymbol,
  currentPrice,
  change24h,
  changePercent24h,
  volume24hTo,
}) => (
  <div className="cppl-list-item">
    <div className="cppl-top">
      <div className="cppl-pair-name">
        { fromSymbol } / { toSymbol }
      </div>
      <div className="cppl-updated-price-wrap">
        <UpdatedPrice
          toCurrencySymbol={toCurrencySymbol}
          price={currentPrice}
        />
      </div>
    </div>
    <QuickInfo
      toCurrencySymbol={toCurrencySymbol}
      change24h={change24h}
      changePercent24h={changePercent24h}
      volume24hTo={volume24hTo}
    />
  </div>
);

export default ListItem;