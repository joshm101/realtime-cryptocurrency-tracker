import React from 'react';

import NumberWithCommas from 'number-with-commas';
import Volume from 'volume';
import Change24h from 'change-24h';

import QuickInfoItem from './QuickInfoItem';

const QuickInfo = ({
  toCurrencySymbol,
  change24h,
  changePercent24h,
  volume24hTo,
}) => {
  return (
    <div className="cppl-quick-info">
      <QuickInfoItem subtext="24h volume">
        <Volume
          symbol={toCurrencySymbol}
          value={volume24hTo}
        />
      </QuickInfoItem>
      <QuickInfoItem subtext="24h change">
        <Change24h
          symbol={toCurrencySymbol}
          changeAmount={change24h}
          changePercent={changePercent24h}
        />
      </QuickInfoItem>
    </div>
  );
}

export default QuickInfo;