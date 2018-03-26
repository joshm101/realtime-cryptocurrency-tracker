import React from 'react';

import NumberWithCommas from 'number-with-commas';

const TradeInfo = ({
  fromCurrencySymbol,
  toCurrencySymbol,
  change24h,
  open24h,
  high24h,
  low24h,
  volume24h,
  changePercent24h,
}) => {
  let changePercentColor;
  if (change24h < 0) {
    changePercentColor = '#D50000';
  }
  if (change24h > 0) {
    changePercentColor = '#1B5E20';
  }
  if (change24h === 0) {
    changePercentColor = '#000';
  }
  return (
    <div>
      <p>
        <span>24h change: </span>
        <span>{toCurrencySymbol || '$'}</span>
        <span>
          &nbsp;<NumberWithCommas value={change24h.toFixed(6)} />
        </span>
        <span>
          &nbsp;(
          <span style={{ color: changePercentColor, fontWeight: 600 }}>
            {changePercent24h.toFixed(2)}%
          </span>
          )
        </span>
      </p>
      <p>
        <span>Today's open:</span>
        <span>&nbsp;{toCurrencySymbol || '$'}</span>
        <span>
          &nbsp;<NumberWithCommas value={open24h} />
        </span>
      </p>
      <p>
        <span>Today's high:</span>
        <span>&nbsp;{toCurrencySymbol || '$'}</span>
        <span>
          &nbsp;<NumberWithCommas value={high24h} />
        </span>
      </p>
      <p>
        <span>Today's low:</span>
        <span>&nbsp;{toCurrencySymbol || '$'}</span>
        <span>
          &nbsp;<NumberWithCommas value={low24h} />
        </span>
      </p>
      <p>
        <span>24h volume:</span>
        <span>&nbsp;{fromCurrencySymbol || '$'}</span>
        <span>
          &nbsp;<NumberWithCommas value={volume24h.toFixed(2)} />
        </span>
      </p>
    </div>
  );
}

export default TradeInfo;